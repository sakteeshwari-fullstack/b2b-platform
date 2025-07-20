"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function SellerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const formRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate background smoothly
    tl.fromTo(
      bgRef.current,
      { scale: 1.05, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 1.2, ease: "power2.out" }
    );

    // Animate form after background
    tl.fromTo(
      formRef.current,
      { y: 100, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.2, ease: "power4.out" },
      "-=0.5" // overlap slightly for natural flow
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      router.push("/dashboard/seller");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        ref={bgRef}
        className="w-full h-svh bg-cover bg-center shadow-2xl overflow-hidden flex opacity-0"
        style={{ backgroundImage: "url('/seller-login-bg.jpg')" }}
      >
        {/* Left filler */}
        <div className="hidden md:block w-1/2"></div>

        {/* Right: Login Form */}
        <div
          ref={formRef}
          className="w-full md:w-3/4 flex items-center justify-center relative opacity-0"
        >
          <div className="bg-black/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-xl px-10 py-12 w-[90%] max-w-md relative z-10">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-400 rounded-full opacity-20 blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 rounded-full opacity-20 blur-3xl z-0" />

            <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md animate-bounce">
              Merchant Space ✨
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-5 rounded-lg bg-white/10 border border-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-5 rounded-lg bg-white/10 border border-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="relative group w-full cursor-pointer mx-auto bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white py-3 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-2"
              >
                {/* Glossy hover shine */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500 rounded-xl pointer-events-none" />

                {/* Admin icon */}
                <svg
                  className="w-5 h-5 z-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1"
                  />
                </svg>

                {/* Label */}
                <span className="z-10 font-semibold tracking-wide">
                  Login as Admin
                </span>
              </button>

              {error && (
                <p className="text-red-300 text-center text-sm">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
