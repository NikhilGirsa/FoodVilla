import { useEffect, useState } from "react";

const TestComponent = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500">
      <h1 className="text-2xl font-bold mb-4">Tailwind Dark Mode Test</h1>
      <p className="mb-4">Current mode: {darkMode ? "Dark" : "Light"}</p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default TestComponent;
