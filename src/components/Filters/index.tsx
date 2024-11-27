import React, { useState } from 'react';

interface Props {
    title: string;
    options: any[];
}

const CollapsedFilters = ({
    title,
    options,
}: Props) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const handleShowMenu = () => {
        if (options.length !== 0) {
            setIsShowMenu(!isShowMenu);
        }
    };
    return (
        <div className={`rounded w-full flex flex-col mb-[24px] ${isShowMenu ? '' : 'shadow-dark'}`}>
            <div
                onClick={handleShowMenu}
                className={`w-full flex items-center justify-between cursor-pointer  ${isShowMenu ? 'bg-[#F7F7FA]' : 'bg-[#fff]'}`}>
                <p className='text-[16px] text-[#19191D] font-[400] leading-[24px] pl-2 select-none'>{title}</p>
                <div className='w-10 h-10 flex items-center justify-center select-none'>
                    {isShowMenu ? (
                        <img src="./icons/ic-top.svg" alt="icon" className=' select-none' />
                    ) : (
                        <img src="./icons/ic-bottom.svg" alt="icon" className=' select-none' />
                    )}
                </div>
            </div>
            {isShowMenu && (
                <ul className='w-full flex flex-col relative bg-[#F7F7FA] gap-[2px] 
                animate-duration-500 animate-flip-down animate-once animate-ease-in-out px-2 pb-2'>
                    {options && options.map((option, i) => (
                        <li key={i} className='flex items-center gap-2'>
                            <div className='p-[11px] flex items-center justify-center'>
                                <input type="checkbox" className='w-[18px] h-[18px] border-[1px] border-[#4A4B57]' />
                            </div>
                            <p className='text-4 text-[#19191D] font-[400] leading-[24px] select-none'>
                                {option.title}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CollapsedFilters;