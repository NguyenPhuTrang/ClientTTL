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
    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const [isShowModal, setIsShowModal] = useState(false);
    const closeModal = () => {
        setIsShowModal(false);
    }

    return (
        <div className="w-full flex flex-col px-4 pt-4 pb-3 rounded-[8px] hover:shadow-item-product">
            <div className="flex justify-center rounded">
                <img src={product.image} className="rounded" alt="" />
            </div>
            <p className="text-[16px] font-[400] leading-[24px] text-[#19191D] mt-3 line-clamp-3 h-[74px] select-none">{product.name}</p>
            <div className='flex items-center justify-between flex-wrap mt-2'>
                <h3 className="text-[24px] font-[700] leading-[36px] text-[#000000] opacity-85 select-none">${formatMoney(product.price)}</h3>
                {
                    product.sale !== '0' ? (
                        <div className='h-6 rounded bg-[#ECF7ED] px-[10px] py-[5px] flex items-center justify-center'>
                            <p className='text-[12px] text-[#37833B] leading-[16px] font-[400] roboto_font'>{product.sale}% OFF</p>
                        </div>
                    ) : null
                }
            </div>
            <p className="text-[16px] font-[400] leading-[20px] text-[#787885] mt-2 line-clamp-2 h-[41px] select-none">{product.description}</p>
            <div className="mt-[9px] flex items-center justify-between flex-1 gap-4 py-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center mr-2">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                    product.rating > rating ? 'text-[#FB8200]' : 'text-gray-300',
                                    'h-[11px] w-[11px] mr-[3px]'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <p className="text-[14px] leading-[22px] font-[500] text-[#5E6366]">{product.rating}</p>
                </div>
                <button
                    onClick={() => setIsShowModal(true)}
                    className="border-[1px] border-solid border-[#9DC2FF] hover:bg-[#9DC2FF] rounded px-3 py-1 flex items-center justify-center">
                    <div className="flex items-center">
                        <img src="./icons/ic-heart.svg" alt="" />
                        <p className="text-[14px] text-[#2264D1] font-[500] leading-[20px] ml-[5px]">Watch</p>
                    </div>
                </button>
            </div>
            <Modal open={isShowModal} onClose={closeModal}>
                <ProductOverview product={product} />
            </Modal>
        </div>
    );
};

export default ItemProduct;