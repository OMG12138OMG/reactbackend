import * as echarts from "echarts";
import { useRef, useEffect } from "react";

//坐标轴样式
const axisOption = {
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    containLabel: true,
  },
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef"],
  series: [],
};
// 普通图表样式
const normalOption = {
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
};

const MyEchart = ({ style, chartData, isAxisChart = true }) => {
  // 获取echart实例
  const echartRef = useRef();
  let echartObj = useRef();
  useEffect(() => {
    let option;
    // 初始化echart实例
    echartObj.current = echarts.init(echartRef.current);
    // 设置图表配置项
    if (isAxisChart) {
      // 更新x轴数据
      axisOption.xAxis.data = chartData.xData;
      // 绘制图表
      axisOption.series = chartData.series;
      option = axisOption;
    } else {
      // 绘制图表
      normalOption.series = chartData.series;
      option = normalOption;
    }
    echartObj.current.setOption(option);
  }, [chartData, isAxisChart]);
  return <div style={style} ref={echartRef}></div>;
};

export default MyEchart;
