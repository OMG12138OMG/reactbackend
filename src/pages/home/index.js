import React, { useEffect, useState } from "react";
import "./home.css";
import { Col, Row, Card } from "antd";
import { getData } from "../../api";
import { Table } from "antd";
import MyEchart from "../../component/Echarts";
import { useSelector } from "react-redux";

// 列配置
const columns = [
  { title: "品牌", dataIndex: "name", key: "name", align: "center" },
  {
    title: "今日销量",
    dataIndex: "todayBuy",
    key: "todayBuy",
    align: "center",
  },
  {
    title: "本月销量",
    dataIndex: "monthBuy",
    key: "monthBuy",
    align: "center",
  },
  {
    title: "累计销量",
    dataIndex: "totalBuy",
    key: "totalBuy",
    align: "center",
  },
];

const Home = (props) => {
  const userInfo = useSelector((state) => state.menu.userInfo);
  // 表格数据
  const [tableData, setTableData] = useState([]);
  // echarts响应数据
  const [echartsData, setEchartsData] = useState({});
  const flag = userInfo === "admin";
  //图片路径
  const adminImgUrl = require("../../assets/images/user.png");
  const userImgUrl = require("../../assets/images/user-default.png");
  const imgUrl = flag ? adminImgUrl : userImgUrl;

  //用户信息
  const username = flag ? "Admin" : "xiaoxiao";
  const userIdentify = flag ? "超级管理员" : "普通用户";
  // 获取数据
  const getTableData = async () => {
    const { data: res } = await getData();
    const { orderData, videoData, tableData, userData } = res.data;
    if (res.code === 200) {
      // 处理数据
      const data = tableData;
      // 更新表格数据
      setTableData(data);
    } else {
      console.error("获取数据失败");
    }
    //折线图
    const order = orderData;
    const xData = order.date;
    const keyArray = Object.keys(order.data[0]);
    const series = [];
    keyArray.forEach((key) => {
      series.push({
        name: key,
        data: order.data.map((item) => item[key]),
        type: "line",
      });
    });
    setEchartsData({
      ...echartsData,
      order: { xData, series },
      user: {
        xData: userData.map((item) => item.date),
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      },
      video: {
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      },
    });
  };

  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="home">
      <Col span={9}>
        <Card hoverable style={{ height: "190px" }}>
          <div className="user">
            <img src={imgUrl} alt="用户头像" />
            <div className="userinfo">
              <p className="name">{username}</p>
              <p className="access">{userIdentify}</p>
            </div>
          </div>
          <div className="loginInfo">
            <p>
              上次登录时间：<span>2024-6-1</span>
            </p>
            <p>
              上次登录地点：<span>苏州</span>
            </p>
          </div>
        </Card>
        <Table
          className="table"
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="name"
        />
      </Col>
      <Col span={15}>
        {echartsData.order && (
          <MyEchart style={{ height: "190px" }} chartData={echartsData.order} />
        )}
        <div className="graph">
          {echartsData.user && (
            <MyEchart
              chartData={echartsData.user}
              style={{ width: "50%", height: "220px" }}
            />
          )}
          {echartsData.video && (
            <MyEchart
              chartData={echartsData.video}
              isAxisChart={false}
              style={{ width: "50%", height: "220px" }}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
