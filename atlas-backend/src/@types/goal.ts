interface Goal {
    id: string;
    title: string;
    objective_id: string;
    description: string;
    completed: boolean;
    completedAt: Date | null;
    category: string;
}

interface categoryPreset {
    getCategoryPreset: (objectiveTitle: string) => string[];
}

export default Goal;