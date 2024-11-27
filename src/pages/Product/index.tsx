import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import TypeProduct from '../../components/TypeProduct';
import ListProduct from '../../components/ListProduct';
import { listBanner, listButton } from '../../data';
import { useSelector } from 'react-redux';
import EcommerceDesktopLayout from '../../layouts/EcommerceDesktop';
import Banner from '../../components/Banner';
import * as ProductApi from '../../hooks';
import { Product } from '../../types';
import StackedListsProduct from '../../components/StackedListsProduct';

const ProductPage = () => {

    const [dataProducts, setProducts] = useState<Product[]>([]);
    const sortPrice = useSelector((state: any) => state.dataSort.priceSort);
    const sortRating = useSelector((state: any) => state.dataSort.ratingSort);
    const activeViewList = useSelector((state: any) => state.activeViewList?.activeViewList);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let queryParams: {
                    page: number;
                    limit: number;
                    keyword?: string;
                    orderBy?: string;
                    orderDirection?: string;
                    price?: string;
                    rating?: string;
                } = {
                    page: 1,
                    limit: 10
                };
                if (sortPrice === 'High to low') {
                    queryParams.price = 'desc';
                }
                if (sortPrice === 'Low to high') {
                    queryParams.price = 'asc';
                }
                if (sortRating !== '') {
                    queryParams.rating = sortRating;
                }

                const response = await ProductApi.getAllProducts(queryParams);
                if (response.success) {
                    setProducts(response.data?.items || []);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [sortPrice, sortRating])

    return (
        <EcommerceDesktopLayout>
            <div className="w-full flex flex-col shadow-dark rounded-lg">
                <Header />
                <TypeProduct listButton={listButton} />
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
                                <span className="bg-white px-2 text-sm text-gray-500">Không có sản phẩm</span>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Banner listBanner={listBanner} />
        </EcommerceDesktopLayout>
    );
};

export default ProductPage;