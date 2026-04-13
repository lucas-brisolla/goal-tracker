
function calculateLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
}

export default calculateLevel;