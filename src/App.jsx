import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { RegionProvider } from "./context/RegionContext ";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from "react";

// Lazy load pages for code splitting
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  return (
    <ThemeProvider>
      <RegionProvider>
        <Router>
          <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen">
            <Navbar />

            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Suspense>
          </div>

          <ToastContainer position="bottom-right" autoClose={1500} />
        </Router>
      </RegionProvider>
    </ThemeProvider>
  );
};

export default App;
