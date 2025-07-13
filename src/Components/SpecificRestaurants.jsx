import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { IMG_CDN_URL, RESPECTIVE_URL } from "../utils/constants";
import SpecificRestaurantsShimmer from "./Shimmer/SpecificRestaurantsShimmer";

const SpecificRestaurants = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { collectionId, tag } = location.state || {};
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerData, setHeaderData] = useState({
    title: "",
    description: "",
    count: 0,
  });

  useEffect(() => {
    if (!collectionId || !tag) {
      handleError("Required parameters missing");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${RESPECTIVE_URL}${collectionId}&tags=${tag}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const mastheadCard = data?.data?.cards?.find((item) =>
          item?.card?.card["@type"]?.includes("widgets.v2.CollectionMasthead")
        )?.card?.card;

        const restaurants = data?.data?.cards?.filter((item) =>
          item?.card?.card["@type"]?.includes("food.v2.Restaurant")
        );

        setHeaderData({
          title: mastheadCard?.title || "",
          description: mastheadCard?.description || "",
          count: mastheadCard?.count || 0,
        });

        setResData(restaurants || []);
      } catch (err) {
        handleError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionId, tag]);

  const handleError = (message) => {
    setError(message);
    setLoading(false);
    navigate("/error", { state: { error: message } });
  };

  if (loading) return <SpecificRestaurantsShimmer />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center p-6 bg-gray-100 dark:bg-gray-800 shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {headerData.title}
          </h1>
          <h4 className="text-gray-600 dark:text-gray-400">
            {headerData.description}
          </h4>
        </div>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Total: {headerData.count}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-6">
        {resData.map((restaurant) => {
          const restaurantInfo = restaurant?.card?.card?.info;
          return (
            <Link
              to={`/restaurant/menu/${restaurantInfo?.id}`}
              key={restaurantInfo?.id}
              className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div>
                <img
                  className="w-full h-40 object-cover"
                  src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
                  alt={restaurantInfo?.name || "restaurant"}
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {restaurantInfo?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurantInfo?.avgRatingString} ⭐️ ·{" "}
                  {restaurantInfo?.sla?.slaString}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {restaurantInfo?.areaName}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecificRestaurants;
