
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '@/types/post';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

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
