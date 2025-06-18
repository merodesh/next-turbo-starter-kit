
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  postsPerPage: number;
  sortField: 'id' | 'title' | 'body' | 'userId' | null;
  sortDirection: 'asc' | 'desc';
}
