import { NavLink } from "react-router-dom";
import { LayoutDashboard, Route, ChartLine,CirclePlus} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-60 bg-zinc-950 border-r border-zinc-800 p4">
        <h2 className="text-xl font-bold mb-6">Atlas</h2>

        <nav className="flex flex-col gap-3">
            <NavLink to="/" className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all  ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>
            
               <LayoutDashboard className="h-6 w-6 " /> <span>Dashboard</span> 
            </NavLink>
            <NavLink to="/goals" className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>
            
                <Route className="h-6 w-6" /><span>Metas</span>
            </NavLink>
            <NavLink to="/GoalCreation" className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>     
            
                <CirclePlus className="h-6 w-6" /> <span>Criar Meta</span>
            </NavLink>
            <NavLink to="/progress"className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>
                <ChartLine className="h-6 w-6" /> <span>Progresso</span>
            
            </NavLink>
        </nav>
    </aside>
    );
}

export default Sidebar;