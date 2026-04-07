import { useState } from 'react';
import useObjective from '../hooks/useObjective';

type Props = {
    onCreate: (title: string, objectiveId: string, description: string) =>Promise<void>;
}

function GoalForm({ onCreate }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const objectiveId = useObjective().objective?.id || '';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onCreate(objectiveId, title, description);
        setTitle('');
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit} >
            <input
                className='w-full mb-2 p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-blue-500 transition-all focus:outline-none'
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className='w-full mb-3 p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-blue-500 transition-all focus:outline-none resize-none'
                placeholder="Description"
                value={description}
                
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-lg font-semibold shadow-lg shadow-blue-500/20 focus:outline-none'>+ Nova meta</button>
        </form>
    );
}

export default GoalForm;