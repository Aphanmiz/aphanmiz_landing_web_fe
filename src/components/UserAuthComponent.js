import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../utils"; // Assuming you have a registerUser function
import { Form, Input, Button, Tabs, Card } from "antd";

const UserAuthComponent = ({ onLogin }) => {
  const navigate = useNavigate();

  const onFinishLogin = (values) => {
    loginUser(values)
      .then((res) => {
        console.log(res);
        onLogin();
        navigate("/location-intelligence");
      })
      .catch((err) => console.error(err));
  };

  const onFinishSignup = (values) => {
    registerUser(values)
      .then((res) => {
        console.log(res);
        onLogin();
        navigate("/location-intelligence"); // You might want to handle login differently after signup
      })
      .catch((err) => console.error(err));
  };

  const tabItems = [
    {
      label: "Login",
      key: "1",
      children: (
        <Form onFinish={onFinishLogin} layout="vertical">
          <Form.Item name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      label: "Signup",
      key: "2",
      children: (
        <Form onFinish={onFinishSignup} layout="vertical">
          <Form.Item name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          {/* Add additional fields as required for signup */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  const cardStyle = {
    width: "500px",
    margin: "auto",
    marginTop: "50px",
    padding: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  };

  return (
    <div style={{ height: "100vh" }}>
      <Card style={cardStyle}>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
    </div>
  );
};

export default UserAuthComponent;
