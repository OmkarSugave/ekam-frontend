import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <header className="bg-white shadow px-6 py-3 flex items-center gap-3">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        <h1 className="text-xl font-bold text-gray-800">
          EKAM TT Management
        </h1>
      </header>

      {/* PAGE CONTENT */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
