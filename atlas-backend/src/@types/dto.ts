export interface CreateGoalDTO {
    objectiveId: string;
    title: string;
    description: string;
    category: string;
    validation: string;
}

export interface UpdateGoalDTO {
    title: string;
    description: string;
    validation: string;
}

export interface GoalDTO {
    id: string;
    title: string;
    description: string;
    category: string;
    validation: string;
}

export interface CreateObjectiveDTO{
    title: string;
    description: string;
    categories: string[];
}