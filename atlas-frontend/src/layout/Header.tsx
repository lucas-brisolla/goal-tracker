import useObjective from "../hooks/useObjective";
import CreateObjective from "../pages/CreateObjective";
import useDashboard from "../hooks/useDashboard";
import { useEffect } from "react";
import { Target, Rocket, Hand } from "lucide-react";
import { useLocation } from "react-router-dom";
import useGoals from "../hooks/useGoals";


function Header() {
  const { objective } = useObjective();
  const { data, fetchDashboard } = useDashboard();
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  useEffect(() => {
    function handleUpdate() {
      fetchDashboard();
    }

    window.addEventListener("dashboardUpdated", handleUpdate);

    return () => {
      window.removeEventListener("dashboardUpdated", handleUpdate);
    };
  }, [fetchDashboard]);


  if (!objective) return <CreateObjective />;

  if (!data) return <p>Loading...</p>;

  if (isDashboard) {
    return (
    <header className="h-16 px-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-800 transition-all duration-300 backdrop-blur-md">
      <h1 className="text-zinc-400 text-sm flex items-center gap-1">
        Bem-vindo de volta <Hand></Hand>
      </h1>
      <div>
        <h1 className="text-zinc-400 text-sm flex items-center gap-1">Level {JSON.stringify(data.level)}</h1>
        <span className="text-xs text-zinc-500 flex items-center gap-1 uppercase tracking-wide">XP : {JSON.stringify(data.xp)}/300</span>
      </div>
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
      <Target className="h-6 w-6 text-red-500"/>
      <div>
        <h1 className="text-xs text-zinc-500 uppercase tracking-wide">Objetivo Atual</h1>
      <h2 className="text-lg font-semibold text-white tracking-wide">{objective.title}</h2>
      </div>
      <div className="w-48">
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="bg-linear-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.7)]" style={{ width: `${data.completionRate}%`, }}></div>
        </div>
      </div>
    </header>

  );
}
export default Header;