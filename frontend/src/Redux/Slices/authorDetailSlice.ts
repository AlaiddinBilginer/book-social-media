import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthorDetail } from '../../api/bookApi';

interface AuthorState {
  author: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthorState = {
  author: null,
  status: 'idle',
  error: null,
};

export const fetchAuthorDetailAsync = createAsyncThunk(
  'author/fetchAuthorById',
  async (authorId: number) => {
    const response = await fetchAuthorDetail(authorId);
    return response;
  }
);

const authorDetailSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthorDetailAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.author = action.payload;
      })
      .addCase(fetchAuthorDetailAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch author';
      });
  },
});

export default authorDetailSlice.reducer;
