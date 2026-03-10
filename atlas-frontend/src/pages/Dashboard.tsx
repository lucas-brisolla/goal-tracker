import { useEffect, useState} from 'react';
import apiFetch from '../api/client';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import type { DashboardData } from '../types/dashboardData';
import type { Goal } from '../types/goal';
    
function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [goals, setGoals] = useState<Goal[]>([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchDashboard();
        fetchGoals();
    }, []);
    
     async function fetchDashboard(){
        const result = await apiFetch('/dashboard');
        setData(result);
    } 

     async function fetchGoals() {
        const result = await apiFetch('/goals');
        setGoals(result);
    }

     async function createGoal(title: string, description: string) {;
            await apiFetch('/goals', {
                method: 'POST',
                body: JSON.stringify({ title, description })
            });

            await fetchGoals();
            await fetchDashboard();
    }

    async function toggleGoal(goal: Goal) {

        const newStatus = !goal.completed;

        if (newStatus) {
            await apiFetch(`/goals/${goal.id}/complete`, {
                method: 'PATCH'
            });
        } else {
            await apiFetch(`/goals/${goal.id}/uncomplete`, {
                method: 'PATCH'
            });
        }

        await fetchGoals();
        await fetchDashboard();
    }

    if (!data) {
        return <p>Loading dashboard...</p>;
    }

    return (
    <div>
        <h1>Dashboard</h1>
        <p>Total Goals: {data.total}</p>
        <p>Completed Goals: {data.completed}</p>
        <p>Pending Goals: {data.pending}</p>
        <p>Completion Rate: {data.completionRate}%</p>
        <br />
        <h2>Create New Goal</h2>
        <GoalForm onCreate={createGoal} />
        <h2>Your Goals</h2>
        <GoalList goals={goals} onToggle={toggleGoal} />
    </div>
    );
}


export default  Dashboard;
