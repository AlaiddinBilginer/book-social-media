import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthors } from '../../api/bookApi';

interface Author {
  id: number;
  name: string;
  image: string;
  nationality: string;
}

interface AuthorState {
  authors: Author[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthorState = {
  authors: [],
  status: 'idle',
  error: null,
};

export const fetchAuthorsAsync = createAsyncThunk('authors/fetchAuthors', async () => {
  const response = await fetchAuthors();
  return response;
});

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthorsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authors = action.payload;
      })
      .addCase(fetchAuthorsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default authorSlice.reducer;
