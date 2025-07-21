// app/buyers/register/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

const schema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  companyName: Yup.string().required('Company name is required'),
  role: Yup.string().required('Please select a buyer role'),
  terms: Yup.bool().oneOf([true], 'You must agree to the terms'),
});

export default function BuyerRegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(leftRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', delay: 0.3 });
  }, []);

  const onSubmit = async (data: any) => {
    const res = await fetch('/api/buyer-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        agreedToTerms: data.terms,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      router.push('/buyers/login');
    } else {
      setServerError(result.message || 'Registration failed');
    }
  };

  return (
    <div className="max-h-svh flex flex-col md:flex-row">
      {/* Left Side with Image */}
      <div ref={leftRef} className="md:w-1/2 relative bg-cover bg-center text-white flex items-center justify-center p-10" style={{ backgroundImage: `url('/buyer-register-bg.jpg')` }}></div>

      {/* Right Side - Form */}
      <div ref={rightRef} className="md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent mb-1 text-center">
            Create Buyer Account
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input type="text" placeholder="Full Name" {...register('fullName')} className="input-field" />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email Address" {...register('email')} className="input-field" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <input type="password" placeholder="Password" {...register('password')} className="input-field" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
              <input type="text" placeholder="Phone Number" {...register('phoneNumber')} className="input-field" />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <input type="text" placeholder="Company Name" {...register('companyName')} className="input-field" />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Buyer Role</label>
              <select {...register('role')} className="input-field" defaultValue="">
                <option value="" disabled>-- Select Role --</option>
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Distributor">Distributor</option>
                <option value="Agent">Agent</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" {...register('terms')} className="accent-purple-600 w-5 h-5" />
              <span className="text-sm text-gray-700">
                I agree to the <a href="#" className="text-green-600 font-semibold underline">Terms and Conditions</a>
              </span>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

            <button type="submit" className="w-full cursor-pointer py-3 bg-gradient-to-r from-green-600 to-blue-500 hover:from-blue-500 hover:to-green-600 text-white rounded-xl shadow-md transition-transform hover:scale-105">
              Register Now
            </button>

            {serverError && <p className="text-red-500 text-center text-sm mt-2">{serverError}</p>}
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 0.75rem;
          background: #f9f9f9;
          transition: border 0.3s ease;
        }
        .input-field:focus {
          border-color: #a855f7;
          outline: none;
          background: white;
        }
      `}</style>
    </div>
  );
}
