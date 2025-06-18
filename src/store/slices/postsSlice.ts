
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsState } from '@/types/post';
import { PAGINATION_CONSTANTS, API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

// Load persisted state from localStorage
const loadPersistedState = (): Partial<PostsState> => {
  try {
    const serializedState = localStorage.getItem('postsState');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

// Save state to localStorage
const saveStateToLocalStorage = (state: PostsState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('postsState', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
};

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data: Post[] = await response.json();
    return data;
  }
);

const persistedState = loadPersistedState();

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  postsPerPage: PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE,
  sortField: null,
  sortDirection: 'asc',
  ...persistedState,
  // Don't persist loading and error states
  loading: false,
  error: null,
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      saveStateToLocalStorage(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      saveStateToLocalStorage(state);
    },
    setPostsPerPage: (state, action: PayloadAction<number>) => {
      state.postsPerPage = action.payload;
      state.currentPage = 1;
      saveStateToLocalStorage(state);
    },
    setSortField: (state, action: PayloadAction<{ field: 'id' | 'title' | 'body' | 'userId'; direction: 'asc' | 'desc' }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
      saveStateToLocalStorage(state);
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.currentPage = 1;
      state.sortField = null;
      state.sortDirection = 'asc';
      saveStateToLocalStorage(state);
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
