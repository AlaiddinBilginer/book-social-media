import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchBookDetailAsync } from '../../Redux/Slices/bookDetailSlice';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const BookDetail = () => {
  let { bookId } = useParams<{ bookId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const book = useSelector((state: RootState) => state.book.book);
  const status = useSelector((state: RootState) => state.book.status);
  const error = useSelector((state: RootState) => state.book.error);

  useEffect(() => {
    if (bookId) {
      const numericBooKId = parseInt(bookId);
      dispatch(fetchBookDetailAsync(numericBooKId));
    }
  }, [dispatch, bookId]);
  return (
    <div className="container mx-auto p-6 mt-24">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-start p-6">
            <div className="flex items-start mb-6">
              <img
                src={book.image}
                alt={book.name}
                className="w-32 h-48 object-cover rounded-md mr-6"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
                <div className="mb-1">
                  <Link
                    to={`/author/${book.authorId}`}
                    className="text-lg text-gray-700 font-bold mb-4 italic"
                  >
                    Yazar ID: {book.authorId}
                  </Link>
                </div>
                <div className="text-lg text-gray-600 mb-1">Sayfa Sayısı: {book.page}</div>
                <div className="text-lg text-gray-600">Yayın Tarihi: {book.publicationDate}</div>
              </div>
            </div>
            <div className="text-gray-700 mb-6">{book.description}</div>
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-3">Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category: any) => (
                  <span
                    key={category.id}
                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4 w-full">
              <h3 className="text-xl font-semibold mb-5">Yorumlar</h3>
              <div className="space-y-4">
                {book.comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm w-full"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`https://i.pravatar.cc/40?u=${comment.id}`}
                        alt="User avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-semibold">Kullanıcı</div>
                        <div className="text-xs text-gray-500">
                          {new Date(comment.createdOn).toLocaleString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">{comment.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default BookDetail;
