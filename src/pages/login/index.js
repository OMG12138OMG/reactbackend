import React from "react";
import { Button, Form, Input, message } from "antd";
import "./login.css";
import { getMenu } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, setMenuList } from "../../store/reducer/menu";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 如果已经登录，直接跳转到首页
  if(localStorage.getItem("token")) {
    return <Navigate to="/home" replace={true} />
  }

  const handlerSubmit = (values) => {
    if(!values.username || !values.password) {
      return message.open({
        type: "warning",
        content: "请输入用户名和密码"
      });
    }
    // console.log(values.username);
    getMenu(values).then(res => {
      const { code, data } = res.data;
      if(code === 200) {
        dispatch(setUserInfo(values.username))
        dispatch(setMenuList(data.menu))
        localStorage.setItem("token", data.token);
        localStorage.setItem("menu", JSON.stringify(data.menu));
        message.open({
          type: "success",
          content: "登录成功"
        });
        navigate("/home", { replace: true });
      }
    })
  }
  return (
    <Form className="login-container" onFinish={handlerSubmit}>
      <div className="login_title">系统登录</div>
      <Form.Item label="账号" name="username">
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
