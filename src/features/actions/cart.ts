// features/actions/cart.ts
export const SET_CART = 'SET_CART';
export const setCart = (cart: any) => ({
    type: SET_CART,
    payload: cart,
});

const initialState = {
    items: [],
    totalPrice: 0,
};

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CART:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default cartReducer;