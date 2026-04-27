interface Goal {
    id: string;
    title: string;
    objective_id: string;
    description: string;
    completed: boolean;
    completed_at?: Date | null;
    category: string;
    validation: string;
}

interface categoryPreset {
    getCategoryPreset: (objectiveTitle: string) => string[];
}

export default Goal;