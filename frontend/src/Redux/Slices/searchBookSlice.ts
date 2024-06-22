import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchBooks } from '../../api/bookApi';

interface Book {
  id: number;
  name: string;
  page: number;
  publicationDate: number;
  image: string;
}

interface SearchBooksState {
  searchResults: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SearchBooksState = {
  searchResults: [],
  status: 'idle',
  error: null,
};

interface SearchBooksParams {
  bookName: string;
}

export const searchBooksAsync = createAsyncThunk(
  'searchBooks/searchBooks',
  async (params: SearchBooksParams) => {
    const response = await searchBooks(params.bookName);
    return response;
  }
);

const searchBookSlice = createSlice({
  name: 'searchBooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBooksAsync.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search books';
      });
  },
});

export default searchBookSlice.reducer;
