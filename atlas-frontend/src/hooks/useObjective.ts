import { useState, useEffect } from "react";
import apiFetch from "../api/client";
import type { Objective } from "../types/objective";
import useCategories from "./useCategories";

function useObjective(){
    const [objective, setObjective] = useState<Objective | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchObjective(){
        try {
            const result = await apiFetch("/objective");
            setObjective(result);
            if (!result){
                setObjective(null);
                console.log(result)
                return;
            }setObjective(result[0]);
        } catch {
            setObjective(null);
        } finally {
            setLoading(false);
        }
        
    }


    async function createObjective(title: string, description: string, categories: string []){
        const result = await apiFetch("/objective",{
            method: "POST",
            body: JSON.stringify({ title, description, categories })
        });
        setObjective(result);
    }

    async function completeObjective(objective: Objective, validation?: string)/* : Promise<{feedback?: string}> */{
        const newStatus = !objective.completed;

        if(newStatus){
            const result = await apiFetch(`/objective/${objective.id}/complete`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ validation })
            });
            await fetchObjective();

            return result;
        } 

      
    }

    useEffect(() =>{
        fetchObjective();
    }, []);

    return {
        objective, 
        loading,
        createObjective,
        completeObjective
    };
}

export default useObjective;