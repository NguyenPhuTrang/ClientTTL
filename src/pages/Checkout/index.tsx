import React, { useEffect, useState } from 'react';
import EcommerceDesktopLayout from '../../layouts/EcommerceDesktop';
import { cartApi } from '../../services/cart.service';
import { useNavigate } from 'react-router-dom';
import { paymentApi } from '../../services/payment.service';

interface CartItem {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
}

interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
}

const CheckoutPage = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res: any = await cartApi.getMyCart();
                if (res.success) setCart(res.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.buyerName.trim()) newErrors.buyerName = 'Please enter your name';
        if (!form.buyerEmail.trim()) newErrors.buyerEmail = 'Please enter your email';
        else if (!/\S+@\S+\.\S+/.test(form.buyerEmail)) newErrors.buyerEmail = 'Invalid email address';
        if (!form.buyerPhone.trim()) newErrors.buyerPhone = 'Please enter your phone number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleCheckout = async () => {
        if (!validate() || !cart) return;
        try {
            setSubmitting(true);
            const res: any = await paymentApi.createPaymentLink({
                amount: cart.totalPrice,
                description: 'Thanh toan don hang',
                buyerName: form.buyerName,
                buyerEmail: form.buyerEmail,
                buyerPhone: form.buyerPhone,
                items: cart.items.map(item => ({
                    name: item.productName,
                    quantity: item.quantity,
                    price: item.price,
                })),
            });

            if (res.success && res.data?.checkoutUrl) {
                // Redirect sang trang thanh toán PayOS
                window.location.href = res.data.checkoutUrl;
            } else {
                console.error('Failed to create payment link:', res);
            }
        } catch (error) {
            console.error('Error creating payment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <EcommerceDesktopLayout>
            <div className="w-full flex flex-col gap-6 pb-10">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/cart')}
                        className="w-8 h-8 rounded-lg bg-[#fce8ee] flex items-center justify-center
                            border-none cursor-pointer hover:bg-[#f0d0da] transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d46080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-[22px] font-[800] text-[#3d1a2b]">Checkout</h1>
                </div>

                {loading ? (
                    <div className="w-full flex items-center justify-center p-20">
                        <div className="border-[#f0d0da] h-6 w-6 animate-spin rounded-full border-4 border-t-[#e87aab]" />
                    </div>
                ) : !cart || cart.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-[16px] font-[600] text-[#5a3045]">Your cart is empty</p>
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
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6 items-start">

                        {/* Form thông tin người mua */}
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="bg-white rounded-2xl border border-[#fce8ee]
                                shadow-[0_2px_12px_rgba(200,120,140,0.06)] p-6 flex flex-col gap-5">

                                <h2 className="text-[16px] font-[700] text-[#3d1a2b]">
                                    Contact Information
                                </h2>
                                <div className="h-px bg-[#fce8ee]" />

                                {/* Full Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-[600] text-[#5a3045]">
                                        Full Name <span className="text-[#e06080]">*</span>
                                    </label>
                                    <input
                                        name="buyerName"
                                        value={form.buyerName}
                                        onChange={handleChange}
                                        placeholder="Nguyen Van A"
                                        className={`w-full h-[46px] px-4 rounded-xl border text-[14px] text-[#3d1a2b]
                                            outline-none transition-all bg-white
                                            placeholder:text-[#c0a0ac]
                                            focus:border-[#e87aab] focus:shadow-[0_0_0_3px_rgba(232,122,171,0.12)]
                                            ${errors.buyerName
                                                ? 'border-[#e06080] shadow-[0_0_0_3px_rgba(224,96,128,0.1)]'
                                                : 'border-[#f0d0da]'
                                            }`}
                                    />
                                    {errors.buyerName && (
                                        <p className="text-[12px] text-[#e06080]">{errors.buyerName}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-[600] text-[#5a3045]">
                                        Email <span className="text-[#e06080]">*</span>
                                    </label>
                                    <input
                                        name="buyerEmail"
                                        value={form.buyerEmail}
                                        onChange={handleChange}
                                        placeholder="example@email.com"
                                        type="email"
                                        className={`w-full h-[46px] px-4 rounded-xl border text-[14px] text-[#3d1a2b]
                                            outline-none transition-all bg-white
                                            placeholder:text-[#c0a0ac]
                                            focus:border-[#e87aab] focus:shadow-[0_0_0_3px_rgba(232,122,171,0.12)]
                                            ${errors.buyerEmail
                                                ? 'border-[#e06080] shadow-[0_0_0_3px_rgba(224,96,128,0.1)]'
                                                : 'border-[#f0d0da]'
                                            }`}
                                    />
                                    {errors.buyerEmail && (
                                        <p className="text-[12px] text-[#e06080]">{errors.buyerEmail}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-[600] text-[#5a3045]">
                                        Phone Number <span className="text-[#e06080]">*</span>
                                    </label>
                                    <input
                                        name="buyerPhone"
                                        value={form.buyerPhone}
                                        onChange={handleChange}
                                        placeholder="0901234567"
                                        type="tel"
                                        className={`w-full h-[46px] px-4 rounded-xl border text-[14px] text-[#3d1a2b]
                                            outline-none transition-all bg-white
                                            placeholder:text-[#c0a0ac]
                                            focus:border-[#e87aab] focus:shadow-[0_0_0_3px_rgba(232,122,171,0.12)]
                                            ${errors.buyerPhone
                                                ? 'border-[#e06080] shadow-[0_0_0_3px_rgba(224,96,128,0.1)]'
                                                : 'border-[#f0d0da]'
                                            }`}
                                    />
                                    {errors.buyerPhone && (
                                        <p className="text-[12px] text-[#e06080]">{errors.buyerPhone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Danh sách sản phẩm */}
                            <div className="bg-white rounded-2xl border border-[#fce8ee]
                                shadow-[0_2px_12px_rgba(200,120,140,0.06)] p-6 flex flex-col gap-4">

                                <h2 className="text-[16px] font-[700] text-[#3d1a2b]">
                                    Order Items ({cart.items.length})
                                </h2>
                                <div className="h-px bg-[#fce8ee]" />

                                <div className="flex flex-col gap-3">
                                    {cart.items.map((item) => (
                                        <div key={item.productId} className="flex items-center gap-3">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#fdf5f7] shrink-0">
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-[600] text-[#3d1a2b] truncate">
                                                    {item.productName}
                                                </p>
                                                <p className="text-[12px] text-[#c0a0ac]">
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-[14px] font-[700] text-[#d46080] shrink-0">
                                                ${formatMoney(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-[320px] shrink-0 bg-white rounded-2xl border border-[#fce8ee]
                            shadow-[0_2px_12px_rgba(200,120,140,0.06)] p-6 flex flex-col gap-4 sticky top-4">

                            <h2 className="text-[16px] font-[700] text-[#3d1a2b]">Order Summary</h2>
                            <div className="h-px bg-[#fce8ee]" />

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#c0a0ac]">
                                        Items ({cart.items.length})
                                    </span>
                                    <span className="text-[13px] font-[600] text-[#5a3045]">
                                        ${formatMoney(cart.totalPrice)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#c0a0ac]">Shipping</span>
                                    <span className="text-[13px] font-[600] text-green-500">Free</span>
                                </div>
                            </div>

                            <div className="h-px bg-[#fce8ee]" />

                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-[700] text-[#3d1a2b]">Total</span>
                                <span className="text-[20px] font-[800] text-[#d46080]">
                                    ${formatMoney(cart.totalPrice)}
                                </span>
                            </div>

                            {/* PayOS badge */}
                            <div className="flex items-center gap-2 bg-[#fdf5f7] rounded-xl p-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e87aab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                    <line x1="1" y1="10" x2="23" y2="10"/>
                                </svg>
                                <span className="text-[12px] text-[#c0a0ac]">
                                    Powered by <span className="font-[700] text-[#e87aab]">PayOS</span> — QR / Bank Transfer
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={submitting}
                                className="w-full h-[52px] rounded-2xl border-none text-white text-[15px] font-[700]
                                    cursor-pointer transition-all duration-200
                                    bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#d46080]
                                    shadow-[0_6px_20px_rgba(220,100,150,0.35)]
                                    hover:shadow-[0_8px_28px_rgba(220,100,150,0.5)] hover:-translate-y-0.5
                                    active:scale-[0.97]
                                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {submitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="border-white/40 h-4 w-4 animate-spin rounded-full border-2 border-t-white" />
                                        Processing...
                                    </div>
                                ) : (
                                    'Pay Now'
                                )}
                            </button>

                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full h-[44px] rounded-2xl border border-[#f0d0da] text-[#d46080]
                                    text-[14px] font-[600] bg-white cursor-pointer transition-all
                                    hover:bg-[#fce8ee] active:scale-[0.97]"
                            >
                                Back to Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </EcommerceDesktopLayout>
    );
};

export default CheckoutPage;