export const ErrorMessage = ({ error }) => {
    if (!error) return null;
  
    return (
      <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-r-xl shadow-lg">
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  };