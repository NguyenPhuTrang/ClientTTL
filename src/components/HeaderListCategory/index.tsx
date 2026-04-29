import React, { useEffect, useState } from 'react';
import ItemHeaderCategory from '../ItemHeaderCategory';
import { categoryApi } from '../../services/category.service';
import { useNavigate, useParams } from 'react-router-dom';

interface ICategory {
    _id: string;
    title: string;
    icon: string;
    sortOrder: number;
    isActive: boolean;
}

const HeaderListCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll<ICategory>({});
                setCategories(response.data?.items || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        navigate(`/category/${categoryId}`);
    };

   return (
    <ul className='flex justify-center items-center w-full mt-4'>
        {categories.map((item, index) => (
            <ItemHeaderCategory
                key={item._id || index}
                active={item._id === id}
                icon={item.icon}
                title={item.title}
                onClick={() => handleCategoryClick(item._id)}
            />
        ))}
    </ul>
);
};

export default HeaderListCategory;
