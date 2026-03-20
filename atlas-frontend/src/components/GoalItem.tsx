import type { Goal } from '../types/goal';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalItem({ goal, onToggle, onDelete }: Props) {
    return (
        <li style={{
            marginBottom: "16px",
            padding: "12px",
            borderRadius: "8px",
            background: goal.completed ? "#1e293b" : "#111",
            opacity: goal.completed ? 0.6 : 1
        }}>
            <input 
            type="checkbox"
            checked={goal.completed}
            onChange={() => {
                onToggle(goal); 
                alert("✔ missão avançada")
            }}
             />
            <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
                {goal.title}
            </span>
            <button
            onClick={async () =>{ await onDelete(goal.id); }}
            style={{ marginLeft: "10px" }}
            >
             delete
            </button>
            <br />
            <small style={{ color: '#aaa' }}>
                {goal.description}
            </small>        
        </li>
    );
}   

export default GoalItem;