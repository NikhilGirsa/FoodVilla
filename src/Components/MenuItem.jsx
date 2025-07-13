import Counter from "./Counter";
import {
  VEG_IMG_URL,
  NON_VEG_IMG_URL,
  RESTAURANT_MENU_IMAGE_URL,
} from "../utils/constants";

const MenuItem = ({ menuInfo, isOpen, ResInfoData }) => {
  if (!isOpen || !menuInfo) return null;

  const {
    id,
    addons,
    name,
    price,
    defaultPrice,
    description,
    imageId,
    itemAttribute,
  } = menuInfo;

  const descriptionfiltered = (description || "")
    .replace(/��/g, " ")
    .replace(/\([^)]*\)/g, "")
    .replace(/Contains.*$/i, "")
    .replace(/[^\w\s.,&']/g, " ")
    .replace(/\.\s*\./g, ".")
    .replace(/(\w)\.(\w)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <li className="list-none flex justify-center w-full">
      <div className="flex flex-row items-center w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
        {/* LEFT SECTION: TEXT */}
        <div className="flex-1 pr-4">
          <img
            className="w-4 h-4 object-cover mb-2"
            src={
              itemAttribute?.vegClassifier === "VEG"
                ? VEG_IMG_URL
                : NON_VEG_IMG_URL
            }
            alt="veg/non-veg icon"
          />
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {name}
          </h4>
          {(price || defaultPrice) && (
            <span className="block text-gray-700 dark:text-gray-300">
              ₹ {((price || defaultPrice) / 100)?.toFixed(2)}
            </span>
          )}
          {descriptionfiltered && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {descriptionfiltered}
            </p>
          )}
        </div>

        {/* RIGHT SECTION: IMAGE + COUNTER */}
        {imageId && (
          <div className="flex flex-col items-center w-32 flex-shrink-0">
            <img
              className="w-full h-28 object-cover rounded-lg"
              src={RESTAURANT_MENU_IMAGE_URL + imageId}
              alt={name}
            />
            <div className="mt-2">
              <Counter
                id={id}
                addOn={addons}
                name={name}
                price={price || defaultPrice}
                ResInfoData={ResInfoData}
                vegClassifier={itemAttribute?.vegClassifier}
              />
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default MenuItem;
