export const activeViewListReducer = (state = { activeViewList: '' }, action: any) => {
    switch (action.type) {
        case 'ACTIVE_VIEW_LIST':
            return {
                ...state,
                activeViewList: action.payload
            };
        default:
            return state;
    }
}
export default activeViewListReducer;