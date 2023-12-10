import React from "react";
import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Avatar, Space } from "antd";

const AccountDropdown = () => {
  const username = "Carlos Estrada"; // Replace with dynamic username

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
