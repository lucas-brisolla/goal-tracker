import GoalList from "../components/GoalList";
import useGoals from "../hooks/useGoals";
import useDashboard from "../hooks/useDashboard";
import type { Goal } from "../types/goal";
import { useEffect } from "react";


function Goals() {
    const { goals, toggleGoal, deleteGoal } = useGoals();
    const { fetchDashboard } = useDashboard();
     async function handleToggleGoal(goal: Goal, validation?: string) {
            await toggleGoal(goal, validation);
            window.dispatchEvent(new Event("dashboardUpdated"));
            await fetchDashboard();
        }
    
        async function handleDeleteGoal(goalId: string) {
            await deleteGoal(goalId);
            await fetchDashboard();
        }
    
        useEffect(() => {
            fetchDashboard();
        }, []);

    return (
        <div>
            <h1 className="text-xl mb-4">Suas metas</h1>
            <GoalList 
            goals={goals}
            onToggle={handleToggleGoal}
            onDelete={handleDeleteGoal}
            />
        </div>
    );
}

export default Goals;