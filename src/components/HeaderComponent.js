import React from "react";
import { Layout, Input } from "antd";
import AccountDropdown from "./AccountDropdown";

const { Header } = Layout;
const { Search } = Input;
const logo = "/images/aphanmiz_logo_blue.png";

const HeaderComponent = () => (
  <Header
    style={{
      position: "sticky",
      top: 0,
      zIndex: 1,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      padding: "0 30px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="Company Logo" style={{ height: "45px" }} />
      <Search
        placeholder="Search insights ..."
        onSearch={(value) => console.log(value)}
        style={{ marginLeft: "20px", width: "400px" }}
      />
    </div>
    <AccountDropdown />
  </Header>
);

export default HeaderComponent;
