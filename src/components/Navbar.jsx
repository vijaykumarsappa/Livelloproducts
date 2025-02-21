import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/productSlice";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { RegionContext } from "../context/RegionContext ";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import { Dropdown, Menu } from "antd";
import ReactCountryFlag from "react-country-flag";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const containers = (delay) => ({
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Navbar = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);
  const { region, setRegion } = useContext(RegionContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRegionChange = ({ key }) => {
    setRegion(key);
  };

  const menu = (
    <Menu onClick={handleRegionChange}>
      <Menu.Item key="US">
        <div className="flex items-center">
          <ReactCountryFlag
            countryCode="US"
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
          <span className="ml-2">United States</span>
        </div>
      </Menu.Item>
      <Menu.Item key="IN">
        <div className="flex items-center">
          <ReactCountryFlag
            countryCode="IN"
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
          <span className="ml-2">India</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav
      className="p-4 flex justify-between items-center dark:bg-gray-800 dark:text-white"
      style={{ backgroundColor: "#ecda93" }}
    >
      <motion.h2
        variants={container(0)}
        initial="hidden"
        animate="visible"
        className="text-2xl font-bold"
      >
        <Link to="/">Livello</Link>
      </motion.h2>

      <input
        type="text"
        placeholder="Search products..."
        className="p-2 border rounded-md w-80 dark:bg-white dark:text-white"
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      <motion.div
        variants={containers(0)}
        initial="hidden"
        animate="visible"
        className="flex items-center space-x-4"
      >
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? (
            <FaMoon size={18} style={{ color: "#8E9AB6" }} />
          ) : (
            <FaSun size={18} style={{ color: "#fdb965" }} />
          )}
        </button>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="cursor-pointer flex items-center space-x-1">
            <ReactCountryFlag
              countryCode={region}
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />
            <span>{region === "US" ? "United States" : "India"}</span>
          </div>
        </Dropdown>
        <Link to="/cart" className="flex items-center space-x-1">
          <FaShoppingCart size={18} style={{ color: "#097969" }} />
          <span>({cartItems.length})</span>
        </Link>
      </motion.div>
    </nav>
  );
};

export default Navbar;
