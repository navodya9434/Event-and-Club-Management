import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiUserAdd, HiLockClosed, HiArrowLeft } from "react-icons/hi";
import background from "../../assets/College.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin && !formData.name) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    if (isLogin) {
      try {
        const res = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (res.ok) {
          // Store token in localStorage
          if (data.token) localStorage.setItem("token", data.token);

          // Store roles array
          if (data.roles) localStorage.setItem("roles", JSON.stringify(data.roles));

          // Store user info
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("userName", data.name || "Student");

          // Navigate to Student Dashboard
          navigate("/student-dashboard");
        } else {
          setServerError(data.message || "Invalid credentials");
        }
      } catch (err) {
        console.error(err);
        setServerError("Server error, try again later");
      }
    } else {
      alert(`Registration attempted for ${formData.name}`);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white/90 pl-11 pr-4 py-3 text-sm text-slate-800 shadow-sm transition focus:outline-none focus:ring-2 ${
      hasError
        ? "border-red-400 focus:ring-red-300"
        : "border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
    }`;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Link
        to="/"
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/45"
      >
        <HiArrowLeft className="text-base" /> <span>Back</span>
      </Link>

      <div className="absolute inset-0">
        <img src={background} alt="Background" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-900/35 to-fuchsia-900/50" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left Panel */}
          <section className="relative hidden lg:flex flex-col justify-between p-10 text-white">
            <img src={background} alt="Campus" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/55" />
            <div className="relative z-10">
              <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                CampusHub Access
              </p>
              <h1 className="mt-6 text-4xl font-black">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h1>
            </div>
          </section>

          {/* Right Panel */}
          <section className="bg-white/90 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                Event & Club Management
              </h2>

              {serverError && <p className="text-red-500 mb-4">{serverError}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Username</label>
                  <div className="relative">
                    <HiUserAdd className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={inputClass(errors.username)}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={inputClass(errors.password)}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {isLogin ? "Don’t have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({ username: "", password: "", name: "" });
                  }}
                  className="ml-2 font-semibold text-indigo-600 hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;