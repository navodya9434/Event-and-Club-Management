import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Admin_background.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        navigate("/admin/users");
      } else {
        alert("Invalid credentials");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-slate-950/75"></div>
      </div>

      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/25 bg-white/10 shadow-[0_35px_70px_-35px_rgba(15,23,42,0.9)] backdrop-blur-xl md:grid md:grid-cols-2">
        <div className="hidden bg-linear-to-br from-teal-500/80 to-cyan-600/70 p-8 text-slate-900 md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.24em]">Admin Platform</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight">Control every event, ticket, and workflow in one place.</h1>
          <p className="mt-4 max-w-sm text-sm font-medium text-slate-900/80">
            Welcome back. Sign in to continue managing operations with real-time visibility and fast tools.
          </p>

          <div className="mt-10 space-y-3 text-sm font-semibold text-slate-900/85">
            <p>- Unified dashboard insights</p>
            <p>- Approval and authorization center</p>
            <p>- Feedback and user management</p>
          </div>

          <div className="mt-10 h-40 rounded-2xl border border-white/40 bg-white/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em]">Security Note</p>
            <p className="mt-2 text-sm font-medium">
              This portal is restricted to authorized admins. All actions are tracked.
            </p>
          </div>
        </div>

        <div className="bg-white/10 p-6 md:p-8">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200">Sign In</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Admin Portal</h2>
            <p className="mt-2 text-sm text-slate-200">Use your admin credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-xl border border-white/25 bg-white/10 py-2.5 pl-10 pr-3 text-white placeholder-slate-400 transition duration-200 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/70"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-xl border border-white/25 bg-white/10 py-2.5 pl-10 pr-3 text-white placeholder-slate-400 transition duration-200 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/70"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-linear-to-r from-teal-500 to-cyan-500 py-2.5 font-semibold text-slate-950 transition duration-200 hover:from-teal-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-slate-950"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-300">Demo credentials: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
