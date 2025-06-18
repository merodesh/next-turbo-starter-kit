
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';
import { Post } from '@/types/post';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => API_ENDPOINTS.POSTS,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => API_ENDPOINTS.POST_BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
