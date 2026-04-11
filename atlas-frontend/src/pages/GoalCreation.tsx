import GoalForm from "../components/GoalForm";
import useGoals from "../hooks/useGoals";
import useDashboard from "../hooks/useDashboard";

function GoalCreation() {
    const { createGoal } = useGoals();
    const { fetchDashboard } = useDashboard();


    async function handleCreate(title: string, objectiveId: string, description: string, category: string) {
        await createGoal(title, objectiveId, description, category);
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