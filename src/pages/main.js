import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import Aside from "../component/commonAside";
import ComHeader from "../component/commonHeader";
import ComTab from "../component/commonTab";
import { RouterAuth } from "../router/routerAuth";
import { useSelector } from "react-redux";

const { Content } = Layout;
const Main = (props) => {
  //拿到redux中侧边栏的状态
  const collapsed = useSelector((state) => state.tab.isCollapse);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <RouterAuth>
      <Layout className="main-container">
        <Aside collapsed={collapsed} />
        <Layout>
          <ComHeader collapsed={collapsed} />
          <ComTab />
          <Content
            style={{
              marginTop: 10,
              padding: 20,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  );
};

export default Main;
