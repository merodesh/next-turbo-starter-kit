
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState } from '@/types/post';
import { PAGINATION_CONSTANTS } from '@/constants/api';

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

const persistedState = loadPersistedState();

const initialState: PostsState = {
  searchTerm: '',
  currentPage: 1,
  postsPerPage: PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE,
  sortField: null,
  sortDirection: 'asc',
  ...persistedState,
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
    setSortField: (state, action: PayloadAction<{ field: keyof Post; direction: 'asc' | 'desc' }>) => {
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
});

export const { setSearchTerm, setCurrentPage, setPostsPerPage, setSortField, resetFilters } = postsSlice.actions;
export default postsSlice.reducer;
