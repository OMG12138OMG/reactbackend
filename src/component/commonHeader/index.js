import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Avatar, Dropdown } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { toggleCollapse, clearTag } from "../../store/reducer/tab";
import { useNavigate, useSelector } from "react-router-dom";
import { clearMenuList } from "../../store/reducer/menu";


const { Header } = Layout;
const ComHeader = ({ collapsed }) => {
  const userInfo = useSelector((state) => state.menu.userInfo);
  const flag = userInfo === "admin";
  //图片路径
  const adminImgUrl = require("../../assets/images/user.png");
  const userImgUrl = require("../../assets/images/user-default.png");
  const imgUrl = flag ? adminImgUrl : userImgUrl;
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
    dispatch(clearTag());
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
            <img src={imgUrl} alt="avatar" />
          }
        />
      </Dropdown>
    </Header>
  );
};

export default ComHeader;
