
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPostsQuery } from '@/store/api/postsApi';
import { useAppSelector } from '@/store/hooks';
import PostsTable from '@/components/PostsTable';
import PostsFilter from '@/components/PostsFilter';
import PostsPagination from '@/components/PostsPagination';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { t } = useTranslation();
  const { data: posts = [], error, isLoading } = useGetPostsQuery();
  const { searchTerm, currentPage, postsPerPage, sortField, sortDirection } = useAppSelector(
    (state) => state.posts
  );

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.id.toString().includes(searchTerm) ||
        post.userId.toString().includes(searchTerm)
    );
  }, [posts, searchTerm]);

  const sortedPosts = useMemo(() => {
    if (!sortField) return filteredPosts;
    
    return [...filteredPosts].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredPosts, sortField, sortDirection]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  }, [sortedPosts, currentPage, postsPerPage]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            {t('posts.error')}
          </h1>
          <p className="text-muted-foreground">
            {error && 'data' in error ? String(error.data) : 'An error occurred'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{t('posts.title')}</h1>
          <LanguageSelector />
        </div>
        
        <PostsFilter />
        
        <PostsTable posts={paginatedPosts} loading={isLoading} />
        
        <PostsPagination totalPosts={sortedPosts.length} />
      </div>
    </div>
  );
};

export default Index;
