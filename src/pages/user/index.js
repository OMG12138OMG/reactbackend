import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Table,
  Tag,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import "./user.css";
import { getUserList, createUser, updateUser, deleteUser } from "../../api";
import dayjs from "dayjs";
const User = () => {
  //表单实例
  const [form] = Form.useForm();
  //对话框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //新增/编辑实现
  const handlerOk = () => {
    //表单验证
    form
      .validateFields()
      .then((values) => {
        //时间转换
        values.birth = dayjs(values.birth).format("YYYY-MM-DD");
        //提交表单
        if (modalType) {
          //编辑
          updateUser(values).then((res) => {
            if (res.data.code === 200) {
              handlerCancel();
              getUsers();
            }
          });
        } else {
          createUser(values).then((res) => {
            if (res.data.code === 200) {
              handlerCancel();
              getUsers();
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handlerCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      render: (sex) => (
        <Tag color={sex === 1 ? "blue" : "pink"}>{sex === 1 ? "女" : "男"}</Tag>
      ),
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "出生日期",
      key: "birth",
      dataIndex: "birth",
    },
    {
      title: "住址",
      dataIndex: "addr",
      key: "addr",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button onClick={() => handlerClick("edit", record)}>修改</Button>
          <Button style={{ color: "darkred" }} onClick={() => del(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  //删除
  const del = (rowData) => {
    deleteUser({ id: rowData.id }).then((res) => {
      if (res.data.code === 200) {
        getUsers();
      }
    });
  };

  //学生数据
  const [userData, setUserData] = useState([]);

  //新增/编辑对话框类型 0-新增 1-编辑
  const [modalType, setModalType] = useState(0);
  const handlerClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen);
    if (type === "add") {
      setModalType(0);
    } else {
      setModalType(1);
      const cloneData = JSON.parse(JSON.stringify(rowData));
      //时间转换
      cloneData.birth = dayjs(cloneData.birth);
      form.setFieldsValue(cloneData);
    }
  };
  // 搜索表单实例
  const [searchParams, setSearchParams] = useState({
    name: "",
  });
  const [searchForm] = Form.useForm();
  // 搜索表单提交
  const handlerSearch = (values) => {
    setSearchParams({
      name: values.keyword || "",
    });
  };

  // 获取用户列表
  const getUsers = async () => {
    const { data: res } = await getUserList(searchParams);
    if (res.code === 200) {
      setUserData(res.list);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handlerClick("add")}>
          新增
        </Button>
        <Form form={searchForm} layout="inline" onFinish={handlerSearch}>
          <Form.Item name="keyword">
            <Input placeholder="请输入关键字" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        rowKey="id"
        size="small"
        pagination={{
          pageSize: 7,
        }}
      />
      <Modal
        title={modalType ? "编辑用户" : "新增用户"}
        open={isModalOpen}
        onOk={handlerOk}
        onCancel={handlerCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          {modalType && (
            <Form.Item name="id" hidden>
              <Input placeholder="请输入ID" />
            </Form.Item>
          )}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "请输入性别" }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { label: "女", value: 1 },
                { label: "男", value: 0 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: "请输入年龄" },
              { type: "number", message: "请输入有效的年龄" },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: "请输入出生日期" }]}
          >
            <DatePicker format="YYYY-MM-DD" placeholder="请选择出生日期" />
          </Form.Item>
          <Form.Item
            label="住址"
            name="addr"
            rules={[{ required: true, message: "请输入住址" }]}
          >
            <Input placeholder="请输入住址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
