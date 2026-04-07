import GoalForm from "../components/GoalForm";
import useGoals from "../hooks/useGoals";
import useDashboard from "../hooks/useDashboard";

function GoalCreation() {
    const { createGoal } = useGoals();
    const { fetchDashboard } = useDashboard();


    async function handleCreate(objectiveId: string, title: string, description: string) {
        await createGoal(objectiveId, title, description);
        await fetchDashboard();
    }

    return (
        <div className="max-w-xl">
            <h1 className="text-xl mb-4">Criar nova meta</h1>
            <GoalForm onCreate={handleCreate}></GoalForm>
        </div>
    );
}

export default GoalCreation;