import database from '../config/database';
import Goal from '../@types/goal';
import type CompleteGoalResponse from '../@types/CompleteGoalResponse';
import objective from './objective';
import { notFoundError, AlreadyExists } from '../errors/AppError';
import levelSystem from '../utils/levelSystem';
import { randomUUID } from 'crypto';
import { validate } from '../middlewares/validate';
import generateCompletionFeedback from './generateCompletionFeedback';


async function createGoal(userId: string, title: string, description: string, category: string, objectiveId: string): Promise<Goal> {
    const client = await database.connect();

    try {
        const result = await client.query(
            'INSERT INTO goals (user_id, objective_id, title, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, objective_id, description, category',
            [userId, objectiveId, title, description, category]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function listGoalsByUser(userId: string): Promise<Goal[]> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, objective_id, title, description, completed, completed_at, category FROM goals WHERE user_id = $1',
            [userId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

async function getGoalById(goalId: string, userId: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, title, description, completed, completed_at, category FROM goals WHERE id = $1 AND user_id = $2',
            [goalId, userId]
        );
        const goal = result.rows[0];
        if (!goal) {
            throw notFoundError('Goal not found');
        }
        return goal;
    } finally {
        client.release();
    }
}

async function updateGoal(goalId: string, userId: string, title: string, description: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query('UPDATE goals SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING id, title, description', [title, description, goalId, userId]);
        const updatedGoal = result.rows[0];
        if (!updatedGoal) {
            throw notFoundError('Goal not found');
        }
        return updatedGoal;
    } finally {
        client.release();
    }
}

async function deleteGoal(goalId: string, userId: string): Promise<void> {
    const client = await database.connect();
    try {
        const result = await client.query('DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING id', [goalId, userId]);
        if (result.rowCount === 0) {
            throw notFoundError('Goal not found');
        }
    } finally {
        client.release();
    }
}


async function getCompletedGoals(userId: string): Promise<number> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT COUNT(*) FROM goals WHERE user_id = $1 AND completed = TRUE', [userId]
        );
        return Number(result.rows[0].count);
    } finally {
        client.release();
    }
}

async function unlock(userId: string, achievementId: string): Promise<void> {
    console.log("Unlocking achievement ", { userId, achievementId })
    const client = await database.connect();

    try {
        const exists = await client.query('SELECT 1 FROM user_achievement WHERE user_id = $1 AND achievement_id = $2', [userId, achievementId]);
        console.log("Achievement exists? ", exists.rows);
        if (exists.rows.length > 0) return;

        console.log("Inserting achievement ", { userId, achievementId })

        await client.query('INSERT INTO user_achievement (id, user_id, achievement_id) VALUES ($1, $2, $3)', [randomUUID(), userId, achievementId]);
    } finally {
        client.release();
    }
}

async function checkAchievements(userId: string, level: number): Promise<void> {
    const ACHIEVEMENTS = {
        FIRST_GOAL: '11111111-1111-1111-1111-111111111111',
        FIVE_GOALS: '22222222-2222-2222-2222-222222222222',
        TWENTY_GOALS: '33333333-3333-3333-3333-333333333333',
        LEVEL_5: '44444444-4444-4444-4444-444444444444',
    };
    console.log("checkAchievements called")
    const totalCompleted = await getCompletedGoals(userId);

    if (totalCompleted >= 1) {
        await unlock(userId, ACHIEVEMENTS.FIRST_GOAL);
    }

    if (totalCompleted >= 5) {
        await unlock(userId, ACHIEVEMENTS.FIVE_GOALS);
    }
    if (totalCompleted >= 20) {
        await unlock(userId, ACHIEVEMENTS.TWENTY_GOALS);
    }
    
     const userResult = await database.query('SELECT xp FROM users WHERE id = $1', [userId]);
     const currentXp = userResult.rows[0].xp ?? 0;
     const currentLevel = levelSystem.calculateLevel(currentXp);
    if (currentLevel >= 5) {
        await unlock(userId, ACHIEVEMENTS.LEVEL_5);
    }
    console.log("checkAchievements finished", { totalCompleted })
}


async function completeGoal(goalId: string, userId: string, validation: string): Promise<CompleteGoalResponse> {

    // Connect database
    const client = await database.connect();

    // Fetch Goal
    const goalResult = await client.query('SELECT title, description FROM goals WHERE id = $1 AND user_id = $2', [goalId, userId]);
    const goal = goalResult.rows[0];

    if (!goal) {
        throw notFoundError('Goal not found')
    }

    // Calculate XP
    const streak = 1;
    const baseXp = levelSystem.calculateXP(goal.title, goal.description)
    const xpWithBonus = levelSystem.applyStreakBonus(baseXp, streak);

    // Fetch current XP
    const userResult = await client.query('SELECT xp FROM users WHERE id = $1', [userId]);

    // Calculate XP with new XP and Level
    const currentXp = userResult.rows[0].xp ?? 0;
    const newXp = currentXp + xpWithBonus;
    const newLevel = levelSystem.calculateLevel(newXp);

    // Feedback 
    const totalCompleted =  await getCompletedGoals(userId)
    const feedback = generateCompletionFeedback(
        streak,
        xpWithBonus,
        totalCompleted
    )

    console.log("completeGoal chamando")
    // Check Achievements
    await checkAchievements(userId, newLevel);

    console.log("completeGoal terminou checkAchievements")


    // Update Goal
    try {
        const result = await client.query(
            'UPDATE goals SET completed = TRUE, completed_at = CURRENT_TIMESTAMP, validation = $3 WHERE id = $1 AND user_id = $2 RETURNING id, title, description, completed AS completed, completed_at, validation',
            [goalId, userId, validation]
        );

        // Update user
        await client.query('UPDATE users SET xp = $1, level = $2 WHERE id = $3', [newXp, newLevel, userId]);
        const updatedGoal = result.rows[0];
        if (!updatedGoal) {
            throw notFoundError('Goal not found');
        }
        return {goal: updatedGoal, feedback};
    } finally {
        client.release();
    }
}

async function uncompleteGoal(goalId: string, userId: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'UPDATE goals SET completed = FALSE, completed_at = NULL WHERE id = $1 AND user_id = $2 RETURNING id, title, description, completed AS completed, completed_at',
            [goalId, userId]
        );
        const goal = result.rows[0];
        if (!goal) {
            throw notFoundError('Goal not found');
        }
        return goal;
    } finally {
        client.release();
    }
}

async function getSkillsData(userId: string) {
    const goals = await listGoalsByUser(userId);
    const categoriesMap: Record<string, { total: number; done: number }> = {};

    for (const goal of goals) {
        const cat = goal.category || "Geral";
        if (!categoriesMap[cat]) {
            categoriesMap[cat] = { total: 0, done: 0 };
        }
        categoriesMap[cat].total += 1;
        if (goal.completed) {
            categoriesMap[cat].done += 1;
        }
    }

    const skills = Object.entries(categoriesMap).map(([skill, data]) => {
        const level = data.total === 0 ? 0 : (data.done / data.total) * 100;
        return {
            skill,
            level: Math.round(level)
        };
    });

    return skills;

}



export default {
    createGoal,
    listGoalsByUser,
    getGoalById,
    updateGoal,
    deleteGoal,
    completeGoal,
    uncompleteGoal,
    getCompletedGoals,
    getSkillsData
};