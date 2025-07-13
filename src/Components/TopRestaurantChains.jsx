import { Link } from "react-router";
import { IMG_CDN_URL } from "../utils/constants";

const TopRestaurants = ({ restaurantData }) => {
  const { header, gridElements } = restaurantData;
  const restaurants = gridElements?.infoWithStyle?.restaurants || [];

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        {header?.title}
      </h1>

      <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
        {restaurants.map((restaurant) => {
          const info = restaurant?.info;
          return (
            <Link
              to={`/restaurant/menu/${info?.id}`}
              key={info?.id}
              className="flex-shrink-0 w-60 rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition duration-200"
            >
              <img
                src={IMG_CDN_URL + info?.cloudinaryImageId}
                alt={info?.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {info?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {info?.avgRatingString} ⭐ · {info?.sla?.slaString}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {info?.areaName}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopRestaurants;
