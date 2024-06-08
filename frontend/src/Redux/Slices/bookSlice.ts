import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooks } from '../../api/bookApi';

interface Category {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  createdOn: string;
  bookId: number;
}

interface Book {
  id: number;
  name: string;
  description: string;
  page: number;
  publicationDate: number;
  image: string;
  authorId: number;
  comments: Comment[];
  categories: Category[];
}

interface BooksState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: 'idle',
  error: null,
};

export const fetchBooksAsync = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetchBooks();
  return response;
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default bookSlice.reducer;
