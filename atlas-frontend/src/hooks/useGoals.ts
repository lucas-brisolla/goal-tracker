import { useState, useEffect } from "react";
import apiFetch from "../api/client";
import type { Goal } from "../types/goal";
import useDashboard from "./useDashboard";

function useGoals(){
    const [goals, setGoals] = useState<Goal[]>([]);
    
    async function fetchGoals(){
        const result = await apiFetch("/goals")
        setGoals(result);
    }

    async function createGoal(objectiveId: string, title: string, description: string){
        await apiFetch("/goals",{
            method: "POST",
            body: JSON.stringify({title, description})
        });

        fetchGoals();
    }

    async function toggleGoal(goal: Goal){
        const newStatus = !goal.completed;

        if (newStatus) {
            await apiFetch(`/goals/${goal.id}/complete`, {method:"PATCH"})
        } else {
            await apiFetch(`/goals/${goal.id}/uncomplete`, {method: "PATCH"})
        }


        setGoals(prev =>
            prev.map(g => 
                g.id === goal.id ? { ...g, completed: newStatus } : g
        )
      );
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

