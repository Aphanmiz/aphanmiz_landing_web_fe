import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";

import {
  EnvironmentOutlined,
  LineChartOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const DashboardNavigation = () => {
  console.log("DashboardNavigation is rendered");
  const [collapsed, setCollapsed] = useState(false);
  console.log("collapsed:", collapsed);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const menuItems = [
    {
      key: "1",
      icon: <EnvironmentOutlined />,
      label: <Link to="/location-intelligence">Location Intelligence</Link>,
    },
    {
      key: "2",
      icon: <LineChartOutlined />,
      label: <Link to="/trend-analysis">Trend Analysis</Link>,
    },
  ];

  return (
    <Sider
      width={300}
      height="100%"
      className="site-layout-background"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{ padding: "10px" }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
        }}
        ghost
      >
        {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
      </Button>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        theme="dark"
      />
    </Sider>
  );
};

export default DashboardNavigation;
