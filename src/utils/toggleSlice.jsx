import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isLoginSidebarOpen: false,
  },
  reducers: {
    toggleLoginSidebar: (state) => {
      state.isLoginSidebarOpen = !state.isLoginSidebarOpen;
    },
  },
});

export const { toggleLoginSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;
