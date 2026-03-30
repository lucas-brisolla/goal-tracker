import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import useGoals from '../hooks/useGoals';
import useDashboard from '../hooks/useDashboard';
import useObjective from '../hooks/useObjective';
import type { Goal } from '../types/goal';
import CreateObjective from './CreateObjective';
import { useEffect } from 'react';



function Dashboard() {
    const { objective, loading } = useObjective();
    const { goals, toggleGoal, deleteGoal, createGoal } = useGoals();
    const { data, fetchDashboard } = useDashboard();

    async function handleCreateGoal(title: string, description: string) {
        if (!objective) return;

        await createGoal(objective.id, title, description);
        await fetchDashboard();
    }

    async function handleToggleGoal(goal: Goal) {
        await toggleGoal(goal);
        await fetchDashboard();
    }

    async function handleDeleteGoal(goalId: string) {
        await deleteGoal(goalId);
        await fetchDashboard();
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;

    if (!objective) return <CreateObjective />;

    if (!data) return <p>Loading stats...</p>;

    return (
        <div className='min-h-screen bg-zinc-900 text-white flex justify-center'>
            <div id="header" className="w-full max-w-md px-6 py-8">
                <div className='mb-8 text-center'>
                    <h1 className="text-2xl font-semibold text-zinc-400">🎯 Objetivo Atual</h1>
                    <h2 className="text-5xl font-semibold mt-2 text-white">{objective.title}</h2>
                    <p className='text-zinc-500 text-sm mt-1'>{objective.description}</p>
                    <p className="text-green-400 text-sm mt-2">
                        Em progresso 🚀
                    </p>
                </div>
                <div id="progress" className='mb-8'>
                    <h3 className='text-sm text-zinc-400 mb-2 text-center'>Sua Jornada</h3>

                    <div className="w-full bg-zinc-800 rounded-full mt-4 overflow-hidden h-4">
                        <div style={{ width: `${data.completionRate}%`, }} className="bg-linear-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 " />
                    </div>
                    <p className='text-center text-sm text-zinc-400 mt-2'>{data.completionRate}% concluído</p>
                </div>
                <br />
                <div id="form" className='mb-8'>
                    <h3 className='text-lg font-semibold mb-3'>Defina suas metas</h3>
                    <GoalForm
                        onCreate={handleCreateGoal} />
                </div>
                <div id="goals">
                    <h3 className='text-lg font-semibold '>Metas</h3>
                    <div className='space-y-3'>
                        <GoalList
                            goals={goals}
                            onToggle={handleToggleGoal}
                            onDelete={handleDeleteGoal} />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Dashboard;
