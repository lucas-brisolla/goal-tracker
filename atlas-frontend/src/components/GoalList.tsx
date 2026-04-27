import GoalItem from './GoalItem';
import type { Goal } from '../types/goal';

type Props = {
    goals: Goal[];
    onToggle: (goal: Goal, validation?: string) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalList({ goals, onToggle, onDelete }: Props) {
    const sortedGoals = [...goals].sort((a, b) => {
        if (a.completed === b.completed) {
            return 0;
        }
        return a.completed ? 1 : -1;
    });
    return (
        <ul className="relative text-decoration-none ">
            {sortedGoals.map(goal => (
                <GoalItem 
                key={goal.id} 
                goal={goal} 
                onToggle={onToggle} 
                onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default GoalList;