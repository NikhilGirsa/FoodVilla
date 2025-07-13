const SpecificRestaurantsShimmer = () => {
  return (
    <div className="min-h-screen">
      {/* Header Shimmer */}
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
        <div>
          <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-80 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Restaurant Cards Grid Shimmer */}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 animate-pulse"
          >
            {/* Image */}
            <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>

            {/* Text lines */}
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificRestaurantsShimmer;
