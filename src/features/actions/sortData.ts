export const priceSort = (priceSort: any) => {
    return {
        type: "PRICE_SORT",
        payload: priceSort
    }
};

export const ratingSort = (ratingSort: any) => {
    return {
        type: "RATING_SORT",
        payload: ratingSort
    }
}

export const saleSort = (saleSort: any) => {
    return {
        type: "SALE_SORT",
        payload: saleSort
    }
}