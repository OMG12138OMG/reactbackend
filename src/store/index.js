import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./reducer/tab";
import menuReducer from "./reducer/menu";

const store = configureStore({
    reducer:{
        tab: tabReducer,
        menu: menuReducer,
    },
    // middleware:(getDefaultMiddleware) => {

    // }
})

export default store;