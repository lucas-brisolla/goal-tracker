import apiFetch from "../api/client";
import { useState, useEffect } from "react";
import useObjective from "./useObjective";

function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const { objective } = useObjective();

    useEffect(() => {
        async function fetchCategories() {
            if (!objective) return;
            try {
                const res = await apiFetch(`/categories/${objective.id}`);
                setCategories(res.categories || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }

        }
        fetchCategories();
    }, [objective?.id]);

    return { categories };
}

export default useCategories;