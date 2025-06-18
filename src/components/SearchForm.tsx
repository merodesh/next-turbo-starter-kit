
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm } from '@/store/slices/postsSlice';

interface SearchFormData {
  search: string;
}

const SearchForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.posts.searchTerm);

  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: searchTerm,
    },
  });

  const searchValue = watch('search');

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchTerm(searchValue || ''));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, dispatch]);

  return (
    <div className="mb-6">
      <Input
        {...register('search')}
        placeholder={t('posts.search')}
        className="max-w-sm"
      />
    </div>
  );
};

export default SearchForm;
