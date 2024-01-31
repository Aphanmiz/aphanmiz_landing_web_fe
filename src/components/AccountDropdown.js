import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Avatar, Space } from "antd";
import UserContext from "../contexts/UserContext";
import { logoutUser } from "../utils";

const AccountDropdown = () => {
  const navigate = useNavigate();

  // useContext(UserContext) has a value of { user, setUser }
  const user = useContext(UserContext).user;
  console.log("user: ", user);
  const username = user ? `${user.first_name} ${user.last_name}` : "Guest";

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth"); // Navigate to the authentication page
  };

  // Custom menu items
  const customMenuItems = [
    {
      label: "Account Settings",
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: "Help & Support",
      key: "2",
      icon: <QuestionCircleOutlined />,
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
    // Add other items as needed
  ];

  return (
    <Dropdown menu={{ items: customMenuItems }} trigger={["click"]}>
      <span onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span style={{ fontSize: "17px" }}>{username}</span>
          <DownOutlined />
        </Space>
      </span>
    </Dropdown>
  );
};

export default AccountDropdown;
