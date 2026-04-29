// hooks/useCart.ts
import { useDispatch } from 'react-redux';
import { cartApi } from '../services/cart.service';
import { setCart } from '../features/actions/cart';
import { useNotification } from '../common/helpers';

export const useCart = () => {
    const dispatch = useDispatch();
    const { showSuccessNotification, showErrorNotification } = useNotification();

    const fetchCart = async () => {
        try {
            const res: any = await cartApi.getMyCart();
            if (res.success) {
                dispatch(setCart(res.data));
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (productId: string, quantity: number = 1) => {
        try {
            const res: any = await cartApi.addToCart({ productId, quantity });
            if (res.success) {
                dispatch(setCart(res.data));
                showSuccessNotification('Added to cart', 'Product added successfully');
            }
        } catch (error) {
            showErrorNotification('Error', 'Could not add to cart');
        }
    };

    const updateCartItem = async (productId: string, quantity: number) => {
        try {
            const res: any = await cartApi.updateCartItem({ productId, quantity });
            if (res.success) {
                dispatch(setCart(res.data));
            }
        } catch (error) {
            showErrorNotification('Error', 'Could not update cart');
        }
    };

    const removeCartItem = async (productId: string) => {
        try {
            const res: any = await cartApi.removeCartItem(productId);
            if (res.success) {
                dispatch(setCart(res.data));
                showSuccessNotification('Removed', 'Product removed from cart');
            }
        } catch (error) {
            showErrorNotification('Error', 'Could not remove from cart');
        }
    };

    const clearCart = async () => {
        try {
            const res: any = await cartApi.clearCart();
            if (res.success) {
                dispatch(setCart({ items: [], totalPrice: 0 }));
            }
        } catch (error) {
            showErrorNotification('Error', 'Could not clear cart');
        }
    };

    return {
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
    };
};