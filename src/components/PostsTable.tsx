
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/types/post';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortField } from '@/store/slices/postsSlice';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
}

const PostsTable: React.FC<PostsTableProps> = ({ posts, loading }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { sortField, sortDirection } = useAppSelector((state) => state.posts);

  const handleSort = (field: keyof Post) => {
    const newDirection = 
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch(setSortField({ field, direction: newDirection }));
  };

  const SortButton: React.FC<{ field: keyof Post; children: React.ReactNode }> = ({ field, children }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium justify-start hover:bg-transparent"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      )}
    </Button>
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <div className="text-lg">{t('posts.loading')}</div>
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <div className="text-lg text-muted-foreground">{t('posts.noResults')}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">
                  <SortButton field="id">{t('posts.id')}</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="title">{t('posts.postTitle')}</SortButton>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <SortButton field="body">{t('posts.body')}</SortButton>
                </TableHead>
                <TableHead className="w-20">
                  <SortButton field="userId">{t('posts.userId')}</SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell className="font-semibold">
                    <div className="line-clamp-2">{post.title}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="max-w-md truncate">{post.body}</div>
                  </TableCell>
                  <TableCell>{post.userId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsTable;
