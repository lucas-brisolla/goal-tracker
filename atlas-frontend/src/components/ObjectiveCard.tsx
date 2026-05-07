import useObjective from '../hooks/useObjective';
import { useState, useEffect } from 'react';



function ObjectiveCard() {
    const { objective, completeObjective } = useObjective();
    const [isOpen, setIsOpen] = useState(false);
    const [validation, setValidation] = useState("");

    async function handleComplete() {

    if (validation.length < 30) {
        alert("Please describe your achievement in more detail.");
        return;
    }

    if (!objective) return;

    const result = await completeObjective(
        objective,
        validation
    );

    if (result?.feedback) {
        alert(result.feedback);
    }

    setIsOpen(false);
}

    return (
        <>
        <button onClick={() => setIsOpen(true)}
        className='bg-blue-500 px-4 py-2 rounded'
            >

        </button>
        { isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg">

                    <h2 className="text-xl font-bold mb-4">
                        Complete Objective
                    </h2>

                    <p className="text-zinc-400 mb-4">
                        Describe what you achieved during this journey.
                    </p>

                    <textarea
                        value={validation}
                        onChange={(e) => setValidation(e.target.value)}
                        rows={5}
                        className="w-full p-3 rounded bg-zinc-800"
                    />

                    <div className="flex justify-end gap-2 mt-4">

                        <button
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleComplete}
                        >
                            Complete
                        </button>

                    </div>
                </div>
            </div>
        )}
        </>
        );
}

export default ObjectiveCard;