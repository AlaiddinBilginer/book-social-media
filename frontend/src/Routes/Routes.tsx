import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../Pages/HomePage/HomePage';
import BookList from '../Pages/BookList/BookList';
import BookDetail from '../Pages/BookDetail/BookDetail';
import AuthorList from '../Pages/AuthorList/AuthorList';
import AuthorDetail from '../Pages/AuthorDetail/AuthorDetail';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import LoginPage from '../Pages/LoginPage/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'book', element: <BookList /> },
      { path: 'book/:id', element: <BookDetail /> },
      { path: 'author', element: <AuthorList /> },
      { path: 'author/:id', element: <AuthorDetail /> },
    ],
  },
]);
