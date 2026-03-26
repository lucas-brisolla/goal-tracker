import type { Goal } from '../types/goal';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalItem({ goal, onToggle, onDelete }: Props) {
    return (
        <li className="flex items-center justify-between p-4 bg-gray-800/50 border-1-4 border-transparent " style={{
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
            <span className="text-gray-200 font-medium" style={{textDecoration: goal.completed ? "line-through" : 1}}>
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