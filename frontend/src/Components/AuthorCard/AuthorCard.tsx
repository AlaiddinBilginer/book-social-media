import React from 'react';

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
    <div className="border border-gray-300 rounded-md p-4 mb-4 shadow-md flex flex-col justify-center items-center text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{author.name}</h2>
      <img className="h-60 w-48 object-cover rounded-md" src={author.image} alt={author.name} />
      <p className="text-gray-600 mt-4">
        Uyruk: <span className="bg-gray-200 rounded-full p-1">{author.nationality}</span>
      </p>
    </div>
  );
};

export default AuthorCard;
