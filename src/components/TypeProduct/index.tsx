import React from 'react';

interface Props {
    listButton: string[]
}

const TypeProduct = ({
    listButton
}: Props) => {
    return (
        <div className="w-full lg:flex md:grid sm:grid md:grid-cols-4 sm:grid-cols-1 items-center px-4  gap-2">
            <p className="text-[14px] font-[500] leading-[20px] text-[#19191D] mr-2 md:text-center sm:text-center select-none">Related</p>
            {
                listButton.map((item, index) => (
                    <div key={index} className="flex items-center justify-center bg-[#EDEDF0] px-4 py-[5px] rounded-full cursor-pointer hover:opacity-70">
                        <p className="text-[14px] font-[400] leading-[20px] text-[#4A4B57]">{item}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default TypeProduct;