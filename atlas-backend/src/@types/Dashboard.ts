interface Dashboard {
    total: number;
    completed: number;
    pending: number;
    completionRate: number; // Percentage of completed goals
    skills: any; // Data for skills radar chart
    xp : number;
    level: number;
    streak: number;
    rhythm: number; 
}

export default Dashboard;