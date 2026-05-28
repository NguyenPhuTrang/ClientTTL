import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircleIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import { cartApi } from '../../services/cart.service';
import { useDispatch } from 'react-redux';
import { setCart } from '../../features/actions/cart';
import { Product, ProductColor } from '../../types';

interface Props {
    product: Product;
}

interface ToastProps {
    visible: boolean;
    productName: string;
}

const CartToast = ({ visible, productName }: ToastProps) => {
    const toast = (
        <>
            <style>{`
                @keyframes slideDown {
                    from { transform: translateX(-50%) translateY(-120%); opacity: 0; }
                    to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateX(-50%) translateY(0);     opacity: 1; }
                    to   { transform: translateX(-50%) translateY(-120%); opacity: 0; }
                }
                .toast-enter { animation: slideDown 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards; }
                .toast-exit  { animation: slideUp   0.30s cubic-bezier(0.4,0,1,1)         forwards; }
            `}</style>
            <div
                className={`fixed top-5 left-1/2 z-[9999] flex items-center gap-3
                    bg-white rounded-2xl px-5 py-3.5
                    shadow-[0_8px_32px_rgba(220,100,150,0.22),0_2px_8px_rgba(0,0,0,0.08)]
                    border border-[#fce8ee] min-w-[260px] max-w-[380px]
                    ${visible ? 'toast-enter' : 'toast-exit'}`}
                style={{ transform: 'translateX(-50%)' }}
                role="status"
                aria-live="polite"
            >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0a0bc] to-[#d46080]
                    flex items-center justify-center shadow-[0_4px_10px_rgba(220,100,150,0.35)]">
                    <ShoppingCartIcon className="w-[18px] h-[18px] text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-[700] text-[#3d1a2b] leading-tight truncate">
                        Đã thêm vào giỏ hàng!
                    </span>
                    <span className="text-[11px] text-[#c0768a] leading-tight truncate">
                        {productName}
                    </span>
                </div>
                <CheckCircleIcon className="shrink-0 w-8 h-8 text-[#e87aab] ml-auto" />
            </div>
        </>
    );
    return createPortal(toast, document.body);
};

const ProductOverview = ({ product }: Props) => {
    const images: string[] = product.images?.length
        ? product.images
        : product.image
        ? [product.image]
        : [];

    const [activeImg, setActiveImg] = useState(0);
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
        product.colors?.[0] ?? null
    );
    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.sizes?.[0] ?? null
    );
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const dispatch = useDispatch();

    function formatMoney(amount: any) {
        return Number(amount).toLocaleString('vi-VN');
    }

    const triggerToast = () => {
        setToastVisible(false);
        setShowToast(false);
        setTimeout(() => {
            setShowToast(true);
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
                setTimeout(() => setShowToast(false), 320);
            }, 2500);
        }, 50);
    };

    const handleAddToCart = async () => {
    try {
        setLoading(true);
        const res: any = await cartApi.addToCart({
            productId: product.id || product._id,
            quantity: 1,
            color: selectedColor
                ? { label: selectedColor.label, value: selectedColor.value }
                : undefined,
            size: selectedSize ?? undefined,
        });
        if (res.success) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
            triggerToast();
            const cartRes: any = await cartApi.getMyCart();
            if (cartRes.success) dispatch(setCart(cartRes.data));
        } else {
            alert(res.message ?? 'Thêm vào giỏ hàng thất bại');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Thêm vào giỏ hàng thất bại');
    } finally {
        setLoading(false);
    }
};

    return (
        <>
            {showToast && <CartToast visible={toastVisible} productName={product.name} />}

            <div className="bg-white rounded-2xl overflow-hidden w-full max-w-[1200px]
                shadow-[0_8px_40px_rgba(200,120,140,0.15)]">
                <div className="flex flex-col lg:flex-row min-h-[600px]">

                    {/* Left — Images */}
                    <div className="lg:w-[600px] shrink-0 flex flex-col gap-3 p-5
                        bg-gradient-to-br from-[#fce8ee] to-[#fdf0f5]">

                        {/* Main image */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/60">
                            <img
                                src={images[activeImg]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                            {product.sale > 0 && (
                                <div className="absolute top-3 left-3 bg-[#e87aab] text-white
                                    text-[11px] font-[800] px-3 py-1 rounded-full
                                    shadow-[0_4px_12px_rgba(232,122,171,0.4)]">
                                    -{product.sale}% OFF
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                                            ${i === activeImg
                                                ? 'border-[#e87aab] opacity-100'
                                                : 'border-transparent opacity-60 hover:opacity-90'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right — Details */}
                    <div className="flex-1 flex flex-col p-8 gap-5 justify-between overflow-y-auto">
                        <div className="flex flex-col gap-4">

                            {/* Name */}
                            <h1 className="text-[22px] font-[800] leading-[30px] text-[#3d1a2b] tracking-tight">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-end gap-3">
                                <span className="text-[30px] font-[800] text-[#d46080] leading-none">
                                    {formatMoney(product.price)}₫
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <span className="text-[16px] text-[#c0a0ac] line-through mb-0.5">
                                        {formatMoney(product.originalPrice)}₫
                                    </span>
                                )}
                            </div>

                            <div className="h-px bg-gradient-to-r from-[#fce8ee] via-[#e87aab]/30 to-[#fce8ee]" />

                            {/* Description */}
                            <p className="text-[14px] leading-[24px] text-[#9a7080]">
                                {product.description}
                            </p>

                            {/* Colors */}
                            {!!product.colors?.length && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-[12px] font-[600] text-[#c0a0ac] uppercase tracking-wide">
                                        Màu sắc
                                        {selectedColor && (
                                            <span className="normal-case font-[400] ml-1.5">
                                                — {selectedColor.label}
                                            </span>
                                        )}
                                    </span>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.colors.map((c: ProductColor) => (
                                            <button
                                                key={c.value}
                                                title={c.label}
                                                onClick={() => setSelectedColor(c)}
                                                className={`w-9 h-9 rounded-full border-2 transition-all
                                                    ${selectedColor?.value === c.value
                                                        ? 'border-[#e87aab] scale-110 shadow-[0_0_0_3px_rgba(232,122,171,0.25)]'
                                                        : 'border-gray-200 hover:border-gray-400'}`}
                                                style={{ background: c.value }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {!!product.sizes?.length && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-[12px] font-[600] text-[#c0a0ac] uppercase tracking-wide">
                                        Types
                                    </span>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.sizes.map((s: string) => (
                                            <button
                                                key={s}
                                                onClick={() => setSelectedSize(s)}
                                                className={`min-w-[44px] h-10 px-3 rounded-lg border text-[13px] font-[600]
                                                    transition-all
                                                    ${selectedSize === s
                                                        ? 'border-[#e87aab] bg-[#fce8ee] text-[#d46080]'
                                                        : 'border-gray-200 text-[#9a7080] hover:border-[#e87aab]/50'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Info rows */}
                            <div className="flex flex-col rounded-xl border border-[#fce8ee] overflow-hidden mt-1">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#fce8ee]">
                                    <span className="text-[13px] text-[#c0a0ac]">Tình trạng</span>
                                    <span className="text-[13px] font-[600] text-[#5a3045]">
                                        {product.condition ?? 'New'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#fce8ee]">
                                    <span className="text-[13px] text-[#c0a0ac]">Còn lại</span>
                                    <span className="text-[13px] font-[600] text-[#5a3045]">
                                        {product.quantity} sản phẩm
                                    </span>
                                </div>
                                {!!product.totalSold && (
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#fce8ee]">
                                        <span className="text-[13px] text-[#c0a0ac]">Đã bán</span>
                                        <span className="text-[13px] font-[600] text-[#5a3045]">
                                            {product.totalSold}
                                        </span>
                                    </div>
                                )}
                                {product.shipping?.estimatedDelivery && (
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#fce8ee]">
                                        <span className="text-[13px] text-[#c0a0ac]">Giao hàng</span>
                                        <span className="text-[13px] font-[600] text-[#5a3045]">
                                            {product.shipping.estimatedDelivery}
                                        </span>
                                    </div>
                                )}
                                {product.shipping?.isFreeShip && (
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <span className="text-[13px] text-[#c0a0ac]">Phí ship</span>
                                        <span className="text-[13px] font-[600] text-[#3B6D11]">
                                            Miễn phí
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add to cart */}
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={loading || product.quantity === 0}
                            className="w-full h-[52px] rounded-2xl border-none text-white text-[15px] font-[700]
                                cursor-pointer transition-all duration-200 tracking-wide mt-2
                                bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#d46080]
                                shadow-[0_6px_20px_rgba(220,100,150,0.35)]
                                hover:shadow-[0_8px_28px_rgba(220,100,150,0.5)] hover:-translate-y-0.5
                                active:scale-[0.97]
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {loading
                                ? 'Đang thêm...'
                                : added
                                ? '✓ Đã thêm vào giỏ'
                                : product.quantity === 0
                                ? 'Hết hàng'
                                : 'Thêm vào giỏ hàng'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductOverview;