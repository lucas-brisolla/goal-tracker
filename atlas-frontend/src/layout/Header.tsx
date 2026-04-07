import useObjective from "../hooks/useObjective";
import CreateObjective from "../pages/CreateObjective";
import useDashboard from "../hooks/useDashboard";
import { useEffect } from "react";


function Header() {
  const { objective } = useObjective();
  const { data, fetchDashboard } = useDashboard();

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



  return (
    <header className=" h-16 px-6  border-b border-zinc-800 flex items-center justify-between bg-zinc-950 sticky top-0 z-50">
      <div>
        <h1 className="text-xs text-zinc-500 uppercase tracking-wide">🎯 Objetivo Atual</h1>
      <h2 className="text-lg font-semibold text-white">{objective.title}</h2>
      </div>
      <div className="w-48">
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="bg-linear-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${data.completionRate}%`, }}></div>
        </div>
      </div>
    </header>

  );
}
export default Header;