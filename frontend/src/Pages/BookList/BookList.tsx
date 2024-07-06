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
import { Oval } from 'react-loader-spinner'; // Spinner'ı import ediyoruz

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
    <div className="mt-24 flex flex-col md:mt-20 sm:mx-4 min-h-screen">
      <div className="flex">
        <BookSideBar />
        <div className="flex-1 bg-white p-4 md:pl-8">
          <div className="lg:flex lg:justify-between mb-4">
            <SearchForm searchType="book-list" />
            <div className="flex sm:justify-end justify-center">
              <SortSelectButton />
            </div>
          </div>
          {bookStatus === 'loading' && (
            <div className="flex justify-center items-center h-full mt-24">
              <Oval
                height={80}
                width={80}
                color="#123abc"
                ariaLabel="oval-loading"
                secondaryColor="#c1c1c1"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          )}
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
    </div>
  );
};

export default BookList;
