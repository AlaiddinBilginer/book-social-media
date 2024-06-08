import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './Slices/bookSlice';
import categoryReducer from './Slices/categorySlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
