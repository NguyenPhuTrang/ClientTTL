import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import EcommerceDesktopLayout from '../../layouts/EcommerceDesktop';
import ListProduct from '../../components/ListProduct';
import StackedListsProduct from '../../components/StackedListsProduct';
import Banner from '../../components/Banner';
import { listBanner } from '../../data';
import { useSelector } from 'react-redux';
import * as ProductApi from '../../hooks';
import { Product } from '../../types';

const CategoryPage = () => {
    const { id } = useParams();
    const [dataProducts, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const activeViewList = useSelector((state: any) => state.activeViewList?.activeViewList);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                setLoading(true);
                const response = await ProductApi.getAllProducts({
                    page: 1,
                    limit: 10,
                    categoryId: id, 
                });
                if (response.success) {
                    setProducts(response.data?.items || []);
                }
            } catch (error) {
                console.error('Error fetching products by category:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductsByCategory();
        }
    }, [id]); 

    return (
        <EcommerceDesktopLayout>
            <div className="w-full flex flex-col shadow-dark rounded-lg">
                <Header />
                {loading ? (
                    <div className='w-full flex items-center justify-center p-20'>
                        <h3 className='mr-4'>Loading</h3>
                        <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600" />
                    </div>
                ) : (
                    dataProducts.length > 0 ? (
                        activeViewList === 'list' ? (
                            <StackedListsProduct dataProducts={dataProducts} />
                        ) : (
                            <ListProduct dataProducts={dataProducts} />
                        )
                    ) : (
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-2 text-sm text-gray-500">
                                    Không có sản phẩm trong danh mục này
                                </span>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Banner listBanner={listBanner} />
        </EcommerceDesktopLayout>
    );
};

export default CategoryPage;
