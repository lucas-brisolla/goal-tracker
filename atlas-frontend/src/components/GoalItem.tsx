import type { Goal } from '../types/goal';
import { Trash2 } from 'lucide-react';
import Check from './Check';
import { useState } from 'react';

type Props = {
    goal: Goal;
    onToggle: (goal: Goal, validation?: string) => Promise<void>;
    onDelete: (goalId: string) => Promise<void>;
}

function GoalItem({ goal, onToggle, onDelete }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [validation, setValidation] = useState('');

    async function handleConfirm() {
        if (!validation || validation.length < 10) {
            alert('Descreva melhor sua conclusão.');
            return;
        }

        try {
            await onToggle(goal, validation);
        } catch (error) {
            console.error('Error completing goal:', error);
        } finally {
            setIsOpen(false);
            setValidation('');
            console.log("VALIDATION: ", validation);
            console.log("GOAL: ", goal);
            window.dispatchEvent(new Event('goalUpdated'));
        }
    }
    return (
        <>
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
                            onClick={() => {
                                if (goal.completed) {
                                    onToggle(goal);
                                } else {
                                    setIsOpen(true);
                                }
                            }}
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
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Validate Goal Completion</h2>
                    <p className="mb-4">Please provide validation for completing the goal:</p>
                    <textarea
                        value={validation}
                        onChange={(e) => setValidation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        rows={4}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setValidation('');
                            }}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Validate
                        </button>
                    </div>
                </div>
            </div>)}
            </>
    );
}


export default GoalItem;