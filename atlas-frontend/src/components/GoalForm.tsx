import { useState } from 'react';

type Props = {
    onCreate: (title: string, description: string) =>Promise<void>;
}

function GoalForm({ onCreate }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onCreate(title, description);
        setTitle('');
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Goal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Goal Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Goal</button>
        </form>
    );
}

export default GoalForm;