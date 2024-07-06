import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBookDetail } from '../../api/bookApi';

interface BookState {
  book: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookState = {
  book: null,
  status: 'idle',
  error: null,
};

export const fetchBookDetailAsync = createAsyncThunk(
  'book/fetchBookById',
  async (bookId: number) => {
    const response = await fetchBookDetail(bookId);
    return response;
  }
);

const bookDetailSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookDetailAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.book = action.payload;
      })
      .addCase(fetchBookDetailAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch book';
      });
  },
});

export default bookDetailSlice.reducer;
