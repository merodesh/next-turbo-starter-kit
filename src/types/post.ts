
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsState {
  searchTerm: string;
  currentPage: number;
  postsPerPage: number;
  sortField: keyof Post | null;
  sortDirection: 'asc' | 'desc';
}

export interface PostsFilters {
  searchTerm: string;
  userId?: number;
  sortField?: keyof Post;
  sortDirection?: 'asc' | 'desc';
}
