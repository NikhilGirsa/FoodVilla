import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { useState } from "react";

const ItemCategory = ({ data, ResInfoData }) => {
  const { title, itemCards } = data;
  const [isOpen, setIsOpen] = useState(true);
  console.log("ItemCategory data:", data, "ResInfoData:", ResInfoData);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full px-4 md:px-6 xl:px-0">
      <div className="max-w-5xl mx-auto border-b border-gray-300 dark:border-gray-600 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {title} ({itemCards?.length})
          </h2>
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition"
            onClick={handleToggle}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        <ul className="list-disc px-2 space-y-2">
          {itemCards?.map((item) => (
            <MenuItem
              key={item?.card?.info?.id}
              menuInfo={item?.card?.info}
              isOpen={isOpen}
              ResInfoData={ResInfoData}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemCategory;
