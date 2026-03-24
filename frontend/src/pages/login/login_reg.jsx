import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiMail, HiLockClosed, HiUserAdd, HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import background from "../../assets/College.jpg";

const login_reg = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // Handle login logic here
        console.log("Login:", formData.email, formData.password);
        alert(`Login attempted with ${formData.email}`);
      } else {
        // Handle registration logic here
        console.log("Register:", formData);
        alert(`Registration attempted for ${formData.name}`);
      }
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
        <HiArrowLeft className="text-base" />
        <span>Back</span>
      </Link>

      <div className="absolute inset-0">
        <img
          src={background}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-900/35 to-fuchsia-900/50" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <section className="relative hidden lg:flex flex-col justify-between p-10 text-white">
            <img
              src={background}
              alt="Campus"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/55" />

            <div className="relative z-10">
              <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
                CampusHub Access
              </p>
              <h1 className="mt-6 text-4xl font-black leading-tight">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h1>
              <p className="mt-4 max-w-md text-base text-slate-200">
                {isLogin
                  ? "Sign in to manage events, explore clubs, and stay connected with your campus community."
                  : "Join now to register for events, follow clubs, and receive campus updates in one place."}
              </p>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-slate-100 backdrop-blur-sm">
              <p className="font-semibold">Everything in one dashboard</p>
              <p className="mt-2 text-slate-200">
                Events, registrations, club updates, and community
                announcements, all from your profile.
              </p>
            </div>
          </section>

          <section className="bg-white/90 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Event & Club Management
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {isLogin
                    ? "Sign in to your account"
                    : "Create your free account"}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="group flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
                  <FcGoogle className="mr-3 text-2xl transition group-hover:scale-110" />
                  <span className="font-medium text-slate-700">
                    Continue with Google
                  </span>
                </button>

                <button className="group flex w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900 py-3 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800">
                  <FaGithub className="mr-3 text-2xl transition group-hover:scale-110" />
                  <span className="font-medium">Continue with GitHub</span>
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-white/90 px-3 text-slate-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <HiUserAdd className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={inputClass(Boolean(errors.name))}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={inputClass(Boolean(errors.email))}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={inputClass(Boolean(errors.password))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {isLogin
                  ? "Don’t have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({
                      email: "",
                      password: "",
                      name: "",
                    });
                  }}
                  className="ml-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline focus:outline-none"
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

export default login_reg;

