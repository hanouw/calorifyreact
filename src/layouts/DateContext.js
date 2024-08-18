import React, { createContext, useState, useContext } from "react";

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [cal, setCal] = useState(0);

  const dateChange = (date) => {
    const formatDate = (date) => {
      return date.toLocaleDateString("en-CA"); // 'en-CA'는 yyyy-MM-dd 형식
    };

    setDate(formatDate(date)); // 예: "2024-08-14"
  };

  const calChange = (calory) => {
    setCal(calory);
  };

  const calClean = () => {
    setCal(0);
  };

  return (
    <DateContext.Provider
      value={{ date, dateChange, cal, calChange, calClean }}
    >
      {children}
    </DateContext.Provider>
  );
};
