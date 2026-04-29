import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { cartApi } from '../../services/cart.service';

interface Props {
    product: any;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const ProductOverview = ({ product }: Props) => {
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const saleValue = parseFloat(product.sale);
    const hasSale = !isNaN(saleValue) && saleValue > 0;

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            const res: any = await cartApi.addToCart({
                productId: product.id || product._id,
                quantity: 1,
            });

            if (res.success) {
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
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
        <div className="bg-white rounded-2xl overflow-hidden w-full max-w-[800px]
            shadow-[0_8px_40px_rgba(200,120,140,0.15)]">
            <div className="flex flex-col lg:flex-row min-h-[480px]">

                {/* Left — Image */}
                <div className="relative lg:w-[380px] shrink-0 bg-gradient-to-br from-[#fce8ee] to-[#fdf0f5]
                    flex items-center justify-center p-6">
                    {hasSale && (
                        <div className="absolute top-4 left-4 z-10 bg-[#e87aab] text-white
                            text-[11px] font-[800] tracking-wider px-3 py-1.5 rounded-full
                            shadow-[0_4px_12px_rgba(232,122,171,0.4)]">
                            -{saleValue}% OFF
                        </div>
                    )}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Right — Details */}
                <div className="flex-1 flex flex-col p-8 gap-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[22px] font-[800] leading-[30px] text-[#3d1a2b] tracking-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center justify-between">
                            <span className="text-[30px] font-[800] text-[#d46080] leading-none">
                                ${formatMoney(product.price)}
                            </span>
                            <div className="flex items-center gap-2 bg-[#fdf5f7] px-3 py-1.5 rounded-xl">
                                <div className="flex items-center gap-0.5">
                                    {[0, 1, 2, 3, 4].map((r) => (
                                        <StarIcon
                                            key={r}
                                            className={classNames(
                                                product.rating > r ? 'text-[#e87aab]' : 'text-[#f0d0da]',
                                                'h-[13px] w-[13px]'
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-[13px] font-[600] text-[#c0768a]">{product.rating}</span>
                            </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-[#fce8ee] via-[#e87aab]/30 to-[#fce8ee]" />
                        <p className="text-[14px] font-[400] leading-[24px] text-[#9a7080]">
                            {product.description}
                        </p>
                        <div className="flex flex-col gap-1 mt-1">
                            <div className="flex items-center justify-between py-2.5 border-b border-[#fce8ee]">
                                <span className="text-[13px] text-[#c0a0ac]">Quantity available</span>
                                <span className="text-[13px] font-[600] text-[#5a3045]">{product.quantity}</span>
                            </div>
                            <div className="flex items-center justify-between py-2.5 border-b border-[#fce8ee]">
                                <span className="text-[13px] text-[#c0a0ac]">Condition</span>
                                <span className="text-[13px] font-[600] text-[#5a3045]">{product.condition || 'New'}</span>
                            </div>
                            {product.delivery && (
                                <div className="flex items-center justify-between py-2.5 border-b border-[#fce8ee]">
                                    <span className="text-[13px] text-[#c0a0ac]">Delivery</span>
                                    <span className="text-[13px] font-[600] text-[#5a3045]">{product.delivery}</span>
                                </div>
                            )}
                            {hasSale && (
                                <div className="flex items-center justify-between py-2.5 border-b border-[#fce8ee]">
                                    <span className="text-[13px] text-[#c0a0ac]">Discount</span>
                                    <span className="text-[13px] font-[600] text-[#e87aab]">{saleValue}% OFF</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Button */}
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
                            ? 'Adding...'
                            : added
                            ? '✓ Added to Cart'
                            : product.quantity === 0
                            ? 'Out of Stock'
                            : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductOverview;