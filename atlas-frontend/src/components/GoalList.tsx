import GoalItem from './GoalItem';
import type { Goal } from '../types/goal';

type Props = {
    goals: Goal[];
    onToggle: (goal: Goal) => Promise<void>;
}

function GoalList({ goals, onToggle }: Props) {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {goals.map(goal => (
                <GoalItem 
                key={goal.id} 
                goal={goal} 
                onToggle={onToggle} />
            ))}
        </ul>
    );
}

export default GoalList;