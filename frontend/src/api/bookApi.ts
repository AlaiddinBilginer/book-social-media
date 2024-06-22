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

export const fetchAuthors = async () => {
  try {
    const response = await apiClient.get('/author');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching categories:', error.message);
      throw new Error('Failed to fetch categories');
    }
    throw error;
  }
};

export const searchBooks = async (bookName: string) => {
  try {
    const response = await apiClient.get('/book', {
      params: {
        BookName: bookName,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching books:', error.message);
      throw new Error('Failed to search books');
    }
    throw error;
  }
};

export const searchAuthors = async (authorName: string) => {
  try {
    const response = await apiClient.get('/author', {
      params: {
        AuthorName: authorName,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching authors:', error.message);
      throw new Error('Failed to search authors');
    }
    throw error;
  }
};
