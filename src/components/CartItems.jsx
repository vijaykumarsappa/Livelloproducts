import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const CartItems = ({ onNext }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const region = localStorage.getItem("region") || "US";
  const currencySymbol = region === "IN" ? "₹" : "$";
  // Calculating  total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    dispatch(
      incrementQuantity({ id: item.id, selectedSize: item.selectedSize })
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        decrementQuantity({ id: item.id, selectedSize: item.selectedSize })
      );
    } else {
      dispatch(
        removeFromCart({ id: item.id, selectedSize: item.selectedSize })
      );
      toast.info("Item removed from cart!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "circInOut" }}
      className="mt-6"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaShoppingCart className="mr-2" size={24} /> Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-500">
            Go shopping!
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id + "-" + item.selectedSize}
                className="flex items-center justify-between p-4 border rounded-md bg-white shadow-md dark:text-black"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p>
                      {currencySymbol}
                      {item.price} x {item.quantity} ={" "}
                      <span className="font-bold">
                        {currencySymbol}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-red-500 text-white rounded-full px-2 py-1"
                  >
                    ➖
                  </Button>
                  <span className="px-3">{item.quantity}</span>
                  <Button
                    onClick={() => increaseQuantity(item)}
                    className="bg-green-500 text-white rounded-full px-2 py-1"
                  >
                    ➕
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
            <Button
              type="primary"
              onClick={() => navigate("/")}
              className="bg-gray-500  hover:bg-gray-600 transition"
            >
              Back to products
            </Button>
            <span className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </span>
            <Button
              type="primary"
              onClick={onNext}
              style={{ backgroundColor: "#3D8D7A", borderColor: "#81b1ce" }}
            >
              Proceed to Address ➡️
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CartItems;
