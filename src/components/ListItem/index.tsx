import React from 'react';

interface Props {
    dataItems: {
        icon: string;
        title: string;
        description: string;
    }
}

const ListItem = ({
    dataItems
}: Props) => {
    return (
        <li className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'>
            <div className="w-full h-full flex flex-col p-10">
                <img src={dataItems.icon} alt="icon" className="w-[30px] h-[30px] mb-4" />
                <h1 className="text-[#333] text-[24px] font-[400] leading-[32px]">
                    {dataItems.title}
                </h1>
                <p className="text-[#555] text-[16px] leading-[21px]">
                    {dataItems.description}
                </p>
            </div>
        </li>
    );
};

export default ListItem;