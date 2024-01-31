import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";

import { Link } from "react-router-dom";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EnvironmentOutlined,
  // LineChartOutlined,
  // TeamOutlined,
  // HomeOutlined,
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
      label: (
        <Link
          to="/location-intelligence/2023"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          New Developments
        </Link>
      ),
      children: [
        {
          key: "1.1",
          label: <Link to="/location-intelligence/2023">2023</Link>,
        },
        {
          key: "1.2",
          label: <Link to="/location-intelligence/2022">2022</Link>,
        },
        {
          key: "1.3",
          label: <Link to="/location-intelligence/2021">2021</Link>,
        },
        {
          key: "1.4",
          label: <Link to="/location-intelligence/2020">2020</Link>,
        },
        {
          key: "1.5",
          label: <Link to="/location-intelligence/2019">2019</Link>,
        },
        {
          key: "1.6",
          label: <Link to="/location-intelligence/2018">2018</Link>,
        },
        {
          key: "1.7",
          label: <Link to="/location-intelligence/2017">2017</Link>,
        },
      ],
    },
    // {
    //   key: "2",
    //   icon: <LineChartOutlined />,
    //   label: <Link to="/trend-analysis">Trend Analysis</Link>,
    // },
    // {
    //   key: "3",
    //   icon: <TeamOutlined />,
    //   label: <Link to="/trend-analysis">Service Provider</Link>,
    // },
    // {
    //   key: "4",
    //   icon: <HomeOutlined />,
    //   label: <Link to="/trend-analysis">My Portfolio</Link>,
    // },
  ];

  return (
    <Sider
      width={250}
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
