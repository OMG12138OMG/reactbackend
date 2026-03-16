import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    menuList: [],
    userInfo:''
  },
  reducers: {
    setUserInfo: (state, actions) => {
      state.userInfo = actions.payload;
    },
    setMenuList: (state, actions) => {
      state.menuList = actions.payload;
    },
    clearMenuList: (state) => {
      state.menuList = [];
    },
  },
});

export const { setUserInfo, setMenuList, clearMenuList } = MenuSlice.actions;
export default MenuSlice.reducer;
