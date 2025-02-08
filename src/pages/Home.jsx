import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-screen px-6">
      <main className="text-center space-y-6">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
          Welcome To Event Manager
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          TaskUp is a task management tool designed to help users organize and
          prioritize their daily tasks efficiently. It offers a user-friendly
          interface to track progress and collaborate on projects.
        </p>

        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </button>
      </main>
    </div>
  );
}

export default Home;
