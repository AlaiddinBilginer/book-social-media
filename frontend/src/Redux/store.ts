import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './Slices/bookSlice';
import categoryReducer from './Slices/categorySlice';
import authorReducer from './Slices/authorSlice';
import searchBookReducer from './Slices/searchBookSlice';
import searchAuthorReducer from './Slices/searchAuthorSlice';
import bookDetailReducer from './Slices/bookDetailSlice';
import authorDetailReducer from './Slices/authorDetailSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    book: bookDetailReducer,
    categories: categoryReducer,
    authors: authorReducer,
    author: authorDetailReducer,
    searchBooks: searchBookReducer,
    searchAuthors: searchAuthorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
