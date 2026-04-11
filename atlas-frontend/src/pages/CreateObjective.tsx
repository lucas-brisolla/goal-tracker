import { useState } from "react";
import useObjective from "../hooks/useObjective";
import apiFetch from "../api/client";


function CreateObjective(){
    const { createObjective } = useObjective();
    const [ title , setTitle ] = useState("");
    const [ description, setDescription] = useState("");
    const [categories, setCategories] = useState<string[]>([]);

    
    async function fetchCategoryPreset(title: string){
        if (!title) return;

        try {
            const res = await apiFetch("/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            });

            const data = await res.json();

            setCategories(data.categories || []);
        } catch (error) {
            console.error('Failed to fetch category preset:', error);
        }
    }
    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        await createObjective(title, description, categories);
        window.location.reload();
    }

  

    return (
        <div>
            <h1 className="text-xl mb-4">Qual é o seu objetivo?</h1>

            <form onSubmit={handleSubmit}>
                <input
                className="className='w-full mb-2 p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-blue-500 transition-all focus:outline-none'" 
                placeholder="Ex: Me tornar dev fullstack" 
                value={title} 
                onChange={(e) => {setTitle(e.target.value);
                fetchCategoryPreset(title)}} 
                />
                <textarea 
                className='w-full mb-3 p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-blue-500 transition-all focus:outline-none resize-none'
                placeholder="Por que isso é importante"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map((cat, index) => (
                            <span 
                            key={index}
                            className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                            >{cat}</span>
                        ))}
                    </div>
                )}
                <button 
                type="submit"
                className='w-full bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-lg font-semibold shadow-lg shadow-blue-500/20 focus:outline-none'
                >Criar Objetivo</button>
            </form>
        </div>
    );
}

export default CreateObjective;