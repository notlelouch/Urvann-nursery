import React, { useState } from 'react';
export const AddPlantForm = ({ onClose, onPlantAdded, categories, api }) => {
    const CATEGORIES = categories;
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      categories: [],
      availability: true,
      description: ''
    });
  
    const handleSubmit = async () => {
      if (!formData.name || !formData.price || formData.categories.length === 0) {
        alert('Please fill in all required fields');
        return;
      }
  
      try {
        const response = await api.addPlant({
          ...formData,
          price: parseFloat(formData.price)
        });
  
        if (response.success) {
          alert('Plant added successfully!');
          setFormData({ name: '', price: '', categories: [], availability: true, description: '' });
          onClose();
          onPlantAdded();
        } else {
          alert(response.message || 'Failed to add plant');
        }
      } catch (err) {
        alert('Error adding plant');
        console.error(err);
      }
    };
  
    const handleCategoryChange = (category) => {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }));
    };
  
    return (
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Add New Plant</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Plant Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white"
                placeholder="Enter plant name"
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white"
                placeholder="Enter price"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Categories * (Select at least one)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-3 text-sm font-bold rounded-xl border-2 transition-all transform hover:scale-105 ${
                    formData.categories.includes(cat)
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-400 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-800 hover:border-emerald-400 hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 shadow-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-gray-800 bg-gray-50 focus:bg-white"
              rows="3"
              placeholder="Enter plant description"
            />
          </div>
  
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
              className="w-5 h-5 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">Available in stock</span>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button 
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ✅ Add Plant
            </button>
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };