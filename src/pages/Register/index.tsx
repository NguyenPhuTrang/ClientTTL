import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterForm } from '../../features/auth/forms/register-form';

const EyeOpen = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeClosed = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <span className="absolute left-3 text-[#c0a0ac] flex items-center pointer-events-none">
        {children}
    </span>
);

const RegisterPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, onSubmit, errors } = useRegisterForm();

    const inputClass = (hasError?: boolean) =>
        `w-full h-[48px] pl-10 pr-4 rounded-xl border bg-white text-[14px] text-[#5a3045]
        placeholder:text-[#c0a0ac] outline-none transition-all
        ${hasError ? 'border-[#e06080]' : 'border-[#f0d0da] focus:border-[#e87aab]'}`;

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#FADADD]">

            {/* Top nav */}
            <nav className="flex items-center justify-end px-9 py-3.5 gap-5">
                <button type="button" className="flex items-center gap-1 text-sm text-[#c0768a] bg-transparent border-none cursor-pointer">
                    English
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
                <Link to="/login" className="text-sm font-bold text-[#d46080] no-underline underline-offset-[10px] underline">
                    Sign In
                </Link>
                <button type="button" className="px-5 py-1.5 rounded-full border border-[#d46080] text-[#d46080] text-sm font-semibold bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#d46080] hover:text-white">
                    Register
                </button>
            </nav>

            {/* Main content */}
            <div className="flex flex-1 items-center justify-center px-10 py-6">
                <div className="flex bg-white rounded-2xl shadow-[0_4px_30px_rgba(200,120,140,0.12)] overflow-hidden w-full max-w-[960px]">

                    {/* Left panel — Logo + welcome */}
                    <div className="flex flex-col items-center justify-center w-[300px] shrink-0 px-10 py-12 bg-white border-r border-[#fce8ee]">
                        <img
                            src="../images/Logo.png"
                            alt="Logo"
                            className="w-[220px] h-auto mb-6"
                        />
                        <p className="text-[#d46080] text-[16px] font-bold">Welcome!</p>
                        <p className="text-[#c0a0ac] text-[13px] text-center mt-1.5 leading-relaxed">
                            Join our community today and start your journey with us.
                        </p>
                    </div>

                    {/* Right panel — Form */}
                    <div className="flex-1 px-10 py-10 flex flex-col">
                        <h2 className="text-[20px] font-bold text-[#5a3045] mb-6">Create Account</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                            {/* Tên người dùng + Số điện thoại */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Tên người dùng */}
                                <div className="flex flex-col gap-1">
                                    <div className="relative flex items-center">
                                        <IconWrapper>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </IconWrapper>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            placeholder="Username"
                                            className={inputClass(!!errors.name)}
                                        />
                                    </div>
                                    {errors.name && (
                                        <span className="text-[#e06080] text-[11px] ml-1">{errors.name.message}</span>
                                    )}
                                </div>
                                {/* Số điện thoại */}
                                <div className="flex flex-col gap-1">
                                    <div className="relative flex items-center">
                                        <IconWrapper>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                        </IconWrapper>
                                        <input
                                            {...register('numberPhone')}
                                            type="text"
                                            placeholder="Phone Number"
                                            className={inputClass(!!errors.numberPhone)}
                                        />
                                    </div>
                                    {errors.numberPhone && (
                                        <span className="text-[#e06080] text-[11px] ml-1">{errors.numberPhone.message}</span>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <div className="relative flex items-center">
                                    <IconWrapper>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                                        </svg>
                                    </IconWrapper>
                                    <input
                                        {...register('email')}
                                        type="text"
                                        placeholder="Email"
                                        className={inputClass(!!errors.email)}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="text-[#e06080] text-[11px] ml-1">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Mật khẩu + Ngày sinh */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Mật khẩu */}
                                <div className="flex flex-col gap-1">
                                    <div className="relative flex items-center">
                                        <IconWrapper>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </IconWrapper>
                                        <input
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            className={`${inputClass(!!errors.password)} pr-10`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 text-[#c0a0ac] hover:text-[#d46080] transition-colors bg-transparent border-none cursor-pointer p-0 flex items-center"
                                        >
                                            {showPassword ? <EyeOpen /> : <EyeClosed />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <span className="text-[#e06080] text-[11px] ml-1">{errors.password.message}</span>
                                    )}
                                </div>
                                {/* Ngày sinh */}
                                <div className="flex flex-col gap-1">
                                    <div className="relative flex items-center">
                                        <IconWrapper>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                        </IconWrapper>
                                        <input
                                            {...register('birthday')}
                                            type="text"
                                            placeholder="Birthday (YYYY/MM/DD)"
                                            className={inputClass(!!errors.birthday)}
                                        />
                                    </div>
                                    {errors.birthday && (
                                        <span className="text-[#e06080] text-[11px] ml-1">{errors.birthday.message}</span>
                                    )}
                                </div>
                            </div>

                            {/* Link avatar */}
                            <div className="flex flex-col gap-1">
                                <div className="relative flex items-center">
                                    <IconWrapper>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </IconWrapper>
                                    <input
                                        {...register('avatarUrl')}
                                        type="text"
                                        placeholder="Avatar URL"
                                        className={inputClass(!!errors.avatarUrl)}
                                    />
                                </div>
                                {errors.avatarUrl && (
                                    <span className="text-[#e06080] text-[11px] ml-1">{errors.avatarUrl.message}</span>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full h-[50px] mt-1 rounded-xl border-none text-white text-[15px] font-bold
                                    cursor-pointer transition-all duration-200
                                    bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
                                    shadow-[0_4px_18px_rgba(220,100,150,0.3)]
                                    hover:shadow-[0_6px_24px_rgba(220,100,150,0.45)] hover:-translate-y-px
                                    active:scale-[0.98]"
                            >
                                Register
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-5 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex-1 h-px bg-[#f0d0da]" />
                                <span className="text-[12px] text-[#c0a0ac]">or</span>
                                <div className="flex-1 h-px bg-[#f0d0da]" />
                            </div>
                            <p className="text-[13px] text-[#c0a0ac]">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#d46080] font-bold no-underline hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
