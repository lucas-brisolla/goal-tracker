import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import useGoals from '../hooks/useGoals';
import useDashboard from '../hooks/useDashboard';
import type { Goal } from '../types/goal';


    
function Dashboard() {
    const { goals, toggleGoal, deleteGoal, createGoal } = useGoals();
    const { data, fetchDashboard } = useDashboard();

    async function handleCreateGoal(title: string, description: string){
        await createGoal(title, description);
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
        <GoalForm 
        onCreate={handleCreateGoal} />
        <h2>Your Goals</h2>
        <GoalList 
        goals={goals} 
        onToggle={handleToggleGoal} 
        onDelete={handleDeleteGoal} />
    </div>
    );
}


export default  Dashboard;
