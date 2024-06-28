import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../Pages/HomePage/HomePage';
import BookList from '../Pages/BookList/BookList';
import BookDetail from '../Pages/BookDetail/BookDetail';
import AuthorList from '../Pages/AuthorList/AuthorList';
import AuthorDetail from '../Pages/AuthorDetail/AuthorDetail';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import SearchBooks from '../Pages/SearchBooks/SearchBooks';
import SearchAuthors from '../Pages/SearchAuthors/SearchAuthors';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'book', element: <BookList /> },
      { path: 'book/:bookId', element: <BookDetail /> },
      { path: 'searchBooks', element: <SearchBooks /> },
      { path: 'author', element: <AuthorList /> },
      { path: 'searchAuthors', element: <SearchAuthors /> },
      { path: 'author/:id', element: <AuthorDetail /> },
    ],
  },
]);
