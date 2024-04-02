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
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { removeUser } from "../../store/thunks/removeUser";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logout = () =>{
    auth.signOut()
    dispatch(removeUser())
    navigate('/')
  }
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
        <Menu.Item key="setting:2" onClick={logout}>Logout</Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default Header;
