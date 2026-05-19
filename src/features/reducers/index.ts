import { combineReducers, createStore } from "redux";
import sortReducer from "./sortData";
import showToastReducer from "./toastSlice";
import userProfileReducer from "./userProfile";
import activeViewListReducer from "./activeViewList";
import cartReducer from "../actions/cart";

const rootReducer = combineReducers({
    activeViewList: activeViewListReducer,
    dataSort: sortReducer,
    toast: showToastReducer,
    userProfile: userProfileReducer,
    cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;