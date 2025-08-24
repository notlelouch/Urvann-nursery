import React, { useState, useEffect } from 'react';
import { AddPlantForm } from './components/AddPlantForm';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { SearchFilter } from './components/SearchFilter';
import { PlantsGrid } from './components/PlantsGrid';

// API service
const API_BASE = 'http://localhost:3000/api';

const api = {
  getPlants: async () => {
    const response = await fetch(`${API_BASE}/plants`);
    return response.json();
  },
  addPlant: async (plantData) => {
    const response = await fetch(`${API_BASE}/plants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plantData)
    });
    return response.json();
  }
};

// Categories constant
const CATEGORIES = ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Flowering', 'Low Maintenance', 'Medicinal'];

// Main App Component
const App = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await api.getPlants();
      setPlants(data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch plants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter plants
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || plant.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleToggleForm = () => setShowAddForm(!showAddForm);
  const handleCloseForm = () => setShowAddForm(false);
  const handlePlantAdded = () => fetchPlants();

  return (
    // <div className="w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 overflow-x-hidden">

      <Header 
        showAddForm={showAddForm} 
        onToggleForm={handleToggleForm} 
      />
      
      {/* <main className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-none"> */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[2000px] mx-auto">

          <ErrorMessage error={error} />

          {showAddForm && (
            <AddPlantForm 
              onClose={handleCloseForm}
              onPlantAdded={handlePlantAdded}
              categories = {CATEGORIES}
              api={api}
            />
          )}

          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            resultsCount={filteredPlants.length}
            totalCount={plants.length}
            categories={CATEGORIES}
          />

          <PlantsGrid 
            plants={filteredPlants}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;