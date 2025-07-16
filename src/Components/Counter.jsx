import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOn from "./AddOn";
import { addToCart, updateItemQuantity } from "../utils/cartSlice";

const Counter = ({ id, name, price, addOn, restaurantInfo, vegClassifier }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const matchingItems = cartItems.filter((item) => item.id === id);
  const totalQty = matchingItems.reduce((sum, item) => sum + item.quantity, 0);
  const existingItem = matchingItems[0];

  const [showAddOn, setShowAddOn] = useState(false);
  const [showRepeatPrompt, setShowRepeatPrompt] = useState(false);
  const [lastCustomization, setLastCustomization] = useState(null);

  const handleAddClick = () => {
    if (existingItem) {
      setLastCustomization(existingItem.customAddOn || []);
      setShowRepeatPrompt(true);
    } else if (addOn?.length > 0) {
      setShowAddOn(true);
    } else {
      dispatch(
        addToCart({
          item: {
            id,
            name,
            price: (price || 0) / 100,
            quantity: 1,
            customAddOn: [],
            isVeg: vegClassifier === "VEG",
          },
          ResInfoData: restaurantInfo,
        })
      );
    }
  };

  const handleAddOnSubmit = ({ customAddOn, price: totalPrice }) => {
    dispatch(
      addToCart({
        item: {
          id,
          name,
          price: totalPrice,
          quantity: 1,
          customAddOn,
          isVeg: vegClassifier === "VEG",
        },
        ResInfoData: restaurantInfo,
      })
    );
    setShowAddOn(false);
    setShowRepeatPrompt(false);
  };

  const handleRepeatLast = () => {
    if (!lastCustomization) return;

    const addOnsTotal = lastCustomization.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    const totalPrice = (price || 0) + addOnsTotal;

    dispatch(
      addToCart({
        item: {
          id,
          name,
          price: totalPrice,
          quantity: 1,
          customAddOn: lastCustomization,
          isVeg: vegClassifier === "VEG",
        },
        ResInfoData: restaurantInfo,
      })
    );
    setShowRepeatPrompt(false);
  };

  const increaseQty = () => {
    if (!existingItem) return;

    if (addOn?.length) {
      setLastCustomization(existingItem.customAddOn || []);
      setShowAddOn(true);
    } else {
      dispatch(
        updateItemQuantity({
          itemId: id,
          newQuantity: existingItem.quantity + 1,
        })
      );
    }
  };

  const decreaseQty = () => {
    if (existingItem) {
      dispatch(
        updateItemQuantity({
          itemId: id,
          newQuantity: existingItem.quantity - 1,
        })
      );
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      {!existingItem ? (
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-6 py-1 rounded-full text-sm hover:bg-green-700"
        >
          ADD
        </button>
      ) : (
        <div className="flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-full px-3 py-1">
          <button
            onClick={decreaseQty}
            className="px-2 text-lg font-bold text-gray-800 dark:text-white"
          >
            −
          </button>
          <span className="px-2 text-gray-800 dark:text-white">{totalQty}</span>
          <button
            onClick={increaseQty}
            className="px-2 text-lg font-bold text-gray-800 dark:text-white"
          >
            +
          </button>
        </div>
      )}

      {showAddOn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setShowAddOn(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 max-h-[90vh] w-full max-w-md rounded-lg overflow-y-auto shadow-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <AddOn
              data={addOn}
              name={name}
              price={price}
              onClose={() => setShowAddOn(false)}
              onSubmit={handleAddOnSubmit}
            />
          </div>
        </div>
      )}

      {showRepeatPrompt && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-900 shadow-lg rounded-md border p-4 w-[90%] max-w-xl text-gray-800 dark:text-white">
          <p className="mb-4 font-semibold">Repeat last used customization?</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {lastCustomization?.map((addon, index) => (
              <span key={index}>
                {addon?.name || JSON.stringify(addon)}
                {index < lastCustomization.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <div className="flex gap-4 justify-end">
            <button
              className="border border-green-600 px-4 py-1 rounded text-green-700 dark:text-green-400"
              onClick={() => {
                setShowRepeatPrompt(false);
                setShowAddOn(true);
              }}
            >
              I’LL CHOOSE
            </button>
            <button
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              onClick={handleRepeatLast}
            >
              REPEAT LAST
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
