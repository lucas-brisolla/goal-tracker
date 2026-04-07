import type { Goal } from '../types/goal';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalItem({ goal, onToggle, onDelete }: Props) {
    return (
        <li className="relative pl-8 mb-6">

            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-zinc-800" />


            <div className={`
                absolute left-[6px] top-6 w-3 h-3 rounded-full
                ${goal.completed ? "bg-blue-500" : "bg-zinc-600"}
            `} />


            <div className={`
                p-4 rounded-xl
                bg-zinc-900 border border-zinc-800
                hover:border-blue-500/30
                transition-all
                ${goal.completed ? "opacity-60" : ""}
            `}>

                <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-3">

                        <button
                            onClick={() => onToggle(goal)}
                            className={`
                                w-6 h-6 rounded-full border-2 flex items-center justify-center
                                ${goal.completed ? "bg-blue-500 border-blue-500" : "border-zinc-500"}
                            `}
                        >
                            {goal.completed ? "✓" : ""}
                        </button>

                        <div>
                            <p className={`
                                font-medium
                                ${goal.completed ? "line-through text-zinc-400" : "text-white"}
                            `}>
                                {goal.title}
                            </p>

                            <p className="text-sm text-zinc-500">
                                {goal.description}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={() => onDelete(goal.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        delete
                    </button>

                </div>

            </div>
        </li>
    );
}

export default GoalItem;