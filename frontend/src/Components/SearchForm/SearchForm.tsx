import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { searchBooksAsync } from '../../Redux/Slices/searchBookSlice';
import { searchAuthorAsync } from '../../Redux/Slices/searchAuthorSlice';
import { useNavigate } from 'react-router';

interface SearchFormProps {
  searchType: 'book' | 'author' | 'author-list' | 'book-list';
}

const SearchForm: React.FC<SearchFormProps> = ({ searchType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchType === 'book' || searchType === 'book-list') {
      dispatch(searchBooksAsync({ bookName: searchTerm }));
      navigate('/searchBooks');
    } else if (searchType === 'author' || searchType === 'author-list') {
      dispatch(searchAuthorAsync({ authorName: searchTerm }));
      navigate('/searchAuthors');
    }
  };

  return (
    <div
      className={`${searchType === 'author' && 'sm:pt-0 lg:pt-28 items-center'} ${
        (searchType === 'author-list' || searchType === 'book-list') &&
        'lg:pt-0 pt-6 mb-6 items-start'
      } ${searchType === 'book' && 'sm:pt-36 md:pt-24 pt-36 items-center'} flex flex-col `}
    >
      <form
        onSubmit={handleSearch}
        className={`${
          searchType === 'author' && 'lg:w-180 sm:mr-0 sm:w-full'
        }  w-full max-w-xl mt-6 flex shadow-lg`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            searchType === 'book' || searchType === 'book-list' ? 'Kitap ara...' : 'Yazar ara...'
          }
          className={`${
            searchType === 'author-list' || searchType === 'book-list'
              ? 'py-1 text-lg focus:ring-gray-100'
              : 'py-3'
          } text-xl  w-full border border-gray-300 rounded-l-lg px-4 focus:outline-none focus:ring-2  ${
            searchType === 'author' ? 'focus:ring-blue-500' : 'focus:ring-green-500'
          } `}
        />
        <button
          type="submit"
          className={`${
            searchType === 'book'
              ? 'bg-green-500 hover:bg-green-400'
              : 'bg-blue-500 hover:bg-blue-400'
          } ${
            searchType === 'author-list' || searchType === 'book-list'
              ? 'text-lg py-2 bg-gray-500 hover:bg-gray-400 hover:scale-100'
              : 'py-3'
          } text-white text-xl px-6 rounded-r-lg transition-transform transform hover:scale-105 `}
        >
          Ara
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
