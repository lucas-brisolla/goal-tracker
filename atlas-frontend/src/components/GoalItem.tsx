import type { Goal } from '../types/goal';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal) => Promise<void>;
}

function GoalItem({ goal, onToggle }: Props) {
    return (
        <li style={{ marginBottom: "12px" }}>
            <input 
            type="checkbox"
            checked={goal.completed}
            onChange={() => onToggle(goal)}
             />
            <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
                {goal.title}
            </span>
            <br />
            <small style={{ color: '#aaa' }}>
                {goal.description}
            </small>        
        </li>
    );
}   

export default GoalItem;