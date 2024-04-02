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

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { removeUser } from "../../store/thunks/removeUser";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const { data } = useSelector((state) => {
    return state.users;
  });
  console.log(data);

  const logout = () => {
    auth.signOut();
    dispatch(removeUser());
    navigate("/");
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
        {!data && <Link to="/login">Login</Link>}
      </Menu.Item>
      {!data && (
        <Menu.Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {data && (
        <SubMenu
          icon={<SettingOutlined />}
          title={data?.email ? data.email.split("@")[0] : "Hi"}
        >
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2" onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};
export default Header;
