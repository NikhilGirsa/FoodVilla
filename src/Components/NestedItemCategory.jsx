import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import MenuItem from "./MenuItem";
import useToggle from "../hooks/useToggle";

const NestedItemCategory = ({ data, ResInfoData }) => {
  const { title, categories } = data;

  return (
    <div className="w-full transition-colors duration-300">
      <div className="2xl:w-6/12 mx-auto menu-container md:w-10/12 w-full px-3">
        <h2 className="text-lg font-bold p-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        {categories?.map((subcategory) => {
          const [isOpen, toggle] = useToggle(true);

          return (
            <div
              key={subcategory?.title}
              className="w-full mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                  {subcategory?.title} ({subcategory?.itemCards?.length})
                </h3>
                <button
                  onClick={toggle}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <ul className="list-none px-2 space-y-2">
                {subcategory?.itemCards?.map((item) => (
                  <MenuItem
                    key={item?.card?.info?.id}
                    menuInfo={item?.card?.info}
                    isOpen={isOpen}
                    ResInfoData={ResInfoData}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NestedItemCategory;
