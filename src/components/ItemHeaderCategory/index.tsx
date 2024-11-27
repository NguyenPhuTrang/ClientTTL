import React from 'react';

interface Props {
    active: boolean;
    icon: string;
    title: string;
}

const ItemHeaderCategory = ({
    active,
    icon,
    title
}: Props) => {
    return (
        <li
            className={`pt-2 pb-1 px-[14px] flex flex-col items-center justify-center gap-[4px] cursor-pointer hover:opacity-85 
            ${active ? 'bg-[#EBF2FF]' : ''} rounded-[10px] hover:bg-[#EBF2FF]`}
        >
            <img src={icon} alt="icon" />
            <p
                className={`${active ? 'text-[#2979FF] text-[14px] font-[500]' : 'text-[#787885] text-[14px] font-[500]'}
                leading-[20px] text-center select-none overflow-hidden whitespace-nowrap max-w-[150px]`}>
                {title}
            </p>
        </li>
    );
};

export default ItemHeaderCategory;