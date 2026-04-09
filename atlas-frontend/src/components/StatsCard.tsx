import { Flame } from "lucide-react";


function StatsCard({ data, goals }: { data: any; goals: any[] }){
    const completed = goals.filter(g => g.completed).length;
    const total = goals.length;
    
    return (
        <div className=" col-span-12 grid grid-cols-3 gap-4">
            <div className=" col-span-1 bg-zinc-900 p-4 rounded-xl min-h-30 border border-zinc-800 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 align-middle justify-center flex flex-col">
                <p className="text-zinc-400 text-sm">Metas concluídas</p>
                <h2 className="text-2xl font-bold text-white">{completed} de {total}</h2>
            </div>
            <div className="col-span-1 bg-zinc-900 p-4 rounded-xl min-h-30 border border-zinc-800 hover:scale-[1.01] hover:shadow-lg transition-all duration-300">
                <p className="text-zinc-400 text-sm">Consistência</p>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 align-middle justify-center flex-col">3 dias <Flame /></h2>
            </div>
            <div className="col-span-1 bg-zinc-900 p-4 rounded-xl min-h-30 border border-zinc-800 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 align-middle justify-center flex flex-col">
                <p className="text-zinc-400 text-sm">Ritimo</p>
                <h2 className="text-2xl font-bold text-white">1.5 metas/dia</h2>
            </div>
        </div>
    );

}

export default StatsCard;