import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, currencySymbol }) => (
  <Link to={`/product/${product.id}`}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900 w-full h-[350px] flex flex-col transition-all duration-300 ease-in-out transform hover:shadow-xl hover:border-gray-400"
    >
      <div className="h-[200px] flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover rounded-md"
        />
      </div>

      <div className="mt-2 flex-grow text-center">
        <h3 className="font-bold text-sm line-clamp-2">{product.title}</h3>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {currencySymbol}
          {product.price}
        </p>
      </div>
    </motion.div>
  </Link>
);

export default ProductCard;
