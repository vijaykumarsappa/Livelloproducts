import { useEffect, useState, useMemo, useContext } from "react";
import { useGetProductsQuery } from "../store/apiSlice";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { Circles } from "react-loader-spinner";
import { RegionContext } from "../context/RegionContext ";

const ProductList = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const { searchQuery, selectedCategory } = useSelector(
    (state) => state.products
  );
  const { region } = useContext(RegionContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // currency symbol based on region
  const conversionFactor = region === "IN" ? 75 : 1;
  const currencySymbol = region === "IN" ? "₹" : "$";

  const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.category);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const convertedProducts = useMemo(() => {
    return filteredProducts.map((product) => ({
      ...product,
      price: (product.price * conversionFactor).toFixed(2),
    }));
  }, [filteredProducts, conversionFactor]);

  return (
    <div className="flex p-4">
      {loading || isLoading ? (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <Circles height="80" width="80" color="#4fa94d" />
        </div>
      ) : (
        <>
          <FilterSidebar />
          <div className="w-3/4 grid grid-cols-3 gap-4">
            {convertedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
