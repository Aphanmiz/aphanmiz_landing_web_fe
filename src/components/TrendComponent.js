import React from "react";
import { Layout } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Treemap,
  ResponsiveContainer,
} from "recharts";
import { HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;

// Mock data
const data_line = [
  { month: "Jan", propertiesSold: 42, averagePrice: 240000 },
  { month: "Feb", propertiesSold: 35, averagePrice: 220000 },
  { month: "Mar", propertiesSold: 48, averagePrice: 260000 },
  { month: "Apr", propertiesSold: 58, averagePrice: 280000 },
  { month: "May", propertiesSold: 65, averagePrice: 290000 },
  { month: "Jun", propertiesSold: 75, averagePrice: 300000 },
  { month: "Jul", propertiesSold: 80, averagePrice: 320000 },
  { month: "Aug", propertiesSold: 78, averagePrice: 310000 },
  { month: "Sep", propertiesSold: 68, averagePrice: 295000 },
  { month: "Oct", propertiesSold: 57, averagePrice: 280000 },
  { month: "Nov", propertiesSold: 50, averagePrice: 270000 },
  { month: "Dec", propertiesSold: 45, averagePrice: 260000 },
];

const data_tree = [
  {
    name: "Residential",
    size: 300,
    children: [
      { name: "Apartments", size: 150 },
      { name: "Houses", size: 120 },
      { name: "Condos", size: 30 },
    ],
  },
  {
    name: "Commercial",
    size: 200,
    children: [
      { name: "Offices", size: 130 },
      { name: "Shops", size: 40 },
      { name: "Warehouses", size: 30 },
    ],
  },
  {
    name: "Industrial",
    size: 150,
    children: [
      { name: "Factories", size: 80 },
      { name: "Plants", size: 70 },
    ],
  },
];

const TrendComponent = () => {
  // Replace these with your actual data
  // const myPortfolio = ["Property A", "Property B", "Property C"];

  return (
    <Content style={{ padding: "30px", height: "100vh" }}>
      <h2 style={{ color: "#002F56" }}>
        <HomeOutlined /> Trends
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={data_tree}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        />
      </ResponsiveContainer>
      <LineChart
        width={1100}
        height={400}
        data={data_line}
        margin={{ top: 50, right: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="propertiesSold"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="averagePrice"
          stroke="#82ca9d"
        />
      </LineChart>
    </Content>
  );
};

export default TrendComponent;
