interface Goal {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    completedAt: Date | null;
}

export default Goal;