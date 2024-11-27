import React from 'react';
import ListItem from '../ListItem';

interface Props {
    dataProducts: any[];
}

const List = ({
    dataProducts,
}: Props) => {
    return (
        <div className='w-full flex flex-col items-center justify-center lg:px-[65px] md:px-[45px] sm:px-[25px]'>
            <ul className='grid sm:grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {
                    dataProducts.map((item, index) => {
                        return (
                            <ListItem dataItems={item} key={index} />
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default List;