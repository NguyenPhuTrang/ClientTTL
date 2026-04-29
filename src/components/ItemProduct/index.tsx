import React, { useState } from 'react';
import { Product } from '../../types'
import Modal from '../Modal';
import ProductOverview from '../ProductOverView';
import { StarIcon } from '@heroicons/react/20/solid'

interface Props {
    product: Product;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const ItemProduct = ({ product }: Props) => {
    const [isShowModal, setIsShowModal] = useState(false);

    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            <div className="group w-full flex flex-col bg-white rounded-2xl border border-[#fce8ee] overflow-hidden
                shadow-[0_2px_12px_rgba(200,120,140,0.06)] hover:shadow-[0_8px_28px_rgba(200,120,140,0.15)]
                transition-all duration-300 hover:-translate-y-1">

                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#fdf5f7]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.sale !== '0' && (
                        <div className="absolute top-3 left-3 bg-[#e87aab] text-white text-[11px] font-[700]
                            px-2.5 py-1 rounded-full shadow-sm">
                            -{product.sale}% OFF
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 gap-3">

                    {/* Name */}
                    <p className="text-[14px] font-[600] leading-[20px] text-[#5a3045] line-clamp-2 select-none min-h-[40px]">
                        {product.name}
                    </p>

                    {/* Description */}
                    <p className="text-[12px] font-[400] leading-[18px] text-[#c0a0ac] line-clamp-2 select-none min-h-[36px]">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        product.rating > rating ? 'text-[#e87aab]' : 'text-[#f0d0da]',
                                        'h-[12px] w-[12px]'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="text-[12px] font-[500] text-[#c0768a]">{product.rating}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#fce8ee]" />

                    {/* Price + Button */}
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[18px] font-[700] leading-[28px] text-[#d46080] select-none">
                            ${formatMoney(product.price)}
                        </h3>
                        <button
                            onClick={() => setIsShowModal(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
                                text-white text-[12px] font-[600]
                                shadow-[0_3px_10px_rgba(220,100,150,0.25)]
                                hover:shadow-[0_4px_14px_rgba(220,100,150,0.4)]
                                hover:-translate-y-px transition-all duration-150
                                active:scale-[0.97]"
                        >
                            <img src="/icons/ic-heart.svg" alt="" className="w-3.5 h-3.5 brightness-0 invert" />
                            <span>Watch</span>
                        </button>
                    </div>
                </div>
            </div>

            <Modal open={isShowModal} onClose={() => setIsShowModal(false)}>
                <ProductOverview product={product} />
            </Modal>
        </>
    );
};

export default ItemProduct;