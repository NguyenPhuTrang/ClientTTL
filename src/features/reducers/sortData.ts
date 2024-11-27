
export const sortReducer = (state = { priceSort: '', ratingSort: '', saleSort: '' }, action: any) => {
    switch (action.type) {
        case "PRICE_SORT":
            return {
                ...state,
                priceSort: action.payload,
            };
        case "RATING_SORT":
            return {
                ...state,
                ratingSort: action.payload,
            };
        case "SALE_SORT":
            return {
                ...state,
                saleSort: action.payload,
            };
        default:
            return state;
    }
};

export default sortReducer;
