import SuggestionResponse from "../@types/SuggestionResponse";


function validateGoal(text: string): string | null {

    if (!text || text.length < 15) {
        return "Goal description is too short. Please provide a more specific and detailed goal.";
    }

    if (!text.includes(" ")) {
        return "Describe what exactly you will do."
    }
    return null;
}

function suggestGoal(text: string): SuggestionResponse {
    let improved = text.trim();
    const feedback: string[] = [];
    const lower = improved.toLowerCase();

    
    const MAX_FEEDBACK = 4;
    const addFeedback = (msg: string) => {
        if (!feedback.includes(msg) && feedback.length < MAX_FEEDBACK) {
            feedback.push(msg);
        }
    };

    const nonsensePatterns = /(asdf|1234|aaaa|test|lorem|ipsum)/;
    if (nonsensePatterns.test(lower)) {
        return {
            improvedText: "",
            feedback: ["Your goal looks like placeholder text. Try writing a real goal."]
        };
    }

    if (lower.length < 10) {
        return {
            improvedText: "",
            feedback: ["Your goal is too short. Try describing what you will actually do."]
        };
    }

    const vagueWords = ["study", "learn", "practice", "improve"];
    if (vagueWords.some(w => lower.includes(w))) {
        addFeedback("Be more specific about what exactly you will do.");
    }

    const hasTime = /\b(min|hour|day|week)s?\b/.test(lower);
    if (!hasTime) {
        improved += " for 30 minutes";
        addFeedback("Add a time duration (e.g. 30 minutes).");
    }

    const hasFrequency = /(every|times a)/.test(lower);
    if (!hasFrequency) {
        improved += " every day";
        addFeedback("Add a frequency (e.g. every day or 3 times a week).");
    }

    const hasOutcome = /(build|create|complete|finish)/.test(lower);
    if (!hasOutcome) {
        addFeedback("Define a clear outcome (e.g. build something or complete a task).");
    }

    if (!/(using|with)/.test(lower)) {
        addFeedback("Consider specifying tools or technologies.");
    }

    if (lower.length > 120) {
        addFeedback("This goal seems large. Consider breaking it into smaller steps.");
    }

    if (/(3 hours|6 hours|all day)/.test(lower)) {
        addFeedback("Avoid overloading yourself. Consistency beats intensity.");
    }

    improved = improved
        .replace(/\s+/g, " ")
        .replace(/\.$/, "")
        .trim();

    // Capitalização leve
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);

    return {
        improvedText: improved,
        feedback
    };
}




export default {
    validateGoal,
    suggestGoal
};

