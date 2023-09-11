import { useState, useContext, createContext, useEffect } from "react";

const themeContext = createContext({ theme: "dark" });

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export { useTheme, ThemeProvider };
