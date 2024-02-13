import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./Header.css";
import SubMenu from "antd/es/menu/SubMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="Home" icon={<AppstoreOutlined />}>
       <Link to="/">Home</Link> 
      </Menu.Item>
      <Menu.Item
        key="login"
        icon={<UserOutlined />}
        style={{ marginLeft: "auto" }}
      >
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="register" icon={<UserAddOutlined />}>
      <Link to="/register">Register</Link>
      </Menu.Item>
      <SubMenu icon={<SettingOutlined />} title="Username">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default Header;
