
function validateGoal(text: string): string | null {

    if (!text || text.length < 15){
        return "Goal description is too short. Please provide a more specific and detailed goal.";
    }

    if (!text.includes(" ")) {
        return "Describe what exactly you will do."
    }
    return null;
}

export default {
    validateGoal
};
