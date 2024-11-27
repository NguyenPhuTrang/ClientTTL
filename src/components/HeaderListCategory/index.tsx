import React from 'react';
import ItemHeaderCategory from '../ItemHeaderCategory';
import { categorysHeader } from '../../data';

const HeaderListCategory = () => {

    return (
        <ul className='flex justify-center items-center w-full'>
            {categorysHeader.map((item, index) => (
                <ItemHeaderCategory key={index} active={item.active} icon={item.icon} title={item.title} />
            ))}
        </ul>
    );
};

export default HeaderListCategory;