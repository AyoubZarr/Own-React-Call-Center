import { createSlice } from "@reduxjs/toolkit";
import DataStatus from "../apis/DataStatus";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    status: DataStatus.empty,
    logged: true,
  },
  reducers: {
    setError: (state, action) => {
      return { ...state, error: action.payload }; // safe methode immutate
    },
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
      //state.status = action.payload; //not safe to mutate the state
    },
    setLogged: (state, action) => {
      return { ...state, logged: action.payload };
    },
  },
});

export const { setError, setUser, setLogged } = AuthSlice.actions;
export default AuthSlice.reducer;
