import api from './api';

const categoryService = {
  // Get all categories
  async getAll() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get single category by slug
  async getBySlug(slug) {
    try {
      const response = await api.get(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
      throw error;
    }
  },

  // Create a new category
  async create(categoryData) {
    try {
      const response = await api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        // Format validation errors for display
        const validationErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          validationErrors[key] = error.response.data.errors[key][0];
        });
        throw { validation: validationErrors };
      }
      throw error;
    }
  },

  // Update an existing category
  async update(slug, categoryData) {
    try {
      const response = await api.put(`/categories/${slug}`, categoryData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        // Format validation errors for display
        const validationErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          validationErrors[key] = error.response.data.errors[key][0];
        });
        throw { validation: validationErrors };
      }
      throw error;
    }
  },

  // Delete a category
  async delete(slug) {
    try {
      const response = await api.delete(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${slug}:`, error);
      throw error;
    }
  }
};

export default categoryService;
