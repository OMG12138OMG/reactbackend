import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Avatar, Dropdown } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { toggleCollapse } from "../../store/reducer/tab";
import { useNavigate } from "react-router-dom";
import { clearMenuList } from "../../store/reducer/menu";


const { Header } = Layout;
const ComHeader = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setCollapsed = () => {
    dispatch(toggleCollapse());
  };
  // 退出登录
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    dispatch(clearMenuList());
    navigate("/login");
  };
  const items = [
    {
      key: "1",
      label: "个人中心",
    },
    {
      key: "2",
      label: <span onClick={() => logout()}>退出登录</span>
    },
  ];
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 40,
        }}
      />

      <Dropdown menu={{ items }}>
        <Avatar
          size={36}
          src={
            <img src={require("../../assets/images/user.png")} alt="avatar" />
          }
        />
      </Dropdown>
    </Header>
  );
};

export default ComHeader;
