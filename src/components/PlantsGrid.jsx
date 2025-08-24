import { PlantCard } from "./PlantCard";

export const PlantsGrid = ({ plants, loading }) => {
    if (loading) {
      return (
        <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-emerald-600 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading plants...</p>
        </div>
      );
    }
  
    if (plants.length === 0) {
      return (
        <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No plants found</h3>
          <p className="text-gray-600 text-lg">Try adjusting your search or filter criteria</p>
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {plants.map(plant => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>
    );
  };