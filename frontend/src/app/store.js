import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer, { getTotals } from '../features/cartSlice';
import carouselsReducer, { carouselsFetch } from "../features/carouselsSlice";
import productsReducer, { productsFetch } from "../features/productsSlice";
import categoriesReducer, { categoriesFetch } from "../features/categoriesSlice";
import usersReducer, { usersFetch } from "../features/usersSlice";
import authReducer from "../features/authSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    version: 1.2,
    storage,
};

const rootReducer = combineReducers({
    users: usersReducer,
    carousels: carouselsReducer,
    products: productsReducer,
    categories: categoriesReducer,
    auth: authReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

store.dispatch(carouselsFetch());
store.dispatch(categoriesFetch());
store.dispatch(productsFetch());
store.dispatch(usersFetch());
// Update the total cart item. 
store.dispatch(getTotals());

// It will enable to refetch the data on certain events, such as refetchOnFocus and refetchOnReconnect.
setupListeners(store.dispatch)

export let persistor = persistStore(store);
