
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsState } from '@/types/post';
import { PAGINATION_CONSTANTS } from '@/constants/api';
import { fetchPosts } from '../api/postsApi';

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  postsPerPage: PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE,
  sortField: null,
  sortDirection: 'asc',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPostsPerPage: (state, action: PayloadAction<number>) => {
      state.postsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSortField: (state, action: PayloadAction<{ field: 'id' | 'title' | 'body' | 'userId'; direction: 'asc' | 'desc' }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.currentPage = 1;
      state.sortField = null;
      state.sortDirection = 'asc';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export const { setSearchTerm, setCurrentPage, setPostsPerPage, setSortField, resetFilters } = postsSlice.actions;
export default postsSlice.reducer;
