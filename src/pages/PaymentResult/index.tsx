import React from 'react';
import EcommerceDesktopLayout from '../../layouts/EcommerceDesktop';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ─── Trang thanh toán thành công ──────────────────────────────────────────

export const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderCode = searchParams.get('orderCode');

    return (
        <EcommerceDesktopLayout>
            <div className="w-full flex flex-col items-center justify-center py-20 gap-6">

                {/* Icon check */}
                <div className="w-20 h-20 rounded-full bg-[#fce8ee] flex items-center justify-center
                    shadow-[0_4px_20px_rgba(220,100,150,0.2)]">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e87aab" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>

                <div className="text-center flex flex-col gap-2">
                    <h1 className="text-[24px] font-[800] text-[#3d1a2b]">Payment Successful!</h1>
                    <p className="text-[14px] text-[#c0a0ac]">
                        Thank you for your order. Your payment has been processed successfully.
                    </p>
                    {orderCode && (
                        <p className="text-[13px] text-[#5a3045] font-[600]">
                            Order Code: <span className="text-[#e87aab]">#{orderCode}</span>
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/product')}
                        className="px-6 py-2.5 rounded-xl text-white text-[14px] font-[600]
                            bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#d46080]
                            shadow-[0_4px_14px_rgba(220,100,150,0.3)]
                            hover:shadow-[0_6px_20px_rgba(220,100,150,0.45)] hover:-translate-y-px
                            transition-all duration-200 border-none cursor-pointer"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </EcommerceDesktopLayout>
    );
};

// ─── Trang thanh toán bị hủy ─────────────────────────────────────────────

export const PaymentCancelPage = () => {
    const navigate = useNavigate();

    return (
        <EcommerceDesktopLayout>
            <div className="w-full flex flex-col items-center justify-center py-20 gap-6">

                {/* Icon X */}
                <div className="w-20 h-20 rounded-full bg-[#fce8ee] flex items-center justify-center
                    shadow-[0_4px_20px_rgba(220,100,150,0.2)]">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e06080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </div>

                <div className="text-center flex flex-col gap-2">
                    <h1 className="text-[24px] font-[800] text-[#3d1a2b]">Payment Cancelled</h1>
                    <p className="text-[14px] text-[#c0a0ac]">
                        Your payment was cancelled. Your cart is still saved.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/cart')}
                        className="px-6 py-2.5 rounded-xl border border-[#f0d0da] text-[#d46080]
                            text-[14px] font-[600] bg-white cursor-pointer transition-all
                            hover:bg-[#fce8ee]"
                    >
                        Back to Cart
                    </button>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="px-6 py-2.5 rounded-xl text-white text-[14px] font-[600]
                            bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#d46080]
                            shadow-[0_4px_14px_rgba(220,100,150,0.3)]
                            hover:shadow-[0_6px_20px_rgba(220,100,150,0.45)] hover:-translate-y-px
                            transition-all duration-200 border-none cursor-pointer"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </EcommerceDesktopLayout>
    );
};