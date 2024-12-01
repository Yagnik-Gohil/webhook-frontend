import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/ui/Sidebar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  const location = useLocation();

  const publicRoutes = ["/login"];

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 select-none">
      <Toaster position="top-right" reverseOrder={false} />

      {!publicRoutes.includes(location.pathname) && <Sidebar />}
      <main className="flex-1 p-6 lg:ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
