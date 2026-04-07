import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-60 bg-zinc-950 border-r border-zinc-800 p4">
        <h2 className="text-xl font-bold mb-6">Atlas</h2>

        <nav className="flex flex-col gap-3">
            <NavLink to="/" className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>
            
               🏠<span>Dashboard</span> 
            </NavLink>
            <NavLink to="/goals" className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>
            
                🎯 <span>Metas</span>
            </NavLink>
            <NavLink to="/GoalCreation" className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>     
            
                📝 <span>Criar Meta</span>
            </NavLink>
            <NavLink to="/progress"className={({ isActive}) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition all ${isActive ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-zinc-400" }`}>
                📈 <span>Progresso</span>
            
            </NavLink>
        </nav>
    </aside>
    );
}

export default Sidebar;