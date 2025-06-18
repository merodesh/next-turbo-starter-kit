
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts } from '@/store/slices/postsSlice';
import PostsTable from '@/components/PostsTable';
import SearchForm from '@/components/SearchForm';
import PostsPagination from '@/components/PostsPagination';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { posts, loading, error, searchTerm, currentPage, postsPerPage } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, postsPerPage]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            {t('posts.error')}
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('posts.title')}</h1>
          <LanguageSelector />
        </div>
        
        <SearchForm />
        
        <PostsTable posts={paginatedPosts} loading={loading} />
        
        <PostsPagination totalPosts={filteredPosts.length} />
      </div>
    </div>
  );
};

export default Index;
