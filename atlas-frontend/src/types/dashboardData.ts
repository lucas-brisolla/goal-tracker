export type DashboardData = {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
    skills: {
        skill: string, 
        level: number}[];
    xp: number;
    level: number;
    consistency: number;
    rhythm: number;
    xpNextLevel: number;
    xpInLevel: number;
    xpNeeded: number;
}
