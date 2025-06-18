
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
import { Post } from '@/store/slices/postsSlice';

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
}

const PostsTable: React.FC<PostsTableProps> = ({ posts, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">{t('posts.loading')}</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg text-muted-foreground">{t('posts.noResults')}</div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">{t('posts.id')}</TableHead>
            <TableHead>{t('posts.postTitle')}</TableHead>
            <TableHead>{t('posts.body')}</TableHead>
            <TableHead className="w-20">{t('posts.userId')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell className="font-semibold">{post.title}</TableCell>
              <TableCell className="max-w-md truncate">{post.body}</TableCell>
              <TableCell>{post.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
