import React from 'react';
import ItemProduct from '../ItemProduct';

interface Props {
    dataProducts: any[];
}

const ListProduct = ({
    dataProducts,
}: Props) => {
    
    return (
        <div 
            className="mt-[35px] w-full pb-4 pt-[1px] px-4 grid gap-4 grid-cols-1 
            lg:grid-cols-4 md:grid-cols-3 overflow-y-auto rounded">
            {dataProducts.map((item, index) => (
                <ItemProduct key={index} product={item} />
            ))}
        </div>
    );
};

export default ListProduct;