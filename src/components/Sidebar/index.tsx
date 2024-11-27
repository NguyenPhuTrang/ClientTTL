import React from 'react';
import SortCategory from '../SortCategory';
import CollapsedFilters from '../Filters';
import { optionFilter } from '../../data';

const Sidebar = () => {
    
    return (
        <div className='lg:flex md:hidden sm:hidden flex-col bg-white 2xl:w-[355px] xl:w-[300px] lg:w-[270px] h-full 2xl:pr-[51px] lg:pr-10 gap-10'>
            <div className='border-[1px] border-solid rounded-[8px] border-[#9DC2FF] flex items-center py-[8px] pl-[12px] gap-2 pr-[20px]'>
                <div className='w-[32px] h-[32px] flex items-center justify-center'>
                    <img src="./icons/ic-sort-product.svg" alt="icon" className='' />
                </div>
                <h2 className='w-[232px] leading-[36px] font-[700] text-[24px] text-[#2264D1] quicksand-font text-center'>
                    Departments
                </h2>
            </div>

            <SortCategory />

            <div className='w-full'>
                {optionFilter.map((option, index) => (
                    <CollapsedFilters key={index} title={option.title} options={option.options}/>
                ))}
            </div>

        </div>
    );
};

export default Sidebar;