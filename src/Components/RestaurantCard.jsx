import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router";

const RestaurantCard = ({ restaurantData }) => {
  const { id, name, avgRatingString, cloudinaryImageId, areaName, sla } =
    restaurantData?.info;

  return (
    <Link to={`/restaurant/menu/${id}`}>
      <div
        key={id}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
      >
        <div className="h-44 w-full overflow-hidden">
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 text-gray-800 dark:text-gray-200 space-y-1">
          <p className="text-lg font-semibold truncate">{name}</p>
          <p className="text-sm">
            {avgRatingString} ⭐️ · {sla?.slaString}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{areaName}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
