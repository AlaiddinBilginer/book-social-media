import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './Slices/bookSlice';
import categoryReducer from './Slices/categorySlice';
import authorReducer from './Slices/authorSlice';
import searchBookReducer from './Slices/searchBookSlice';
import searchAuthorReducer from './Slices/searchAuthorSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    categories: categoryReducer,
    authors: authorReducer,
    searchBooks: searchBookReducer,
    searchAuthors: searchAuthorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
