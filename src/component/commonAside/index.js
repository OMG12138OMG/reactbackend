import React from "react";
import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMenuList } from "../../store/reducer/tab";

const { Sider } = Layout;
//动态获取icon
const getIcon = (icon) => {
  return React.createElement(Icon[icon]);
};

const Aside = (props) => {
  // 从Redux获取menuList（优先取Redux，无则取localStorage）
  const menuList = useSelector(state => state.menu.menuList) || JSON.parse(localStorage.getItem("menu")) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //菜单数据
  const items = menuList.map((item) => {
    //没有子菜单
    const child = {
      key: item.path,
      icon: getIcon(item.icon),
      label: item.label,
    };
    //有子菜单
    if (item.children) {
      child.children = item.children.map((c) => {
        return {
          key: c.path,
          icon: getIcon(c.icon),
          label: c.label,
        };
      });
    }
    return child;
  });
  //添加数据到store
  const setTabList = (data) => {
    dispatch(selectMenuList(data));
  };
  //点击菜单
  const selectMenu = (e) => {
    let data;
    menuList.forEach((item) => {
      // 找到当前的数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        // 如果是有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path === e.key;
          });
        }
      }
    });
    setTabList({
      path: data.path,
      name: data.name,
      label: data.label,
    });
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <h3 className="app-name">
        {props.collapsed ? "后台" : "通用后台管理系统"}
      </h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={(e) => selectMenu(e)}
      />
    </Sider>
  );
};

export default Aside;
