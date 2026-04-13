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
}
