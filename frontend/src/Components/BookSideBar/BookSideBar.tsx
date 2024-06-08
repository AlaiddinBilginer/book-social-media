import React, { useEffect, useState } from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchCategoriesAsync } from '../../Redux/Slices/categorySlice';
import { useNavigate, useLocation } from 'react-router-dom';

const BookSideBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const categoryStatus = useSelector((state: RootState) => state.categories.status);
  const error = useSelector((state: RootState) => state.categories.error);
  const [isOpen, setIsOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPageSortOpen, setIsPageSortOpen] = useState(false);
  const [isDateSortOpen, setIsDateSortOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategoriesAsync());
    }
  }, [categoryStatus, dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('CategoryId', categoryId.toString());
    navigate(`/book?${searchParams.toString()}`);
  };

  const handleSortClick = (sortBy: 'Page' | 'PublicationDate', isDescending: boolean) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('SortBy', sortBy);
    searchParams.set('IsDescending', isDescending.toString());
    navigate(`/book?${searchParams.toString()}`);
  };

  return (
    <div
      className={`flex flex-col ${isOpen ? 'w-72' : 'w-0'} transition-all duration-300shadow-lg`}
    >
      <div
        className={`fixed inset-y-0 left-0 flex z-40 bg-white shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        style={{ top: '75px' }}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full">
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 justify-between">
              <h1 className="text-2xl font-bold text-gray-700">Kitapları Filtrele</h1>
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                <FaRegArrowAltCircleLeft
                  className="text-gray-600 hover:text-gray-800"
                  style={{ fontSize: '1.5rem' }}
                />
              </button>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <div className="pb-2 border-b border-gray-300">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full text-left flex items-center px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                >
                  Kategoriler
                  <svg
                    className={`ml-2 h-5 w-5 transform transition-transform ${
                      isCategoryOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {isCategoryOpen && (
                  <div className="ml-4 space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="group flex items-center px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="pb-2 border-b border-gray-300">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full text-left flex items-center px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                >
                  Sırala
                  <svg
                    className={`ml-2 h-5 w-5 transform transition-transform ${
                      isSortOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {isSortOpen && (
                  <div className="ml-4 space-y-1">
                    <button
                      onClick={() => setIsPageSortOpen(!isPageSortOpen)}
                      className="w-full text-left flex items-center px-3 py-2 mt-1 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration -150"
                    >
                      Sayfa Sayısına Göre
                      <svg
                        className={`ml-2 h-5 w-5 transform transition-transform ${
                          isPageSortOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {isPageSortOpen && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => handleSortClick('Page', true)}
                          className="w-full text-left px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                        >
                          Azalan
                        </button>
                        <button
                          onClick={() => handleSortClick('Page', false)}
                          className="w-full text-left px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                        >
                          Artan
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => setIsDateSortOpen(!isDateSortOpen)}
                      className="w-full text-left flex items-center px-3 py-2 mt-1 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                    >
                      Yayın Tarihine Göre
                      <svg
                        className={`ml-2 h-5 w-5 transform transition-transform ${
                          isDateSortOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {isDateSortOpen && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => handleSortClick('PublicationDate', true)}
                          className="w-full text-left px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                        >
                          Azalan
                        </button>
                        <button
                          onClick={() => handleSortClick('PublicationDate', false)}
                          className="w-full text-left px-3 py-2 text-base leading-6 font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                        >
                          Artan
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {!isOpen && (
        <div className="fixed z-50 top-20 left-2 sm:top-32 md:top-20">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-lg focus:outline-none focus:bg-gray-200 focus:text-gray-700 opacity-70 hover:opacity-100 transition-opacity duration-150"
            aria-label="Open sidebar"
            onClick={() => setIsOpen(true)}
          >
            <FaRegArrowAltCircleRight
              className="text-gray-600 hover:text-gray-800"
              style={{ fontSize: '2rem' }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSideBar;
