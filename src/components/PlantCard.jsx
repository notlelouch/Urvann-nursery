export const PlantCard = ({ plant }) => {
    return (
      <div className="group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="h-56 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 flex items-center justify-center relative overflow-hidden">
          <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">🌿</div>
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
            plant.availability 
              ? 'bg-emerald-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {plant.availability ? '✓ In Stock' : '✗ Out of Stock'}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-1">{plant.name}</h3>
          <p className="text-3xl font-bold text-emerald-600 mb-4">
            ₹{plant.price.toLocaleString()}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.categories.slice(0, 2).map(cat => (
              <span key={cat} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                {cat}
              </span>
            ))}
            {plant.categories.length > 2 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                +{plant.categories.length - 2} more
              </span>
            )}
          </div>
  
          {plant.description && (
            <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
              {plant.description}
            </p>
          )}
  
          <button 
            disabled={!plant.availability}
            className={`w-full py-3 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              plant.availability
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            {plant.availability ? '🛒 Add to Cart' : '❌ Out of Stock'}
          </button>
        </div>
      </div>
    );
  };
  