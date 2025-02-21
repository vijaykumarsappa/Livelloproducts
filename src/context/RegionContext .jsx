import React, { createContext, useState, useEffect } from "react";

export const RegionContext = createContext();

export const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState(localStorage.getItem("region") || "US");

  useEffect(() => {
    localStorage.setItem("region", region);
  }, [region]);

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};
