import type { Goal } from '../types/goal';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalItem({ goal, onToggle, onDelete }: Props) {
    return (
        <li className={`flex items-center justify-between gap-4 p-4 bg-zinc-800/50  hover:bg-zinc-700 rounded-xl mb-2 border-l-4 transition-all ${goal.completed ? 'opacity-50 border-emerald-500' : 'border-transparent'}`}>
            <div className='flex items-center gap-3'>
                <div className='w-3 h-3 rounded-full bg-green-500'/>
                <button onClick={() => onToggle(goal)} className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-colors ${goal.completed ? 'bg-green-500 border-green-500' : 'border-zinc-500'
                    }`}>
                    {goal.completed ? "✓" : ""}
                </button>
                <div className="flex flex-col">
                    <span className={goal.completed ? "text-zinc-200 font-medium line-through" : "text-zinc-200 font-medium"}>
                        {goal.title}
                    </span>
                    <br />
                    <small className={goal.completed ? "text-zinc-400 text-sm line-through" : "text-zinc-400 text-sm"}>
                        {goal.description}
                    </small>
                </div>
                <button
                    onClick={async () => { await onDelete(goal.id); }}
                    className=" bg-zinc-800 p-3 rounded-lg ml-auto text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                    delete
                </button>
            </div>
        </li>

    );
}

export default GoalItem;