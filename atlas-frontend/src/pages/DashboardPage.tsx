import useDashboard from "../hooks/useDashboard";
import useObjective from "../hooks/useObjective";

function DashboardPage() {
    const { data } = useDashboard();
    const { objective } = useObjective();

    if (!objective) return <p>Carregando objetivo...</p>;
    if (!data) return <p>Carregando progresso...</p>;

    return (
        <div className="p-6 grid grid-cols-3 gap-6">

            {/* CARD PRINCIPAL */}
            <div className="col-span-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800">

                <p className="text-sm text-zinc-500">Sua Jornada</p>

                <h1 className="text-4xl font-bold text-white mt-2">
                    {objective.title}
                </h1>

                <p className="text-zinc-400 text-sm mt-1">
                    {objective.description}
                </p>

                <p className="text-blue-400 text-sm mt-2">
                    Em progresso 🚀
                </p>

                <div className="w-full bg-zinc-800 rounded-full mt-4 h-4 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full transition-all duration-500"
                        style={{ width: `${data.completionRate}%` }}
                    />
                </div>

                <p className="text-zinc-400 text-sm mt-2">
                    {data.completionRate}% concluído
                </p>

            </div>

            {/* CARD LATERAL */}
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col justify-center items-center">

                <p className="text-zinc-500 text-sm">Progresso</p>

                <h2 className="text-5xl font-bold text-white">
                    {data.completionRate}%
                </h2>

                <p className="text-zinc-400 text-sm mt-2">
                    Continue assim 🚀
                </p>

            </div>

        </div>
    );
}

export default DashboardPage;