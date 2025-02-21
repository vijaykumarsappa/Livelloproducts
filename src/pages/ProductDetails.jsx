import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../store/apiSlice";
import { addToCart } from "../store/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  // Read region from localStorage
  const region = localStorage.getItem("region") || "US";
  const conversionFactor = region === "IN" ? 75 : 1;
  const currencySymbol = region === "IN" ? "₹" : "$";

  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  //  available sizes
  let availableSizes = [];
  if (product) {
    const category = product.category.toLowerCase();
    if (category === "men's clothing" || category === "women's clothing") {
      availableSizes = ["S", "M", "L", "XL"];
    } else if (category === "jewelery") {
      availableSizes = ["6", "7", "8", "9"];
    }
  }

  const handleAddToCart = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    // Convert price based on region
    const convertedPrice = product.price * conversionFactor;

    dispatch(addToCart({ ...product, selectedSize, price: convertedPrice }));
  };

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-1/2 flex justify-center">
          <Skeleton height={400} width={"100%"} />
        </div>
        <div className="w-1/2 p-6 space-y-4">
          <Skeleton height={40} width={"80%"} />
          <Skeleton height={20} width={"50%"} />
          <Skeleton height={30} width={"30%"} />
          <Skeleton count={3} />
          <div className="flex space-x-4">
            <Skeleton height={50} width={150} />
            <Skeleton height={50} width={150} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-1/2 flex justify-center">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg shadow-lg w-full"
        >
          {[product.image, product.image, product.image].map((img, index) => (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={img}
                  alt={product.title}
                  className="w-full h-96 object-contain cursor-pointer"
                />
              </Zoom>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-1/2 p-6 space-y-4">
        <h2 className="text-3xl font-bold">{product.title}</h2>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-2xl text-green-600 font-semibold">
          {currencySymbol}
          {(product.price * conversionFactor).toFixed(2)}
        </p>
        <p className="text-gray-700">{product.description}</p>

        {availableSizes.length > 0 && (
          <div>
            <h3 className="font-bold mb-2">Select Size:</h3>
            <div className="flex space-x-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="w-10 h-10 flex items-center justify-center border rounded-full transition"
                  style={
                    selectedSize === size
                      ? {
                          backgroundColor: "#FF5733",
                          color: "#FFFFFF",
                          borderColor: "#FF5733",
                        }
                      : { backgroundColor: "#F3F3F3", color: "#333333" }
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            <FaArrowLeft className="mr-2" size={20} />
            Back to Products
          </button>
          <button
            onClick={handleAddToCart}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            style={{ backgroundColor: "#097969" }}
          >
            <FaShoppingCart className="mr-2" size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
