import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async () => {
    if (isPending) return; // Prevent multiple submissions
    try {
      setError(null);
      setIsPending(true);
      await login(email, password);
      setIsPending(false);
      window.location.href = "/";
    } catch {
      setError("Invalid credentials");
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-[25px] bg-white rounded-xl shadow w-[500px]">
        <h2 className="text-2xl font-semibold mb-5">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Login
        </button>
        <div className="mt-[20px]">
          <a href="/register" className="mt-4 text-gray-600 hover:underline">
            Don't have an account? Register
          </a>
        </div>
        {error && (
          <div
            className="p-4 mb-4 mt-[10px] text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
