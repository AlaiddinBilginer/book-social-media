import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchAuthors } from '../../api/bookApi';

interface Author {
  id: number;
  name: string;
  image: string;
  description: string;
  nationality: string;
  birthDate: string;
  deathDate: string | null;
}

interface SearchAuthorState {
  searchResults: Author[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SearchAuthorState = {
  searchResults: [],
  status: 'idle',
  error: 'null',
};

interface SearchAuthorParams {
  authorName: string;
}

export const searchAuthorAsync = createAsyncThunk(
  'searchAuthors/searchAuthors',
  async (params: SearchAuthorParams) => {
    const response = await searchAuthors(params.authorName);
    return response;
  }
);

const searchAuthorSlice = createSlice({
  name: 'searchAuthors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAuthorAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchAuthorAsync.fulfilled, (state, action: PayloadAction<Author[]>) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchAuthorAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search authors';
      });
  },
});

export default searchAuthorSlice.reducer;
