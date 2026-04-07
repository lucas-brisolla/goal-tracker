import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-950 to-zinc-900 text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-y-auto">
              <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;