import useObjective from "../hooks/useObjective";
import CreateObjective from "../pages/CreateObjective";
import useDashboard from "../hooks/useDashboard";
import { useEffect, useState } from "react";
import { Target, Rocket, Hand } from "lucide-react";
import { useLocation } from "react-router-dom";



function Header() {
  const { objective } = useObjective();
  const { data, fetchDashboard } = useDashboard();
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const [animatedXp, setAnimatedXp] = useState(0);
  const [highlight, setHightlight] = useState(false);

  useEffect(() => {
    function handleUpdate() {
      fetchDashboard();
    }

    window.addEventListener("dashboardUpdated", handleUpdate);
    if (data) {
      setTimeout(() => {
        setAnimatedXp(data.xp);
      }, 200);
    }

    setHightlight(true);
    setTimeout(() => setHightlight(false), 600);

    /* if (data!.level > previousLevel){
      // animation 
    } */

    return () => {
      window.removeEventListener("dashboardUpdated", handleUpdate);
    };
  }, [fetchDashboard, data, data?.xp]);


  if (!objective) return <CreateObjective />;

  if (!data) return <p>Loading...</p>;

  if (isDashboard) {
    return (
      <header className="h-16 px-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-800 transition-all duration-300 backdrop-blur-md">

        <div className="flex flex-col gap-1 align-middle justify-center items-center">
          <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-blue-400">Lv. {JSON.stringify(data.level)}</div>
          <div className="w-48">
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 ease-out bg-linear-to-r from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]" style={{ width: `${animatedXp / 300 * 100}%` }}></div>
            </div>
          </div>
          <span className="text-xs text-zinc-400 flex items-center justify-center gap-1  tracking-wide"> Faltam <strong className="text-blue-400">{300 - data.xp} XP </strong> para o próximo NÍVEL</span>
        </div>
        <h1 className="text-zinc-400 text-sm flex items-center gap-1">
          Bem-vindo de volta <Hand></Hand>
        </h1>
        <span className="text-xs text-zinc-500 flex items-center gap-1 uppercase tracking-wide">
          Continue sua jornada <Rocket></Rocket>
        </span>
      </header>
    );
  }



  return (
    <header className=" h-16 px-6 border-b border-zinc-800
flex items-center justify-between 
bg-zinc-950/80 backdrop-blur
shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300">
     
      <div className="flex flex-col gap-1 items-center justify-center">
        <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-blue-400">Lv. {JSON.stringify(data.level)}</div>

        <div className="w-48">
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700 ease-out bg-linear-to-r from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]" style={{ width: `${animatedXp / 300 * 100}%` }}></div>
          </div>
        </div>
        <span className="text-xs text-zinc-400 flex items-center justify-center gap-1  tracking-wide"> Faltam <strong className="text-blue-400">{300 - data.xp} XP </strong> para o próximo NÍVEL</span>
      </div>
       
      <div>
        <h1 className="text-xs text-zinc-500 uppercase tracking-wide flex flex-row items-center gap-1"><Target className="h-6 w-6 text-red-500" />Objetivo Atual</h1>
        <h2 className="text-lg font-semibold text-white tracking-wide">{objective.title}</h2>
      </div>
      <div className="w-48">
        <span>Progress</span>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="bg-linear-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.7)]" style={{ width: `${data.completionRate}%`, }}></div>
        </div>
      </div>

    </header>

  );
}
export default Header;