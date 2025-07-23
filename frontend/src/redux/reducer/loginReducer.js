import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const userInfoLocalStorage = localStorage.getItem("userInfo") ?
  JSON.parse(localStorage.getItem("userInfo")) : sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {};

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userInfo:  userInfoLocalStorage
  },
  reducers: {
    loginUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutUser: {

    }
  }
})


export const { loginUser, logOutUser } = loginSlice.actions;

export const logOutAction = () => async (dispatch) => {
  document.location.href = "/login";
  await axios.get('/api/logout');
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("cart");
  dispatch(logOutUser);
}

export default loginSlice.reducer