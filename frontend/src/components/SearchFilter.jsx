import React from 'react';
export const SearchFilter = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, resultsCount, totalCount, categories }) => {
  const CATEGORIES = categories;
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 lg:p-8 mb-8 shadow-xl border border-white/50">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plants by name or category..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-lg"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium">
            📊 Showing {resultsCount} of {totalCount} plants
          </span>
        </div>
      </div>
    );
  };
  