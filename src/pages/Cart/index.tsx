import React, { useEffect, useState } from 'react';
import EcommerceDesktopLayout from '../../layouts/EcommerceDesktop';
import { cartApi } from '../../services/cart.service';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

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

type ConfirmAction =
    | { type: 'remove'; productId: string; productName: string }
    | { type: 'clear' }
    | null;

const TrashIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e06080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" /><path d="M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);

const CartPage = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
    const navigate = useNavigate();

    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

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

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        try {
            setUpdatingId(productId);
            const res: any = await cartApi.updateCartItem({ productId, quantity });
            if (res.success) setCart(res.data);
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleRemoveItem = async (productId: string) => {
        try {
            setUpdatingId(productId);
            const res: any = await cartApi.removeCartItem(productId);
            if (res.success) setCart(res.data);
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleClearCart = async () => {
        try {
            const res: any = await cartApi.clearCart();
            if (res.success) setCart(res.data);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleConfirm = async () => {
        if (!confirmAction) return;
        if (confirmAction.type === 'remove') {
            await handleRemoveItem(confirmAction.productId);
        } else if (confirmAction.type === 'clear') {
            await handleClearCart();
        }
        setConfirmAction(null);
    };

    const confirmTitle = confirmAction?.type === 'clear' ? 'Clear Cart' : 'Remove Item';
    const confirmMessage = confirmAction?.type === 'clear'
        ? 'Are you sure you want to remove all items from your cart?'
        : `Remove "${(confirmAction as any)?.productName}" from your cart?`;

    return (
        <EcommerceDesktopLayout>
            <div className="w-full flex flex-col gap-6 pb-10">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-[22px] font-[800] text-[#3d1a2b]">My Cart</h1>
                    {cart && cart.items.length > 0 && (
                        <button
                            onClick={() => setConfirmAction({ type: 'clear' })}
                            className="text-[13px] text-[#e06080] font-[500] hover:underline cursor-pointer bg-transparent border-none"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="w-full flex items-center justify-center p-20">
                        <div className="border-[#f0d0da] h-6 w-6 animate-spin rounded-full border-4 border-t-[#e87aab]" />
                    </div>
                ) : !cart || cart.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-20 h-20 rounded-full bg-[#fce8ee] flex items-center justify-center">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e87aab" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                        <p className="text-[16px] font-[600] text-[#5a3045]">Your cart is empty</p>
                        <p className="text-[13px] text-[#c0a0ac]">Add some products to get started</p>
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

                        {/* Cart items */}
                        <div className="flex-1 flex flex-col gap-3">
                            {cart.items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center gap-4 bg-white rounded-2xl p-4
                                        border border-[#fce8ee] shadow-[0_2px_12px_rgba(200,120,140,0.06)]"
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#fdf5f7] shrink-0">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                                        <p className="text-[14px] font-[600] text-[#3d1a2b] truncate">
                                            {item.productName}
                                        </p>
                                        <p className="text-[16px] font-[700] text-[#d46080]">
                                            ${formatMoney(item.price)}
                                        </p>
                                        <p className="text-[12px] text-[#c0a0ac]">
                                            Subtotal: ${formatMoney(item.price * item.quantity)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                            disabled={updatingId === item.productId || item.quantity <= 1}
                                            className="w-8 h-8 rounded-lg bg-[#fce8ee] text-[#d46080] text-[16px] font-[700]
                                                flex items-center justify-center border-none cursor-pointer
                                                hover:bg-[#f0d0da] transition-colors
                                                disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center text-[14px] font-[600] text-[#5a3045]">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                            disabled={updatingId === item.productId}
                                            className="w-8 h-8 rounded-lg bg-[#fce8ee] text-[#d46080] text-[16px] font-[700]
                                                flex items-center justify-center border-none cursor-pointer
                                                hover:bg-[#f0d0da] transition-colors
                                                disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove button — giờ mở confirm modal */}
                                    <button
                                        onClick={() => setConfirmAction({ type: 'remove', productId: item.productId, productName: item.productName })}
                                        disabled={updatingId === item.productId}
                                        className="w-8 h-8 rounded-lg text-[#c0a0ac] hover:text-[#e06080]
                                            hover:bg-[#fce8ee] flex items-center justify-center
                                            border-none bg-transparent cursor-pointer transition-all
                                            disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order summary */}
                        <div className="lg:w-[320px] shrink-0 bg-white rounded-2xl border border-[#fce8ee]
                            shadow-[0_2px_12px_rgba(200,120,140,0.06)] p-6 flex flex-col gap-4 sticky top-4">

                            <h2 className="text-[16px] font-[700] text-[#3d1a2b]">Order Summary</h2>
                            <div className="h-px bg-[#fce8ee]" />

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#c0a0ac]">Items ({cart.items.length})</span>
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

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full h-[52px] rounded-2xl border-none text-white text-[15px] font-[700]
                                    cursor-pointer transition-all duration-200
                                    bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#d46080]
                                    shadow-[0_6px_20px_rgba(220,100,150,0.35)]
                                    hover:shadow-[0_8px_28px_rgba(220,100,150,0.5)] hover:-translate-y-0.5
                                    active:scale-[0.97]"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/product')}
                                className="w-full h-[44px] rounded-2xl border border-[#f0d0da] text-[#d46080]
                                    text-[14px] font-[600] bg-white cursor-pointer transition-all
                                    hover:bg-[#fce8ee] active:scale-[0.97]"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Modal */}
            {confirmAction && (
                <Modal open={!!confirmAction} onClose={() => setConfirmAction(null)}>
                    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(200,120,140,0.18)] p-8 w-[340px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#fce8ee] flex items-center justify-center">
                                <TrashIcon />
                            </div>
                            <div className="text-center">
                                <h3 className="text-[16px] font-bold text-[#5a3045] mb-1">{confirmTitle}</h3>
                                <p className="text-[13px] text-[#c0a0ac]">{confirmMessage}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-7">
                            <button
                                type="button"
                                onClick={() => setConfirmAction(null)}
                                className="flex-1 h-[42px] rounded-xl border border-[#f0d0da] text-[#c0768a]
                                    text-[14px] font-[600] bg-white hover:bg-[#fce8ee] transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="flex-1 h-[42px] rounded-xl border-none text-white
                                    text-[14px] font-[600] cursor-pointer transition-all duration-150
                                    bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
                                    shadow-[0_3px_12px_rgba(220,100,150,0.25)]
                                    hover:shadow-[0_4px_16px_rgba(220,100,150,0.4)] hover:-translate-y-px
                                    active:scale-[0.98]"
                            >
                                {confirmAction.type === 'clear' ? 'Clear All' : 'Remove'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </EcommerceDesktopLayout>
    );
};

export default CartPage;