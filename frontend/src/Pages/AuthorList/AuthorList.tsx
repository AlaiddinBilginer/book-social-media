import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchAuthorsAsync } from '../../Redux/Slices/authorSlice';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';
import SearchForm from '../../Components/SearchForm/SearchForm';

const AuthorList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const authors = useSelector((state: RootState) => state.authors.authors);
  const authorStatus = useSelector((state: RootState) => state.authors.status);
  const error = useSelector((state: RootState) => state.authors.error);

  useEffect(() => {
    dispatch(fetchAuthorsAsync());
  }, [dispatch]);

  return (
    <div className="lg:m-24 m-4">
      <div className="flex-1">
        <div className="max-w-96 mt-28 md:mt-12 lg:mt-0">
          <SearchForm searchType="author-list" />
        </div>
        {authorStatus === 'loading' && <p>Loading...</p>}
        {authorStatus === 'succeeded' && (
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {authors.map((author) => (
              <AuthorCard author={author} />
            ))}
          </ul>
        )}
        {authorStatus === 'failed' && <p>{error}</p>}
      </div>
    </div>
  );
};

export default AuthorList;
