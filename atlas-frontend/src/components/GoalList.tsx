import GoalItem from './GoalItem';
import type { Goal } from '../types/goal';

type Props = {
    goals: Goal[];
    onToggle: (goal: Goal) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalList({ goals, onToggle, onDelete }: Props) {
    return (
        <ul className="relative text-decoration-none ">
            {goals.map(goal => (
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