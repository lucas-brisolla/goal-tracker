interface Goal {
    id: string;
    title: string;
    objective_id: string;
    description: string;
    completed: boolean;
    completedAt: Date | null;
}

export default Goal;