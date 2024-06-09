import React from 'react';
import './BookCard.css';

interface Book {
  id: number;
  name: string;
  page: number;
  image: string;
  publicationDate: number;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 shadow-md flex flex-col justify-center items-center text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{book.name}</h2>
      <img className="h-60 object-cover rounded-md" src={book.image} alt={book.name} />
      <p className="text-gray-600 mt-4">
        Sayfa Sayısı: <span className="bg-gray-200 rounded-full p-1">{book.page}</span>
      </p>
      <p className="text-gray-600 mt-4">
        Yayın Tarihi: <span className=" bg-gray-200 rounded-full p-1"> {book.publicationDate}</span>
      </p>
    </div>
  );
};

export default BookCard;
