import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchBooksAsync } from '../../Redux/Slices/bookSlice';
import BookCard from '../../Components/BookCard/BookCard';
import './BookList.css';
import BookSideBar from '../../Components/BookSideBar/BookSideBar';
import { FaChevronDown } from 'react-icons/fa';

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
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (sortValue: string) => {
    const searchParams = new URLSearchParams(location.search);
    const [sortBy, isDescending] = sortValue.split('-');
    searchParams.set('SortBy', sortBy);
    searchParams.set('IsDescending', isDescending);
    navigate(`/book?${searchParams.toString()}`);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

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
    <div className="mt-24 flex sm:mt-44 md:mt-28 sm:mx-4">
      <BookSideBar />
      <div className="flex-1 bg-white">
        <div className="relative inline-block text-left py-2 mb-4">
          <button
            className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Sırala
            <FaChevronDown className="ml-2 -mr-1 h-5 w-5 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-80">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => handleSortChange('Page-false')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  Sayfa Sayısına Göre Artan
                </button>
                <button
                  onClick={() => handleSortChange('Page-true')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  Sayfa Sayısına Göre Azalan
                </button>
                <button
                  onClick={() => handleSortChange('PublicationDate-false')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  Yayınlanma Tarihine Göre Artan
                </button>
                <button
                  onClick={() => handleSortChange('PublicationDate-true')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  Yayınlanma Tarihine Göre Azalan
                </button>
              </div>
            </div>
          )}
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
