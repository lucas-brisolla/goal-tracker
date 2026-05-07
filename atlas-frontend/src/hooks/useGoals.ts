import { useState, useEffect, useRef } from "react";
import apiFetch from "../api/client";
import type { Goal } from "../types/goal";
import useDashboard from "./useDashboard";




function useGoals(){
    const [goals, setGoals] = useState<Goal[]>([]);
    
    async function fetchGoals(){
        const result = await apiFetch("/goals")
        setGoals(result);
    }

  

    async function createGoal(
        title: string, 
        objectiveId: string, 
        description: string, 
        category: string){
        await apiFetch("/goals",{
            method: "POST",
            body: JSON.stringify({
                title, 
                objectiveId, 
                description, 
                category}),
        });

        fetchGoals();
    }

    async function toggleGoal(goal: Goal, validation?: string): Promise<{ feedback?: string}>{
        const newStatus = !goal.completed;

        if (newStatus) {
            const result = await apiFetch(`/goals/${goal.id}/complete`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ validation })
            });
            console.log("CALLED TOGGLE ", { goal, validation })
            return result;
        } else {
            await apiFetch(`/goals/${goal.id}/uncomplete`, {method: "PATCH"})
            return {};
        }
        
       await fetchGoals();
    }
    
    async function deleteGoal(goalId: string) {
        await apiFetch(`/goals/${goalId}`, {
            method: "DELETE"
        });

        setGoals(prev => prev.filter(g => g.id !== goalId));
    }

    useEffect(() => {
        fetchGoals();
    }, []);

    return {
        goals,
        createGoal,
        toggleGoal,
        deleteGoal
    }
}

export default useGoals;

