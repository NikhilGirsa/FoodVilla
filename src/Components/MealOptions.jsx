import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router";

const MealOptions = ({ data }) => {
  const title = data?.card?.card?.header?.title || "What's on your mind?";
  const foodItems = data?.card?.card?.imageGridCards?.info || [];

  const extractParams = (link) => {
    if (!link) return {};
    try {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      const collectionId =
        params.get("collection_id") ||
        url.pathname.split("/").filter(Boolean).pop();
      const tag = params.get("tags");
      return { collectionId, tag };
    } catch (error) {
      console.error("Error parsing link:", error);
      return {};
    }
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-white transition-colors duration-300">
        {title.startsWith("What's") ? title : `Nikhil, ${title.toLowerCase()}`}
      </h1>

      <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-8">
        {foodItems.length > 0 ? (
          foodItems.map((item) => {
            const { collectionId, tag } = extractParams(item?.action?.link);
            return (
              <div key={item.id} className="flex-shrink-0 w-28">
                <Link
                  to={`/details/${collectionId}`}
                  state={{ collectionId, tag }}
                  className="block"
                >
                  <div className="relative group">
                    <img
                      src={IMG_CDN_URL + item.imageId}
                      alt={item.accessibility?.altText || item.action?.text}
                      className="w-24 h-28 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-white p-1"
                    />
                    <div className="absolute inset-0 rounded-lg bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No food items available</p>
        )}
      </div>
    </div>
  );
};

export default MealOptions;
