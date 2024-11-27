import React, { useState } from 'react';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import Modal from '../Modal';
import ProductOverview from '../ProductOverView';
interface Props {
    dataProducts: any[];
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const StackedListsProduct = (
    {
        dataProducts,
    }: Props
) => {
    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const closeModal = () => {
        setIsShowModal(false);
    }
    const openModal = (product: any) => {
        setSelectedProduct(product);
        setIsShowModal(true);
    }
    return (
        <div>
            <ul role="list" className="divide-y divide-gray-200 pb-4 pt-[1px] px-4 mt-6">
                {dataProducts.map((product, index) => (
                    <li key={index} className="flex justify-between gap-x-6 px-4 pt-4 pb-3">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={product.image} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-lg font-semibold leading-6 text-gray-900 line-clamp-2">{product.name}</p>
                                <p className="mt-1 text-sm leading-5 text-gray-500 max-w-[100xp] line-clamp-4">{product.description}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-lg leading-6 text-gray-900">${formatMoney(product.price)}</p>
                            <div className="flex items-center mt-4">
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
                        </div>
                        <div className='flex justify-center items-center'>
                            <ChevronRightIcon onClick={() => openModal(product)} className="h-5 w-5 flex-none text-gray-400 cursor-pointer" aria-hidden="true" />
                        </div>
                    </li>
                ))}
            </ul>
            {isShowModal && (
                <Modal open={isShowModal} onClose={closeModal}>
                    {selectedProduct && <ProductOverview product={selectedProduct} />}
                </Modal>
            )}
        </div>
    );
};

export default StackedListsProduct;