import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import useGoals from '../hooks/useGoals';
import useDashboard from '../hooks/useDashboard';
import useObjective from '../hooks/useObjective';
import type { Goal } from '../types/goal';
import CreateObjective from './CreateObjective';
import { useEffect } from 'react';


    
function Dashboard() {
    const {objective, loading} = useObjective();
    const { goals, toggleGoal, deleteGoal, createGoal } = useGoals();
    const { data, fetchDashboard } = useDashboard();

    async function handleCreateGoal(title: string, description: string){
        if (!objective) return;

        await createGoal(objective.id, title, description);
        await fetchDashboard();
    }

    async function handleToggleGoal(goal: Goal) {
        await toggleGoal(goal);
        await fetchDashboard();
    }

    async function handleDeleteGoal(goalId: string){
        await deleteGoal(goalId);
        await fetchDashboard();
    }

    useEffect(() =>{
        fetchDashboard();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;

    if(!objective) return <CreateObjective />;

    if (!data) return <p>Loading stats...</p>;
    
    return (
    <div>
        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
            <div>
                <h1 className="text-3xl font-bold text-white text-center mb-4">🎯 {objective.title}</h1>
                <p style={{ color: "#aaa" }}>{objective.description}</p>
            </div>
        <h1>Sua Jornada</h1>
        <div className="w-full bg-gray-700 rounded-full h-4">
                <div style={{width: `${data.completionRate}%`,}} className="bg-emerald-500 h-4 rounded-full transition-all duration-500 "/>
            </div>
            <p>{data.completionRate}% concluído</p>
        </div>
        <br />
        <h2>Defina suas metas</h2>
        <GoalForm 
        onCreate={handleCreateGoal} />
        <h2>Metas</h2>
        <GoalList 
        goals={goals} 
        onToggle={handleToggleGoal} 
        onDelete={handleDeleteGoal} />
    </div>
    );
}


export default  Dashboard;
