import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../services/axios';


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state)?.from?.pathname || '/dashboard';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(from);
    }
  }, [navigate, from]);

  const handleAuth = async () => {
    try {
      setError('');
      const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await axios.post(url, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate(from);
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Authentication failed. Please try again.'
      );
    }
  };

  return (
    <div className="flex w-screen justify-center items-center min-h-screen ">
      <div className=" p-6 bg-black rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? 'Sign In' : 'Register'}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={handleAuth}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p className="text-center mt-4">
          {isLogin ? 'New user?' : 'Already have an account?'}{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}