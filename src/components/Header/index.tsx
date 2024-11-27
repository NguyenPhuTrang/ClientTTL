import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import { dataDropdown } from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { activeViewList } from '../../features/actions/activeViewList';

const Header = () => {

    const dispatch = useDispatch();

    const activeView = useSelector((state: any) => state.activeViewList?.activeViewList);

    const [active, setActive] = useState<string>('grid');

    const [isShowMenu, setIsShowMenu] = useState(false);
    return (
        <div className="w-full flex flex-col md:flex-row sm:flex-col lg:gap-4 md:gap-4 items-center justify-between px-4 pt-4 pb-10">
            <ul className="flex item-center sm:gap-4 md:gap-0 lg:order-1 md:order-2 sm:order-2">
                {dataDropdown.map((item, index) => (
                    <li key={index} className='md:mr-4'>
                        <Dropdown label={item.label} options={item.options} />
                    </li>
                ))}
            </ul>

            <div className="flex item-center justify-between lg:order-2 md:order-2 sm:order-1 sm:mb-4 md:mb-0 lg:mb-0 sm:justify-end sm:relative sm:w-full md:w-auto">
                <img
                    src='./icons/ic-menu.svg'
                    alt='menu'
                    className='w-[24px] h-[24px] sm:block md:hidden cursor-pointer select-none'
                    onClick={() => setIsShowMenu(!isShowMenu)}
                />
                <div
                    onClick={() => { setIsShowMenu(false) }}
                    className={`fixed right-0 top-0 left-0 r bottom-0 md:hidden sm:bg-gray-400 z-10 sm:bg-opacity-50 ${isShowMenu ? '' : 'hidden'}`}></div>
                <div
                    className={`items-center md:mr-4 md:flex lg:hidden relative rounded 
                    md:border-[1px] md:border-solid md:border-[#B4B4BB]  
                    ${isShowMenu ? 'custom-animation-in' : 'sm:hidden'} md:bg-white sm:z-20 sm:flex sm:justify-start sm:bg-white
                    md:relative sm:w-[300px] sm:h-screen md:h-auto md:w-auto sm:fixed sm:top-0 sm:right-0 border-none sm:px-2 md:px-0 sm:py-2 md:py-0 sm:flex-col md:flex-row
                `}>
                    <div
                        onClick={() => { setIsShowMenu(false) }}
                        className='flex items-center justify-start w-full md:hidden cursor-pointer mb-5'
                    >
                        <img src='./icons/ic-close.svg' alt='' className='w-5 h-5' />
                    </div>
                    <div className='sm:w-full md:full md:w-auto md:bg-white sm:sm:bg-white group md:px-4 md:py-[7px] relative'>
                        <div className='flex items-center justify-center'>
                            <p className='text-[14px] font-[400] leading-[20px] text-[#5A5B6A] select-none'>Show all</p>
                            <div className='flex items-center justify-center w-[24px] h-[24px]'>
                                <img src="./icons/ic-dropdown.svg" alt='' />
                            </div>
                        </div>
                        <ul
                            className='group-hover:flex flex-col items-center hidden absolute top-[100%] 
                            left-0 w-full gap-1 border-[1px] bg-[#fff] border-solid border-[#B4B4BB] rounded-[4px]
                            animate-flip-down animate-once animate-ease-out
                        '>
                            <li className='w-full px-4 py-2 cursor-pointer hover:bg-slate-300 text-[14px] font-[500] text-[#19191D] leading-5'>
                                <p className='text-[14px] font-[400] leading-[20px] text-[#5A5B6A] select-none'>
                                    Show all
                                </p>
                            </li>
                            <li className='w-full px-4 py-2 cursor-pointer hover:bg-slate-300 text-[14px] font-[500] text-[#19191D] leading-5'>
                                <p className='text-[14px] font-[400] leading-[20px] text-[#5A5B6A] select-none'>
                                    Auction
                                </p>
                            </li>
                            <li className='w-full px-4 py-2 cursor-pointer hover:bg-slate-300 text-[14px] font-[500] text-[#19191D] leading-5'>
                                <p className='text-[14px] font-[400] leading-[20px] text-[#5A5B6A] select-none'>
                                    Buy now
                                </p>
                            </li>
                        </ul>
                    </div>
                    <ul className='items-center sm:flex md:hidden lg:hidden w-full justify-center absolute bottom-0 mb-5'>
                        <li className='flex items-center justify-items-center bg-[#EBF2FF] rounded select-none cursor-pointer py-1 px-5'>
                            <div
                                onClick={() => {
                                    dispatch(activeViewList('list'));
                                    setActive('list');
                                }}
                                className='w-[28px] h-[28px] flex items-center justify-center'
                            >
                                <img src='./icons/ic-view-list.svg' alt='list' className='w-full' />
                            </div>
                        </li>
                        <li className='flex items-center justify-items-center bg-[#fff] rounded border-[1px] py-1 px-5 select-none cursor-pointer border-[#fff] button-option-shadow'>
                            <div
                                onClick={() => {
                                    dispatch(activeViewList('grid'));
                                    setActive('grid');
                                }}
                                className='w-[28px] h-[28px] flex items-center justify-center'
                            >
                                <img src='./icons/ic-view-grid.svg' alt='list' className='w-full' />
                            </div>
                        </li>
                    </ul>
                </div>
                <ul className='mr-4 lg:flex items-center md:hidden sm:hidden'>
                    <li className='flex items-center justify-items-center bg-[#EBF2FF] py-2 px-4 rounded cursor-pointer hover:shadow-button-option'>
                        <p className='text-[14px] font-[400] leading-[20px] text-[#5A5B6A] select-none hover:text-[#2264D1] overflow-hidden whitespace-nowrap max-w-[150px]'>Show all</p>
                    </li>
                    <li className='flex items-center justify-items-center bg-[#fff] py-2 px-4 rounded cursor-pointer border-[1px] border-[#fff] button-option-shadow'>
                        <p className='text-[14px] font-[400] leading-[20px] text-[#2264D1] select-none'>Auction</p>
                    </li>
                    <li className='flex items-center justify-items-center bg-[#EBF2FF] py-2 px-4 rounded cursor-pointer'>
                        <p className='text-[14px] font-[400] leading-[20px] text-[#5A5B6A] select-none hover:text-[#2264D1] overflow-hidden whitespace-nowrap max-w-[150px]'>Buy now</p>
                    </li>
                </ul>
                <ul className='items-center sm:hidden md:flex lg:flex'>
                    <li
                        onClick={() => {
                            dispatch(activeViewList('list'));
                            setActive('list');
                        }}
                        className={`flex items-center justify-items-center  
                        py-1 px-5 rounded select-none cursor-pointer
                        ${active === 'list' ? 'border-[#fff] button-option-shadow bg-[#fff] border-[1px]' : 'bg-[#EBF2FF]'}`}>
                        <div
                            className='w-[28px] h-[28px] flex items-center justify-center'
                        >
                            <img src='./icons/ic-view-list.svg' alt='list' className='w-[18px] h-[18px]' />
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            dispatch(activeViewList('grid'));
                            setActive('grid');
                        }}
                        className={`flex items-center justify-items-center 
                        py-1 px-5 rounded select-none cursor-pointer 
                        ${active === 'grid' ? 'border-[#fff] button-option-shadow bg-[#fff] border-[1px]' : 'bg-[#EBF2FF]'}`}>
                        <div
                            className='w-[28px] h-[28px] flex items-center justify-center'
                        >
                            <img src='./icons/ic-view-grid.svg' alt='list' className='w-[18px] h-[18px]' />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Header;
