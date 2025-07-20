'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function BuyerLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/buyer-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/dashboard/buyers');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-blue-100 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side Content */}
        <div className="bg-green-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 leading-tight">Welcome Back!</h2>
          <p className="text-lg">Login to manage your B2B orders and buyer account with ease.</p>
          <div className="mt-6 text-sm opacity-80">
            <p>Need help? <a href="#" className="underline text-white font-medium">Contact Support</a></p>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="p-10" ref={formRef}>
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Buyer Login</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-500 hover:from-blue-500 hover:to-green-600 text-white rounded-xl shadow-md transition-transform hover:scale-105"
            >
              Login
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </div>
      </div>

      {/* Input Styles */}
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 0.75rem;
          background: #f9f9f9;
          transition: border 0.3s ease;
        }

        .input-field:focus {
          border-color: #22c55e;
          outline: none;
          background: white;
        }
      `}</style>
    </div>
  );
}
