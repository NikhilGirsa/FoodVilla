const RestaurantShimmer = () => {
  return (
    <div className="p-4 animate-fadeIn">
      {/* Meal Options shimmer */}
      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Title Shimmer */}
        <div className="h-7 w-48 mb-6 bg-gray-200 rounded-full animate-pulse"></div>

        {/* Food Items Shimmer */}
        <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-28">
              <div className="relative group">
                {/* Image Shimmer */}
                <div className="w-24 h-28 rounded-lg shadow-md bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Restaurant Chains shimmer */}
      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Title Shimmer */}
        <div className="h-7 w-64 mb-6 bg-gray-200 rounded-full animate-pulse"></div>

        {/* Restaurant Cards Shimmer */}
        <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <div className="bg-gradient-to-b from-yellow-200 to-orange-200 p-4 rounded-lg shadow-md">
                {/* Image Shimmer */}
                <div className="w-full h-40 bg-gray-200 rounded-lg animate-shimmer"></div>

                {/* Details Shimmer */}
                <div className="mt-3 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-shimmer"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant card grid shimmer */}
      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Title Shimmer */}
        <div className="h-7 w-3/4 mb-6 bg-gray-200 rounded-full animate-pulse"></div>

        {/* Grid Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-yellow-100 to-orange-100 p-4 rounded-lg shadow-md"
            >
              {/* Image Shimmer */}
              <div className="h-40 bg-gray-200 rounded-lg animate-shimmer"></div>

              {/* Details Shimmer */}
              <div className="mt-3 space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-shimmer"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantShimmer;
