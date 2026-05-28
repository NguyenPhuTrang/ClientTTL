import React, { useState } from 'react';
import { Product, ProductColor } from '../../types';
import Modal from '../Modal';
import ProductOverview from '../ProductOverView';

interface Props {
    product: Product;
}

const ItemProduct = ({ product }: Props) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    function formatMoney(amount: any) {
        return Number(amount).toLocaleString('vi-VN');
    }

    const images: string[] = product.images?.length
        ? product.images
        : product.image
        ? [product.image]
        : [];

    return (
        <>
            <div className="group w-full flex flex-col bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden
                transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d1d5db]">

                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                        src={images[activeImg]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                 <div className="absolute top-2 left-2 flex flex-row gap-1.5">
                        {product.sale > 0 && (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full
                                bg-[#FBEAF0] text-[#993556] border border-[#ED93B1]">
                                -{product.sale}%
                            </span>
                        )}
                        {product.condition === 'New' && (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full
                                bg-[#EAF3DE] text-[#3B6D11] border border-[#97C459]">
                                New
                            </span>
                        )}
                        {product.shipping?.isFreeShip && (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full
                                bg-[#E6F1FB] text-[#185FA5] border border-[#85B7EB]">
                                Free ship
                            </span>
                        )}
                    </div>

                    {/* Image indicator dots */}
                    {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {images.map((_: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all
                                        ${i === activeImg ? 'bg-white' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3.5 gap-2.5">

                    {/* Name */}
                    <p className="text-[13px] font-medium leading-[1.4] text-gray-900 line-clamp-2 min-h-[36px]">
                        {product.name}
                    </p>

                    {/* Colors */}
                    {!!product.colors?.length && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-gray-400">Màu</span>
                            {product.colors.map((c: ProductColor) => (
                                <span
                                    key={c.value}
                                    title={c.label}
                                    className="w-3.5 h-3.5 rounded-full border border-gray-300 cursor-pointer flex-shrink-0"
                                    style={{ background: c.value }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Delivery */}
                    {product.shipping?.estimatedDelivery && (
                        <p className="text-[11px] text-gray-500 flex items-center gap-1">
                            <span>🚚</span>
                            <span>{product.shipping.estimatedDelivery}</span>
                        </p>
                    )}

                    {/* Rating — chỉ hiện khi có đánh giá */}
                    {!!product.totalRatings && (
                        <div className="flex items-center gap-1">
                            {[0, 1, 2, 3, 4].map((r) => (
                                <svg
                                    key={r}
                                    className={`w-3 h-3 ${product.rating > r ? 'text-amber-400' : 'text-gray-200'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="text-[11px] text-gray-400 ml-0.5">
                                {product.rating} ({product.totalRatings})
                            </span>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gray-100" />

                    {/* Price + Button */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[17px] font-medium text-gray-900">
                                {formatMoney(product.price)}₫
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-[11px] text-gray-400 line-through">
                                    {formatMoney(product.originalPrice)}₫
                                </span>
                            )}
                        </div>
                            <button
                                onClick={() => setIsShowModal(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                    bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#d46080]
                                    text-white text-[12px] font-medium
                                    shadow-[0_3px_10px_rgba(220,100,150,0.25)]
                                    hover:shadow-[0_4px_14px_rgba(220,100,150,0.4)]
                                    hover:-translate-y-px active:scale-95 transition-all duration-150"
                            >
                                Xem chi tiết
                            </button>
                    </div>

                    {/* Stock */}
                    {product.quantity > 0 && (
                        <p className="text-[11px] text-gray-400">
                            Còn <span className="text-green-600 font-medium">{product.quantity}</span> sản phẩm
                        </p>
                    )}
                </div>
            </div>

            <Modal open={isShowModal} onClose={() => setIsShowModal(false)}>
                <ProductOverview product={product} />
            </Modal>
        </>
    );
};

export default ItemProduct;