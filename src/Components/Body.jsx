import { useState, useEffect } from "react";
import { useRestaurantData } from "../hooks/useRestaurantData";
import RestaurantCard from "./RestaurantCard";
import TopRestaurantChains from "./TopRestaurantChains";
import RestaurantShimmer from "./Shimmer/RestaurantShimmer";
import MealOptions from "./MealOptions";
import SearchBar from "./SearchBar";

const Body = () => {
  const { mealOptions, topRestaurants, restaurantList, isLoading, error } =
    useRestaurantData();

  const [filteredList, setFilteredList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchValue.trim()) {
        setFilteredList(restaurantList);
        return;
      }

      const filtered = restaurantList.filter((restaurant) =>
        restaurant?.info?.name
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredList(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, restaurantList]);

  if (isLoading) return <RestaurantShimmer />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <MealOptions data={mealOptions} />
      <TopRestaurantChains restaurantData={topRestaurants} />

      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search for restaurants..."
      />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Restaurants with online food delivery in Delhi
        </h1>

        <div className="restaurant-grid mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredList.length > 0 ? (
            filteredList.map((restaurant) => (
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
