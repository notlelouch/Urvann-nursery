export const Header = ({ showAddForm, onToggleForm }) => {
    return (
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl sm:text-3xl">🌱</div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Urvann Plant Store
              </h1>
            </div>
            <button
              onClick={onToggleForm}
              className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 ${
                showAddForm 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {showAddForm ? '✕ Close Form' : '+ Add Plant'}
            </button>
          </div>
        </div>
      </header>
    );
  };