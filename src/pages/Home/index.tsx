import React from 'react';
import ListProduct from '../../components/List';
import { arrayData } from '../../data';

const HomePage = () => {
    return (
        <div className="w-full h-full custome_background overflow-y-auto">
            <div className="w-full lg:py-[90px] md:py-[60px] sm:py-[30px]">
                <h1 className="text-center text-black lg:text-[56px] md:text-[45px] sm:text-[40px] font-bold leading-[64px]">Inside Open Art</h1>
            </div>
            <ListProduct dataProducts={arrayData} />
        </div>
    )
};

export default HomePage;