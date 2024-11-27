import React from 'react';

const SortCategory = () => {
    return (
        <div>
            <div className='flex items-center px-2 py-2'>
                <div className='w-10 h-10 flex items-center justify-center cursor-pointer'>
                    {/* <img src="./icons/ic-right.svg" alt="icon" /> */}
                    <img src="./icons/ic-bottom.svg" alt="icon" />
                </div>
                <div>
                    <p className='text-[16px] font-[400] leading-[24px] tracking-wide text-[#19191D] select-none'>All Categories</p>
                    <p className='text-[14px] font-[400] leading-[20px] tracking-wide text-[#787885] select-none'>Ecommerce patterns</p>
                </div>
            </div>

            <ul className='w-full flex flex-col px-4'>
                <li className='flex flex-col'>
                    <div className='flex items-center'>
                        <div className='w-10 h-10 flex items-center justify-center cursor-pointer'>
                            <img src="./icons/ic-bottom.svg" alt="icon" />
                        </div>
                        <p className='text-[16px] font-[400] leading-[24px] tracking-wide text-[#19191D] select-none'>Electronics</p>
                    </div>
                </li>
                <li className='flex items-center'>
                    <div className='w-10 h-10 flex items-center justify-center cursor-pointer'>
                        <img src="./icons/ic-right.svg" alt="icon" />
                    </div>
                    <div>
                        <p className='text-[16px] font-[400] leading-[24px] tracking-wide text-[#19191D] select-none'>Business & Industrial</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SortCategory;