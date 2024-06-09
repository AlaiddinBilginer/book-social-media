import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './Slices/bookSlice';
import categoryReducer from './Slices/categorySlice';
import authorReducer from './Slices/authorSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    categories: categoryReducer,
    authors: authorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
