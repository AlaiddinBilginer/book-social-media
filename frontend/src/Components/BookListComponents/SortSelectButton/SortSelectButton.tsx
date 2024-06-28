import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';

const SortSelectButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (sortValue: string) => {
    const searchParams = new URLSearchParams(location.search);
    const [sortBy, isDescending] = sortValue.split('-');
    searchParams.set('SortBy', sortBy);
    searchParams.set('IsDescending', isDescending);
    navigate(`/book?${searchParams.toString()}`);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  return (
    <div className="relative inline-block text-left py-2 mb-1 mt-5">
      <button
        className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Sırala
        <FaChevronDown className="ml-2 -mr-1 h-5 w-5 text-gray-500" />
      </button>
      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleSortChange('Page-false')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              Sayfa Sayısına Göre Artan
            </button>
            <button
              onClick={() => handleSortChange('Page-true')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              Sayfa Sayısına Göre Azalan
            </button>
            <button
              onClick={() => handleSortChange('PublicationDate-false')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              Yayınlanma Tarihine Göre Artan
            </button>
            <button
              onClick={() => handleSortChange('PublicationDate-true')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              Yayınlanma Tarihine Göre Azalan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortSelectButton;
