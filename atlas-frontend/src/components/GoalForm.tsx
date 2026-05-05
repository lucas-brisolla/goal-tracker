import { useEffect, useState } from 'react';
import useObjective from '../hooks/useObjective';
import useCategories from '../hooks/useCategories';

type Props = {
    onCreate: (title: string, objectiveId: string, description: string, category: string) =>Promise<void>;
}

function GoalForm({ onCreate }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const {categories} = useCategories();
    const objectiveId = useObjective().objective?.id || '';
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categories.length > 0) {
            setCategory(categories[0]);
        }
    }, [categories]);

    async function handleSubmit(e: React.FormEvent) {
        if(loading) return;
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            await onCreate(title, objectiveId, description, category);
            setTitle('');
            setDescription('');

        } catch (err: any) {
            console.error('Error creating goal:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    

    return (
         <>{error && (<div className='mb-4 p-3 bg-red-500 text-white rounded'>{error}</div>)}
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
            <select 
            name="categories" 
            value={category}
            onChange ={(e) => setCategory(e.target.value)}
            className='w-full mt-3 p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-blue-500 transition-all focus:outline-none'
            >
                {categories?.map((cat: string) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-lg font-semibold shadow-lg shadow-blue-500/20 focus:outline-none' disabled={loading}>
                {loading ? 'Creating...' : '+ Nova meta'}
            </button>
        </form>
       </>
    );
}


export default GoalForm;