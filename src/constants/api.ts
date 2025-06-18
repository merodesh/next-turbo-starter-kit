
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  POSTS: '/posts',
  POST_BY_ID: (id: number) => `/posts/${id}`,
  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
} as const;

export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;
