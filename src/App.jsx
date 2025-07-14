import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import SpecificRestaurants from "./Components/SpecificRestaurants";
import RestaurantMenu from "./Components/RestaurantMenu";
import Cart from "./Components/Cart";
import store from "./utils/store";
import TestComponent from "./Components/TestComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./utils/constants";
import { useRestaurantData } from "./hooks/useRestaurantData";

const AppLayout = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  const { mealOptions, topRestaurants, restaurantList, isLoading, error } =
    useRestaurantData();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchValue.trim()) {
        setSearchResults([]);
        return;
      }

      // Combine both lists
      const combined = [
        ...restaurantList,
        ...(topRestaurants?.gridElements?.infoWithStyle?.restaurants || []),
      ];

      // Deduplicate by `restaurant.info.id`
      const uniqueRestaurantsMap = new Map();

      combined.forEach((restaurant) => {
        const id = restaurant?.info?.id;
        if (id && !uniqueRestaurantsMap.has(id)) {
          uniqueRestaurantsMap.set(id, restaurant);
        }
      });

      // Now filter the unique list based on searchValue
      const filtered = Array.from(uniqueRestaurantsMap.values()).filter(
        (restaurant) =>
          restaurant?.info?.name
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())
      );

      setSearchResults(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchValue, restaurantList, topRestaurants]);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (currentTheme) => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (currentTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  };

  return (
    <div className="app min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Header
        theme={theme}
        setTheme={setTheme}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <Outlet
        context={{
          mealOptions,
          topRestaurants,
          restaurants: restaurantList,
          isLoading,
          error,
          searchValue,
        }}
      />
    </div>
  );
};

export default AppLayout;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/restaurant/menu/:resId", element: <RestaurantMenu /> },
      { path: "/details/:collectionId", element: <SpecificRestaurants /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
