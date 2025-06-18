
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm, setPostsPerPage, resetFilters } from '@/store/slices/postsSlice';
import { PAGINATION_CONSTANTS } from '@/constants/api';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface FilterFormData {
  search: string;
  postsPerPage: string;
}

const PostsFilter: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { searchTerm, postsPerPage } = useAppSelector((state) => state.posts);

  const { register, watch, setValue } = useForm<FilterFormData>({
    defaultValues: {
      search: searchTerm,
      postsPerPage: postsPerPage.toString(),
    },
  });

  const searchValue = watch('search');
  const postsPerPageValue = watch('postsPerPage');

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchTerm(searchValue || ''));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, dispatch]);

  React.useEffect(() => {
    if (postsPerPageValue) {
      dispatch(setPostsPerPage(parseInt(postsPerPageValue)));
    }
  }, [postsPerPageValue, dispatch]);

  const handleReset = () => {
    dispatch(resetFilters());
    setValue('search', '');
    setValue('postsPerPage', PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE.toString());
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          {t('posts.search')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              {...register('search')}
              placeholder={t('posts.search')}
              className="pl-10"
            />
          </div>
          
          <Select
            value={postsPerPageValue}
            onValueChange={(value) => setValue('postsPerPage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Posts per page" />
            </SelectTrigger>
            <SelectContent>
              {PAGINATION_CONSTANTS.PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} posts
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsFilter;
