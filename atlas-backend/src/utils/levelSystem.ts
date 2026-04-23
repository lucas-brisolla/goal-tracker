
function calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100));
}

function calculateXP(title: string, description: string): number{
    const base = 10;

    const lengthFactor = Math.min(description.length / 50, 3);

    return Math.round(base + lengthFactor * 5)
}

function applyStreakBonus(xp: number, streak: number): number {
    if (streak >= 7) return xp * 1.5;
    if (streak >= 3) return xp * 1.2;
    return xp;
}

function xpToNextLevel(level: number): number{
    return level * level * 100;
}

export default {
    calculateLevel,
    calculateXP,
    applyStreakBonus,
    xpToNextLevel
};