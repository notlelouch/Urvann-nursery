// API service for communicating with backend
const API_BASE_URL = 'http://localhost:3000/api';

class PlantAPI {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all plants with optional filters
  async getAllPlants(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.category && filters.category !== 'all') {
      queryParams.append('category', filters.category);
    }
    if (filters.availability && filters.availability !== 'all') {
      queryParams.append('availability', filters.availability === 'available');
    }

    const queryString = queryParams.toString();
    const endpoint = `/plants${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  // Get single plant by ID
  async getPlantById(id) {
    return this.request(`/plants/${id}`);
  }

  // Add new plant
  async addPlant(plantData) {
    return this.request('/plants', {
      method: 'POST',
      body: JSON.stringify(plantData),
    });
  }

  // Get available categories
  async getCategories() {
    return this.request('/plants/categories/list');
  }

  // Search plants (alternative method)
  async searchPlants(searchTerm) {
    return this.getAllPlants({ search: searchTerm });
  }
}

// Create and export a single instance
export const plantAPI = new PlantAPI();

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await fetch('http://localhost:3000/health');
    return response.ok;
  } catch (error) {
    return error;
  }
};