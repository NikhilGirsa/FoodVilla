import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

export const useRestaurantData = () => {
  const [data, setData] = useState({
    mealOptions: null,
    topRestaurants: null,
    restaurantList: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        const gridWidgets =
          jsonData?.data?.cards?.filter((item) =>
            item?.card?.card["@type"]?.includes("v2.GridWidget")
          ) || [];

        const mealOptions = gridWidgets[0];
        const topRestaurants = {
          header: gridWidgets[1]?.card?.card?.header,
          gridElements: gridWidgets[1]?.card?.card?.gridElements,
        };
        const restaurants =
          gridWidgets[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        setData({
          mealOptions,
          topRestaurants,
          restaurantList: restaurants,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      }
    };

    fetchData();
  }, []);

  return data;
};
