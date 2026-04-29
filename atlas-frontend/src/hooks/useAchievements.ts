import { useState } from 'react';
import apiFetch from '../api/client';

export type Achievement = {
    id: string;
    name: string;
    description: string;
    icon: string;
};

export function useAchievements() {
    const [ achievements, setAchievements] = useState<Achievement[]>([]);

    async function fetchAchievements() {
        const result = await apiFetch('/achievements');
        setAchievements(result);
        return result;
    }

    return { 
        achievements, 
        fetchAchievements 
    };
}

