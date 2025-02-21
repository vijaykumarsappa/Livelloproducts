import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/productSlice";
import { useGetCategoriesQuery } from "../store/apiSlice";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { data: categories } = useGetCategoriesQuery();
  const selectedCategories = useSelector(
    (state) => state.products.selectedCategory
  );

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <aside className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 ">
      <h2 className="font-bold mb-4">Filter by Category</h2>
      <div className="space-y-2">
        {categories?.map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="form-checkbox"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
