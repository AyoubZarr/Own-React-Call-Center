import { createSlice } from "@reduxjs/toolkit";
import DataStatus from "../apis/DataStatus";

export const InAppSlice = createSlice({
  name: "inapp",
  initialState: {
    status: DataStatus.empty,
    sidebar: true,
  },
  reducers: {
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    toggleSidebar: (state) => {
      return { ...state, sidebar: !state.sidebar };
    },
  },
});

export const { setUser, toggleSidebar } = InAppSlice.actions;
export default InAppSlice.reducer;
