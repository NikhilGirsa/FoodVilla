const ShimmerMenu = () => {
  return (
    <div className="pt-28 pb-5 px-3 mx-auto 2xl:w-6/12 md:w-10/12 w-full">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="h-20 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Item List */}
      <ul className="space-y-12 mt-10">
        {Array.from({ length: 7 }).map((_, idx) => (
          <li key={idx} className="flex justify-between items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-72 sm:w-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Right Image Block */}
            <div className="h-16 sm:h-24 w-24 sm:w-36 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShimmerMenu;
