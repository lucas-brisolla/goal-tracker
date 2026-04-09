import type { Goal } from '../types/goal';
import { Trash2 } from 'lucide-react';
import Check from './Check';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalItem({ goal, onToggle, onDelete }: Props) {
    return (
        <li className="relative pl-8 mb-6 hover:scale-[1.01] hover:shadow-lg
transition-all duration-300">

            <div className="absolute left-3 top-0 bottom-0 w-0.5  bg-blue-500 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />


            <div className={`
                absolute left-1.5 top-6 w-3 h-3 rounded-full
                ${goal.completed ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]" : "bg-zinc-600"}
            `} />


            <div className={`
                p-4 rounded-xl
                bg-zinc-900 border border-zinc-800
                hover:border-blue-500/30
                transition-all
                ${goal.completed ? "opacity-60" : ""}
            `}>

                <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-4">

                        <button
                            onClick={() => onToggle(goal)}
                        ><Check checked={goal.completed}></Check>
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
                        <Trash2 className='w-5 h-5'></Trash2>
                    </button>

                </div>

            </div>
        </li>
    );
}

export default GoalItem;