import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollapse: false,
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
      },
    ],
    currentMenu: {},
  },
  reducers: {
    toggleCollapse: (state, action) => {
      state.isCollapse = !state.isCollapse;
    },
    selectMenuList: (state, action) => {
      const { path, name, label } = action.payload;
      //不是首页。
      if (name !== "home") {
        state.currentMenu = { path, name, label };
        //如果不存在，就添加
        const res = state.tabList.findIndex((item) => item.name === name);
        if (res === -1) {
          state.tabList.push({ path, name, label });
        }
      } else if (name === "home" && state.tabList.length === 1) {
        state.currentMenu = {};
      }
    },
    closeTag: (state, action) => {
      const { name } = action.payload;
      let res = state.tabList.findIndex((item) => item.name === name);
      state.tabList.splice(res, 1);
    },
    setCurrentMenu: (state, action) => {
      const { name } = action.payload;
      if (name === "home") {
        state.currentMenu = {};
      } else {
        state.currentMenu = action.payload;
      }
    },
  },
});

export const { 
    toggleCollapse, 
    selectMenuList, 
    closeTag, 
    setCurrentMenu 
} = tabSlice.actions;

export default tabSlice.reducer;
