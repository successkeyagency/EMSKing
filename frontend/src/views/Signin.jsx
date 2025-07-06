import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signin",
        { email, password },
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      setError("❌ Invalid credentials. Please try again.");
    }
  };

  const autofill = (role) => {
    if (role === "admin") {
      setEmail("BossMan@gmail.com");
      setPassword("admin");
    } else {
      setEmail("testerapp2232@gmail.com");
      setPassword("12345678910");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md rounded-2xl px-8 py-10 shadow-xl border border-white/10 bg-white/20 backdrop-blur-lg text-white">
        <div className="mb-6 text-center">
          <img
            src={assets.EMSKing_Logo}
            alt="EMS King Logo"
            className="mx-auto h-16 sm:h-20 md:h-24 lg:h-28 object-contain drop-shadow-md"
          />
        </div>

        {/* Auto-Fill Instructions */}
        <div className="mb-4 text-center">
          <p className="text-sm text-white/90 font-medium">
            👇 Click a demo account to auto-fill login:
          </p>
        </div>

        {/* Autofill Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => autofill("admin")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600  text-white rounded-lg text-sm font-semibold shadow rgb-glow"
          >
            Admin
          </button>
          <p>or</p>
          <button
            onClick={() => autofill("employee")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold shadow rgb-glow"
          >
            Employee
          </button>
        </div>

        {error && (
          <p className="text-red-300 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1" htmlFor="email">
              📧 Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-white/80 text-black px-4 py-2 rounded-lg text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-sky-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="password">
              🔒 Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-white/80 text-black px-4 py-2 rounded-lg text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-sky-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between text-xs text-white/80 mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-sky-500" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-sky-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <footer className="text-center mt-8 text-xs text-white/70">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-green-500">
            SuccessKeyAgency LLC
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Signin;
