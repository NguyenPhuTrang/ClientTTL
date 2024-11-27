import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { priceSort, ratingSort, saleSort } from '../../features/actions/sortData';
import { Option } from '../../types';

interface Props {
    label: string;
    options: Option[];
}

const Dropdown = ({ label, options }: Props) => {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(label);

    const handleToggle = () => setActive(true);
    const extractNumberFromStars = (str: any) => {
        const parts = str.split(' ');
        for (let i = 0; i < parts.length; i++) {
            if (!isNaN(parseInt(parts[i]))) {
                return parseInt(parts[i]);
            }
        }
        return null;
    };
    const handleItemClick = (title: string) => {
        setSelectedLabel(title);
        switch (label) {
            case 'SORT PRICE':
                dispatch(priceSort(title));
                break;
            case 'SORT RATING':
                dispatch(ratingSort(extractNumberFromStars(title)));
                break;
            case 'SORT SALE':
                dispatch(saleSort(title));
                break;
            default:
                break;
        }
    };

    const handleResetSort = () => {
        setSelectedLabel(label);
        switch (label) {
            case 'SORT PRICE':
                dispatch(priceSort(''));
                setActive(false)
                break;
            case 'SORT RATING':
                dispatch(ratingSort(''));
                setActive(false)
                break;
            case 'SORT SALE':
                dispatch(saleSort(''));
                setActive(false)
                break;
            default:
                break;
        }
    }

    return (
        <div className='w-full border-[1px] border-solid border-[#B4B4BB] rounded-[4px] flex flex-col items-center justify-center pl-4 pr-[12px] py-[7px] relative group'>
            <button
                className='flex items-center justify-center select-none'>
                <p
                    className={`text-[14px] font-[500] leading-5 mr-1 
                    ${selectedLabel !== label ? 'text-[#19191D]' : 'text-[#787885]'}
                    overflow-hidden whitespace-nowrap max-w-[150px]`}>
                    {selectedLabel}
                </p>
                <div className='flex items-center justify-center w-[24px] h-[24px]'>
                    {selectedLabel === label ? (
                        <img src="./icons/ic-dropdown.svg" alt='icon' />
                    ) : (
                        <img
                            onClick={handleResetSort}
                            src="./icons/ic-close.svg"
                            alt='icon'
                            className='w-3 h-3 cursor-pointer'
                        />
                    )}
                </div>
            </button>
            <ul className={`
                w-full flex-col gap-1 absolute top-[100%] left-0 border-[1px] bg-[#fff] 
                z-10 border-solid border-[#B4B4BB] rounded-[4px] hidden group-hover:flex
                animate-flip-down animate-once animate-ease-out`}>
                {options.map((item, index) => (
                    <li
                        onClick={() => {
                            handleToggle();
                            handleItemClick(item.title)
                        }}
                        key={index}
                        className='px-4 py-2 cursor-pointer hover:bg-slate-300 text-[14px] font-[500] text-[#19191D] leading-5'>
                        {item.title}
                    </li>
                ))}
            </ul>
            <span
                className={`absolute top-[-10px] sort-custom-animation left-[12px] text-[500] text-[10px] text-[#787885] bg-[#fff] px-1 leading-4 ${active ? 'block' : 'hidden'}`}>
                {label}
            </span>
        </div>
    )
};

export default Dropdown;
