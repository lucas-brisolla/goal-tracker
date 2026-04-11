import goals from "../services/goals";
import categories from "../utils/categoryPreset";
import  Goal from "../@types/goal";

function getSkillsData(goals: Goal[], categories: string[]) {
    return categories.map(cat => {
        const total = goals.filter(goal => goal.category === cat).length;
        const done = goals.filter(goal => goal.category === cat && goal.completed).length;
        const value = total === 0 ? 0 : (done / total) * 100;
        return {
            skill: cat,
            level: Math.round(value)
        };
    });
};

export default getSkillsData;