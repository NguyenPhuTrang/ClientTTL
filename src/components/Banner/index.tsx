import React from 'react';

interface Props {
    listBanner: any[];
}

const Banner = (
    { listBanner }: Props
) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 mb-20">
            {
                listBanner.map((item, index) => {
                    return (
                        <div key={index} className="rounded-[8px] bg-[#EDEDF0] flex flex-col items-center pt-[26px] pb-[24px]">
                            <div className="w-20 h-20 flex items-center justify-center">
                                <img src={item.image} alt="" />
                            </div>
                            <h2 className="text-[20px] font-[700] leading-[30px] text-[#1F1F1F]">{item.title}</h2>
                            <p className="text-[14px] leading-[20px] text-[#5A5B6A]">{item.description}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Banner;