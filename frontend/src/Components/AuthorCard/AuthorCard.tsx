import React from 'react';
import { Link } from 'react-router-dom';

interface Author {
  id: number;
  name: string;
  image: string;
  nationality: string;
}

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <Link
      to={`/author/${author.id}`}
      className="border border-gray-300 rounded-md p-4 mb-4 shadow-md flex flex-col justify-center items-center text-center hover:scale-105 hover:transition-all hover:opacity-90"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{author.name}</h2>
      <img className="h-60 w-48 object-cover rounded-md" src={author.image} alt={author.name} />
      <p className="text-gray-600 mt-4">
        Uyruk: <span className="bg-gray-200 rounded-full p-1">{author.nationality}</span>
      </p>
    </Link>
  );
};

export default AuthorCard;
