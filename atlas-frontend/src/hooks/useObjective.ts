import { useState, useEffect } from "react";
import apiFetch from "../api/client";
import type { Objective } from "../types/objective";

function useObjective(){
    const [objective, setObjective] = useState<Objective | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchObjective(){
        try {
            const result = await apiFetch("/objective");
            setObjective(result);
        } catch {
            setObjective(null);
        } finally {
            setLoading(false);
        }
    }

    async function createObjective(title: string, description: string){
        const result = await apiFetch("/objective",{
            method: "POST",
            body: JSON.stringify({ title, description })
        });
        setObjective(result);
    }

    useEffect(() =>{
        fetchObjective();
    }, []);

    return {
        objective, 
        loading,
        createObjective
    };
}

export default useObjective;