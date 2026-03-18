export interface CreateGoalDTO {
    objectiveId: string;
    title: string;
    description: string;
}

export interface UpdateGoalDTO {
    title: string;
    description: string;
}

export interface GoalDTO {
    id: string;
    title: string;
    description: string;
}

export interface CreateObjectiveDTO{
    title: string;
    description: string;
}