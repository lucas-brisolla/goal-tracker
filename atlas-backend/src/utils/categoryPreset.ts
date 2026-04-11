function getCategoryPreset(title: string): string[] {
    const lower = title.toLowerCase();

    if (lower.includes('program') || lower.includes('developer') || lower.includes('coding')) {
        return ['Frontend', 'Backend', 'Logical', 'Projects', 'Consistency'];

    } else if (lower.includes('health') || lower.includes('fitness') || lower.includes('workout')) {
        return ['Cardio', 'Strength', 'Flexibility', 'Nutrition', 'Consistency'];
    } else if (lower.includes('student') || lower.includes('learning') || lower.includes('study')) {
        return ['Subjects', 'Assignments', 'Exams', 'Projects', 'Consistency'];
    } else if (lower.includes('artist') || lower.includes('art') || lower.includes('creative')) {
        return ['Drawing', 'Painting', 'Sculpting', 'Digital Art', 'Consistency'];
    } else if (lower.includes('writer') || lower.includes('writing') || lower.includes('author')) {
        return ['Fiction', 'Non-fiction', 'Poetry', 'Blogging', 'Consistency'];
    } else if (lower.includes('musician') || lower.includes('music') || lower.includes('instrument')) {
        return ['Practice', 'Theory', 'Composition', 'Performance', 'Consistency'];
    } else if (lower.includes('athlete') || lower.includes('sports') || lower.includes('training')) {
        return ['Endurance', 'Strength', 'Agility', 'Strategy', 'Consistency'];
    } else if (lower.includes('entrepreneur') || lower.includes('business') || lower.includes('startup')) {
        return ['Planning', 'Marketing', 'Sales', 'Finance', 'Consistency'];
    } else if (lower.includes('language') || lower.includes('learning') || lower.includes('linguistics')) {
        return ['Vocabulary', 'Grammar', 'Speaking', 'Listening', 'Consistency'];
    } else if (lower.includes('finance') || lower.includes('saving') || lower.includes('investing')) {
        return ['Investing', 'Trading', 'Budgeting', 'Financial Planning', 'Consistency'];
    }

    return ["General", "Consistency", "Focus", "Progress", "Reflection"];
}

export default {
    getCategoryPreset
};