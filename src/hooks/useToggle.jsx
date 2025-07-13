import { useState, useCallback } from "react";

const useToggle = (initialState = true) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  return [isOpen, toggle];
};

export default useToggle;
