import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchAuthorsAsync } from '../../Redux/Slices/authorSlice';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';

const AuthorList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const authors = useSelector((state: RootState) => state.authors.authors);
  const authorStatus = useSelector((state: RootState) => state.authors.status);
  const error = useSelector((state: RootState) => state.authors.error);

  useEffect(() => {
    dispatch(fetchAuthorsAsync());
  }, [dispatch]);

  return (
    <div className="mt-24 flex sm:mx-4">
      <div className="flex-1">
        {authorStatus === 'loading' && <p>Loading...</p>}
        {authorStatus === 'succeeded' && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
