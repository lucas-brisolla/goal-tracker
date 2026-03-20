import { useState } from "react";
import useObjective from "../hooks/useObjective";

function CreateObjective(){
    const { createObjective } = useObjective();

    const [ title , setTitle ] = useState("");
    const [ description, setDescription] = useState("");

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        await createObjective(title, description);
        window.location.reload();
    }

    return (
        <div>
            <h1>Qual é o seu objetivo?</h1>

            <form onSubmit={handleSubmit}>
                <input 
                placeholder="Ex: Me tornar dev fullstack" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                placeholder="Por que isso é importante"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Criar Objetivo</button>
            </form>
        </div>
    );
}

export default CreateObjective;