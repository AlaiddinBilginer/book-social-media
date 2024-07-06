import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../Redux/store';
import { useEffect, useState } from 'react';
import { fetchAuthorDetailAsync } from '../../Redux/Slices/authorDetailSlice';
import BookCard from '../../Components/BookCard/BookCard';
import { Oval } from 'react-loader-spinner';

interface Book {
  id: number;
  name: string;
  image: string;
  publicationDate: number;
  page: number;
}

function AuthorDetail() {
  let { authorId } = useParams<{ authorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const author = useSelector((state: RootState) => state.author.author);
  const status = useSelector((state: RootState) => state.author.status);
  const error = useSelector((state: RootState) => state.author.error);
  const [showBooks, setShowBooks] = useState(false);

  useEffect(() => {
    if (authorId) {
      const numericAuthorId = parseInt(authorId);
      dispatch(fetchAuthorDetailAsync(numericAuthorId));
    }
  }, [dispatch, authorId]);

  const toggleBooks = () => {
    setShowBooks(!showBooks);
  };

  return (
    <div className="container mx-auto p-6 mt-24 min-h-screen">
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
      {status === 'succeeded' && (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-start p-6">
            <div className="flex items-start mb-6">
              <img
                src={author.image}
                alt={author.name}
                className="w-32 h-48 object-cover rounded-md mr-6"
              />
              <div>
                <h2 className="text-3xl font-bold mb-2">{author.name}</h2>
                <p className="mb-1 text-lg text-gray-700 font-bold">Uyruk: {author.nationality}</p>
                <p className="mb-1 text-lg text-gray-600">
                  Doğum Tarihi:{' '}
                  {new Date(author.birthDate).toLocaleString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {author.deathDate ? (
                  <p className="mb-1 text-lg text-gray-600">
                    Ölüm Tarihi:{' '}
                    {new Date(author.deathDate).toLocaleString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                ) : (
                  <p className="mb-1 text-lg text-gray-800">Hayatta</p>
                )}
                <p className="text-lg text-gray-700 italic">
                  Yazdığı Kitap Sayısı: {author.books.length}
                </p>
              </div>
            </div>
            <div className="text-gray-700">{author.description}</div>
            <button
              onClick={toggleBooks}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Kitaplar
            </button>
          </div>
          {showBooks && (
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Yazarın Kitapları</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {author.books.map((book: Book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
}

export default AuthorDetail;
