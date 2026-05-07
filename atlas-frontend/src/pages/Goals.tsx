import GoalList from "../components/GoalList";
import useGoals from "../hooks/useGoals";
import useDashboard from "../hooks/useDashboard";
import type { Goal } from "../types/goal";
import { useEffect, useRef } from "react";
import { useAchievements, type Achievement } from "../hooks/useAchievements";


function Goals() {
    const { goals, toggleGoal, deleteGoal } = useGoals();
    const { fetchDashboard } = useDashboard();
    const { fetchAchievements } = useAchievements();
    
    const prevAchievements = useRef<Achievement[]>([]);

    function checkNewAchievements(NewList: Achievement[]) {
        const newOnes = NewList.filter(a => !prevAchievements.current.some(prev => prev.id === a.id));
        
        console.log("New achievements? ", { newOnes, NewList, prev: prevAchievements.current })
        
        if (newOnes.length > 0) {
            newOnes.forEach(a => {
                setTimeout(() => {
                alert(`🏆 ${a.name}`);
            }, 100);
        });
        }
        prevAchievements.current = NewList;
    }

     async function handleToggleGoal(goal: Goal, validation?: string) {
            await toggleGoal(goal, validation);   

            const result = await toggleGoal(goal, validation);
            alert(result.feedback)
            
            const newList = await fetchAchievements();

            checkNewAchievements(newList);

            window.dispatchEvent(new Event("dashboardUpdated"));

            await fetchDashboard();
        }
    
        async function handleDeleteGoal(goalId: string) {
            await deleteGoal(goalId);
            await fetchDashboard();
        }
    
        useEffect(() => {
            fetchDashboard();

            async function initAchievements() {
                const initial = await fetchAchievements();
                prevAchievements.current = initial;
            }

            initAchievements();
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