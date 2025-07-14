import { useOutletContext } from "react-router";
import RestaurantCard from "./RestaurantCard";
import TopRestaurantChains from "./TopRestaurantChains";
import RestaurantShimmer from "./Shimmer/RestaurantShimmer";
import MealOptions from "./MealOptions";

const Body = () => {
  const {
    mealOptions,
    topRestaurants,
    restaurants,
    isLoading,
    error,
    searchValue,
  } = useOutletContext();

  if (isLoading) return <RestaurantShimmer />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <MealOptions data={mealOptions} />
      <TopRestaurantChains restaurantData={topRestaurants} />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Restaurants with online food delivery in Delhi
        </h1>

        <div className="restaurant-grid mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant?.info?.id}
                restaurantData={restaurant}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {searchValue
                  ? `No restaurants found for "${searchValue}"`
                  : "No restaurants available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
