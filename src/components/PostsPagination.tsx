
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentPage } from '@/store/slices/postsSlice';

interface PostsPaginationProps {
  totalPosts: number;
}

const PostsPagination: React.FC<PostsPaginationProps> = ({ totalPosts }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentPage, postsPerPage } = useAppSelector((state) => state.posts);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startResult = (currentPage - 1) * postsPerPage + 1;
  const endResult = Math.min(currentPage * postsPerPage, totalPosts);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-muted-foreground">
        {t('posts.showingResults', {
          start: startResult,
          end: endResult,
          total: totalPosts,
        })}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PostsPagination;
