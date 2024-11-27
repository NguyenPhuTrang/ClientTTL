import React from 'react';

const Search = () => {
    return (
        <div className='rounded-[99px] bg-[#EDEDF0] flex items-center justify-center py-2 px-2'>
            <div className='p-[7px] flex items-center justify-between'>
                <img src="./icons/ic-search.svg" alt="search" />
            </div>
            <input
                type="text"
                className='bg-[#EDEDF0] outline-none text-[#19191D] text-[20px] font-[400] leading-[32px]'
            />
            <div className='flex items-center justify-center p-[9px]'>
                <img src="./icons/ic-close-search.svg" alt="" />
            </div>
        </div>
    );
};

export default Search;