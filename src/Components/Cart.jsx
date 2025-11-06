import { useSelector, useDispatch } from "react-redux";
import {
  RESTAURANT_LOGO_URL,
  VEG_IMG_URL,
  NON_VEG_IMG_URL,
} from "../utils/constants";
import { clearCart, updateItemQuantity } from "../utils/cartSlice";

const Cart = () => {
  const { cartItems, restaurant } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (item, newQuantity) => {
    dispatch(
      updateItemQuantity({
        itemId: item.id,
        newQuantity,
        customAddOn: item.customAddOn || [],
      })
    );
  };

  const handlePayment = () => {
    const options = {
      key: "YOUR_KEY_HERE", // 🔁 Replace with your Razorpay Test Key
      amount: Math.round(total * 100), // ₹ in paise
      currency: "INR",
      name: "Food Villa",
      description: "Order Payment",
      image: RESTAURANT_LOGO_URL,
      handler: function (response) {
        handleClearCart();
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "Nikhil Girsa",
        email: "nikhil@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0000FF",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleClearCart = () => dispatch(clearCart());

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-700 dark:text-gray-300">
        <img
          className="w-36 h-36 mb-4"
          src={RESTAURANT_LOGO_URL}
          alt="Empty Cart"
        />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2">
          You can go to the homepage to view more restaurants
        </p>
      </div>
    );
  }

  const deliveryFee = restaurant?.feeDetails?.totalFee || 0;
  const subtotal = calculateTotal();
  const gst = subtotal * 0.18;
  const total = subtotal + deliveryFee / 100 + gst;

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {restaurant?.name && (
          <p className="text-gray-600 dark:text-gray-300">
            From: {restaurant.name}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {cartItems.map((item, index) => {
          const isVeg = item.isVeg === true || item.isVeg === "true";
          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            >
              <img
                className="w-4 h-4 mr-4"
                src={isVeg ? VEG_IMG_URL : NON_VEG_IMG_URL}
                alt={isVeg ? "Veg" : "Non-Veg"}
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                {item.addOns?.length > 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.addOns.map((addOn) => (
                      <div key={addOn.id}>
                        + {addOn.name} (₹{addOn.price})
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-l-md cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-600">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-r-md cursor-pointer"
                >
                  +
                </button>
              </div>
              <div className="ml-6 font-medium">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>₹{(deliveryFee / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>GST and Charges</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-4 font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleClearCart}
          className="px-4 py-2 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 rounded-md"
        >
          Clear Cart
        </button>
        <button
          onClick={handlePayment}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
