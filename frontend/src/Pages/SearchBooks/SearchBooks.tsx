import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import BookCard from '../../Components/BookCard/BookCard';
import { Oval } from 'react-loader-spinner';

const SearchBooks: React.FC = () => {
  const { searchResults, status, error } = useSelector((state: RootState) => state.searchBooks);

  return (
    <div className="lg:m-24 m-4 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Kitap Arama Sonuçlarınız</h2>
      {status === 'loading' && (
        <div className="flex justify-center items-center h-full mt-56">
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
      {status === 'failed' && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md">Error: {error}</div>
      )}
      {status === 'succeeded' && searchResults.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-16 rounded-md text-center mt-24 mb-8">
          Aradığınız kitap bulunamadı.
        </div>
      )}
      {status === 'succeeded' && searchResults.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {searchResults.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;
