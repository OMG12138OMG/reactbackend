import React from "react";
import { Space, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeTag, setCurrentMenu } from "../../store/reducer/tab";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
const ComTab = () => {
  const tabList = useSelector((state) => state.tab.tabList);
  const currentMenu = useSelector((state) => state.tab.currentMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //tag点击
  const tagChange = (tag) => {
    dispatch(setCurrentMenu(tag));
    //页面跳转
    navigate(tag.path);
  };
  //tag显示
  const tagRender = (flag, item, index) => {
    return flag ? (
      <Tag color="#55acee" key={item.name} closeIcon onClose={() => handlerClose(item, index)}>
        {item.label}
      </Tag>
    ) : (
      <Tag onClick={() => tagChange(item)} key={item.name}>
        {item.label}
      </Tag>
    );
  };
  const handlerClose = (tag, index) => {
    let len = tabList.length - 1;
    dispatch(closeTag(tag));
    //判断是否当前页面
    if (tag.path !== location.pathname) {//如果不是当前页面，直接关闭
      return;
    }else if (index === len) {//如果是当前页面，并且是最后一个标签页，则跳转到前一个页面
      const preTag = tabList[index - 1];
      dispatch(setCurrentMenu(preTag))
      //页面跳转
      navigate(preTag.path);
    } else {//如果是当前页面，并且不是最后一个标签页，则跳转到下一个页面
      if(tabList.length > 1){
        const nextTag = tabList[index + 1];
        dispatch(setCurrentMenu(nextTag))
        //页面跳转
        navigate(nextTag.path);
      }
    }
  };
  return (
    <Space className="common-tab" size={[0, 8]} wrap>
      {currentMenu.name &&
        tabList.map((item, index) =>
          tagRender(item.path === currentMenu.path, item, index)
        )}
    </Space>
  );
};

export default ComTab;
