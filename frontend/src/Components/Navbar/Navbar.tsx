import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from './logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/"
          className="flex items-center justify-center md:justify-start 
                     transition duration-300 transform hover:scale-105"
        >
          <img src={logo} alt="Logo" className="h-8 mr-4" />
          <span className="text-xl font-semibold">Kitap Köşesi</span>
        </Link>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <NavLink
            to="/book"
            className={({ isActive }) =>
              isActive
                ? 'text-black font-semibold transition duration-300'
                : 'text-gray-700 hover:text-black transition duration-300'
            }
          >
            Kitaplar
          </NavLink>
          <NavLink
            to="/author"
            className={({ isActive }) =>
              isActive
                ? 'text-black font-semibold transition duration-300'
                : 'text-gray-700 hover:text-black transition duration-300'
            }
          >
            Yazarlar
          </NavLink>
          <div className="flex items-center">
            <Link
              to="/login"
              className="px-4 py-2 mx-4 bg-blue-500 text-white font-semibold rounded transition duration-300
                         hover:bg-blue-600 hover:text-gray-100"
            >
              Giriş Yap
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded transition duration-300
                         hover:bg-green-600 hover:text-gray-100"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
