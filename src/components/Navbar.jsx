import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <div className="bg-white h-12 w-full my-2 flex fixed top-0 left-0 right-0 z-50 justify-between px-6 items-center rounded-2xl text-stone-800 shadow-md">
      <div className="text-xl font-semibold cursor-pointer" onClick={()=>navigate('/dashboard')}>Event Management</div>
      <div className="flex items-center gap-2">
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/create")}
          >
            Host Events
          </button>
        {isLoggedIn ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
