import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { RESTAURANT_MENU_URL } from "../utils/constants";
import ItemCategory from "./ItemCategory";
import NestedItemCategory from "./NestedItemCategory";
import ShimmerMenu from "./Shimmer/ShimmerMenu";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState([]);
  const { resId } = useParams();

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      try {
        const response = await fetch(RESTAURANT_MENU_URL + resId);
        const json = await response.json();

        const menuData = json?.data?.cards
          ?.find((obj) => obj?.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
            (obj) =>
              obj?.card?.card["@type"]?.includes("ItemCategory") ||
              obj?.card?.card["@type"]?.includes("NestedItemCategory")
          );

        const organisedMenuData = menuData?.map((item) => {
          const type = item?.card?.card["@type"];
          const title = item?.card?.card?.title;
          const itemCards = item?.card?.card?.itemCards || [];
          const categories = item?.card?.card?.categories || [];

          if (type?.includes("NestedItemCategory")) {
            return {
              title,
              type: "Nested",
              categories: categories?.map((subcategory) => ({
                title: subcategory?.title,
                itemCards: subcategory?.itemCards,
              })),
            };
          } else {
            return {
              title,
              type: "item",
              itemCards,
            };
          }
        });

        const info = json?.data?.cards?.find((item) =>
          item?.card?.card["@type"]?.includes("food.v2.Restaurant")
        )?.card?.card?.info;

        setResInfo(info);
        setResMenu(organisedMenuData);
      } catch (error) {
        console.error("Error fetching restaurant menu:", error);
      }
    };

    fetchRestaurantMenu();
  }, [resId]);

  const {
    name = "",
    avgRatingString = "",
    totalRatingsString = "",
    costForTwoMessage = "",
    cuisines = [],
  } = resInfo || {};

  return resInfo === null ? (
    <ShimmerMenu />
  ) : (
    <div className="p-10 dark:bg-gray-900 transition-colors duration-300">
      <div className="2xl:w-6/12 mx-auto pt-2 pb-5 md:w-10/12 w-full px-3 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h4 className="text-2xl text-gray-800 dark:text-white">{name}</h4>
        <p className="text-gray-600 dark:text-gray-300">
          ⭐️ {avgRatingString} ({totalRatingsString}) · {costForTwoMessage}
        </p>
        <p className="text-orange-500 underline">{cuisines.join(", ")}</p>
      </div>

      {resMenu?.map((category) =>
        category?.type === "item" ? (
          <ItemCategory
            key={category?.title}
            data={category}
            ResInfoData={resInfo}
          />
        ) : (
          <NestedItemCategory
            key={category?.title}
            data={category}
            ResInfoData={resInfo}
          />
        )
      )}
    </div>
  );
};

export default RestaurantMenu;
