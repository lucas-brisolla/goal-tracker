function generateCompletionFeedback(
    streak: number,
    xpGain: number,
    totalCompleted: number
): string {
    if (streak >= 7){
        return "🔥 Amazing consistency! You're building strong habits."
    }

    if (streak >= 3){
        return "⚡ You're gaining momentum. Keep showing up every day.";
    }

    if (totalCompleted === 1) {
         return "🚀 First goal completed! Every journey starts small.";
    }
    
    if (totalCompleted % 10 === 0){
        return `🏆 ${totalCompleted} goals completed! That's real progress.`;
    }

    if (xpGain >= 30){
        return "💪 Big challenge completed. Great work pushing yourself.";
    }

    return "✅ Goal completed. Small progress every day adds up.";
}

export default generateCompletionFeedback;