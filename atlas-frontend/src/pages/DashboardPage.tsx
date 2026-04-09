import useDashboard from "../hooks/useDashboard";
import useObjective from "../hooks/useObjective";
import { Rocket } from "lucide-react";
import StatsCard from "../components/StatsCard";
import SkillsRadar from "../components/SkillsRadar";
import getFeedback from "../components/GetFeedback";
import useGoals from "../hooks/useGoals";

function DashboardPage() {
    const { data } = useDashboard();
    const { objective } = useObjective();
    const { goals } = useGoals();

    if (!objective) return <p>Carregando objetivo...</p>;
    if (!data) return <p>Carregando progresso...</p>;

    return (
        <div className="p-3 space-y-3">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 min-h-35 flex flex-col justify-center items-center">

                    <p className="text-sm text-zinc-500">Sua Jornada</p>

                    <h1 className="text-4xl font-bold text-white mt-2">
                        {objective.title}
                    </h1>

                    <p className="text-zinc-400 text-sm mt-1">
                        {objective.description}
                    </p>

                    <p className="text-blue-400 text-sm mt-2 flex items-center gap-1 justify-center">
                        Em progresso <Rocket className="h-4 w-4" />
                    </p>

                    <div className="w-full bg-zinc-800 rounded-full mt-4 h-4 overflow-hidden">
                        <div
                            className="bg-linear-to-r from-blue-400 to-cyan-400 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.7)]"
                            style={{ width: `${data.completionRate}%` }}
                        />
                    </div>

                   {/*  <p className="text-zinc-400 text-sm mt-2">
                        {data.completionRate}% concluído
                    </p> */}

                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col col-span-4 justify-center items-center hover:scale-[1.01] hover:shadow-lg transition-all duration-300 min-h-35">

                    <p className="text-zinc-500 text-sm">Progresso</p>

                    <h2 className="text-5xl font-bold text-blue-500">
                        {data.completionRate}%
                    </h2>

                    <p className="text-zinc-400 text-sm mt-2 flex items-center gap-1">
                        Continue assim <Rocket className="h-4 w-4 text-blue-500" />
                    </p>

                </div>

            </div>

            <StatsCard data={data} goals={goals} />

            <div className="grid grid-cols-2 gap-6">
                <SkillsRadar />
                <div className="bg-zinc-900 p-2 h-full rounded-xl border border-zinc-800 flex flex-col justify-center items-center hover:scale-[1.01] hover:shadow-lg transition-all duration-300  col-span-2">

                    <p className="text-zinc-500 text-sm">Insight</p>

                    <p className="text-white mt-2 text-center">
                        {data.completionRate < 30 && "Você começou, continue 💪"}
                        {data.completionRate >= 30 && data.completionRate < 70 && "Bom progresso 🚀"}
                        {data.completionRate >= 70 && "Você está voando 🔥"}
                    </p>

                </div>

            </div>

        </div>
    );
}


export default DashboardPage;