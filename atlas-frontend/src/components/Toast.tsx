import type { Achievement } from "../hooks/useAchievements";
import { useEffect, useState } from "react";


function showToast(achievement: Achievement) {
    const [toast, setToast] = useState<Achievement[]>([achievement]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);


    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 bg-zinc-900 border border-yellow-500 pp-4 rounded-lg shadow-lg">
            <p className=" text-yellow-400 font-bold">🏆 Nova conquista!</p>
            <p className="text-white">{achievement.name}</p>
        </div>
    );

}