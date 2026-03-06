import { useEffect, useState} from 'react';
import apiFetch from '../api/client';

type DashboardData = { 
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
};

function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
     const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetchDashboard();
        fetchGoals();
    }, []);
    
     async function fetchDashboard(){
            try {
                const result = await apiFetch('/dashboard');
                setData(result);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }    
        } 

     async function fetchGoals() {
        try {
            const result = await apiFetch('/goals');
            setGoals(result);
        } catch (error) {
            console.error('Failed to fetch goals:', error);
        }
    }

    async function toggleGoal(goal: any) {
        try {

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

        } catch (error) {
            console.error('Failed to toggle goal:', error);
        }
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
        <h2>Your Goals</h2>
        <ul>
            {goals.map((goal: any) => (
                <li key={goal.id} style={{ marginBottom: "12px" }}>
                    <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal)}
                    />
                    <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
                        {goal.title}
                    </span>
                    <br />
                    <small style={{ color: "#aaa" }}>
                        {goal.description}
                    </small>
                </li>
            ))}
        </ul>
    </div>
    );
}


export default  Dashboard;
