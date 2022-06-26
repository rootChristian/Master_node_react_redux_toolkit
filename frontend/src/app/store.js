import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
/////import { productsApi } from './ProductsApi';
/////import cartReducer, { getTotals } from './CartSlice';
import carouselsReducer, { carouselsFetch } from "../features/carouselsSlice";
import productsReducer, { productsFetch } from "../features/productsSlice";
import categoriesReducer, { categoriesFetch } from "../features/categoriesSlice";
/////import { categoriesApi } from './CategoriesApi';
/////import { authApi } from './AuthApi';
/////import userReducer from "./AuthSlice";

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
    /////user: userReducer,
    carousels: carouselsReducer,
    products: productsReducer,
    categories: categoriesReducer,
    /////cart: cartReducer,

    /////[authApi.reducerPath]: authApi.reducer,
    /////[productsApi.reducerPath]: productsApi.reducer,
    /////[categoriesApi.reducerPath]: categoriesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    //devTools: process.env.NODE_ENV !== 'production',
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
// Update the total cart item. 
//store.dispatch(getTotals());

// It will enable to refetch the data on certain events, such as refetchOnFocus and refetchOnReconnect.
setupListeners(store.dispatch)

export let persistor = persistStore(store);
