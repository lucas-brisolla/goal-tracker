import { useState, useEffect} from "react";
import apiFetch from "../api/client";
import type { DashboardData } from "../types/dashboardData";

function useDashboard(){
    const [data, setData] = useState<DashboardData | null>(null);

    async function fetchDashboard() {
        
        const result = await apiFetch("/dashboard");
        setData(result);
    }

    useEffect(() =>{
        fetchDashboard();
    }, []);

    return { data, fetchDashboard };
}

export default useDashboard;
