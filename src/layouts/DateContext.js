import React, { createContext, useState, useContext } from "react";

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));

  const dateChange = (date) => {
    const formatDate = (date) => {
      return date.toLocaleDateString("en-CA"); // 'en-CA'는 yyyy-MM-dd 형식
    };

    setDate(formatDate(date)); // 예: "2024-08-14"
  };

  return (
    <DateContext.Provider value={{ date, dateChange }}>
      {children}
    </DateContext.Provider>
  );
};
