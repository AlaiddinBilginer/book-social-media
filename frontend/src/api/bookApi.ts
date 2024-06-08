// src/api/bookApi.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5149/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchBooks = async (
  categoryId?: number,
  sortBy?: 'Page' | 'PublicationDate',
  isDescending?: boolean
) => {
  try {
    const response = await apiClient.get('/book', {
      params: {
        CategoryId: categoryId,
        SortBy: sortBy,
        IsDescending: isDescending,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching books:', error.message);
      throw new Error('Failed to fetch books');
    }
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/category');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching categories:', error.message);
      throw new Error('Failed to fetch categories');
    }
    throw error;
  }
};
