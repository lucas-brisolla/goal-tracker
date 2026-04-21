import useDashboard from "../hooks/useDashboard";


function getFeedback(rate: any){
    if(rate < 20) return "Você começou, continue 🚀";
    if(rate < 50) return "Você está no caminho certo! 🌟";
    if(rate < 80) return "Ótimo trabalho! 🎉";
    if(rate < 100) return "Quase lá! Finalize suas metas! 🏁";
    return "Parabéns! Você é incrível! 👑";
}

export default getFeedback;