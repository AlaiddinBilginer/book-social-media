import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchBooksAsync } from '../../Redux/Slices/bookSlice';
import BookCard from '../../Components/BookCard/BookCard';
import './BookList.css';
import BookSideBar from '../../Components/BookSideBar/BookSideBar';
import SortSelectButton from '../../Components/BookListComponents/SortSelectButton/SortSelectButton';
import SearchForm from '../../Components/SearchForm/SearchForm';

const BookList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const bookStatus = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('CategoryId');
  const sortBy = queryParams.get('SortBy') as 'Page' | 'PublicationDate';
  const isDescending = queryParams.get('IsDescending') === 'true';

  useEffect(() => {
    dispatch(
      fetchBooksAsync({
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        sortBy,
        isDescending,
      })
    );
  }, [categoryId, sortBy, isDescending, dispatch]);

  return (
    <div className="mt-24 flex mt-32 md:mt-20 sm:mx-4">
      <BookSideBar />
      <div className="flex-1 bg-white">
        <div className="lg:flex lg:justify-between">
          <SearchForm searchType="book-list" />
          <div className="flex sm:justify-end justify-center">
            <SortSelectButton />
          </div>
        </div>
        {bookStatus === 'loading' && <p>Loading...</p>}
        {bookStatus === 'succeeded' && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </ul>
        )}
        {bookStatus === 'failed' && <p>{error}</p>}
      </div>
    </div>
  );
};

export default BookList;
