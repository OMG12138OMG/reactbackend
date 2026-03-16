import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    menuList: [],
  },
  reducers: {
    setMenuList: (state, actions) => {
      state.menuList = actions.payload;
    },
    clearMenuList: (state) => {
      state.menuList = [];
    },
  },
});

export const { setMenuList, clearMenuList } = MenuSlice.actions;
export default MenuSlice.reducer;
