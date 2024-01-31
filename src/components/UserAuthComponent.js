import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../utils"; // Assuming you have a registerUser function
import { Form, Input, Button, Tabs, Card, Modal } from "antd";
import UserContext from "../contexts/UserContext";

import "./UserAuthComponent.css";

const logo = "/images/aphanmiz_logo_blue.png";

const UserAuthComponent = ({ onLogin }) => {
  console.log("UserAuthComponent rendered");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("useEffect: ", user);
  }, [user]);

  const onFinishLogin = (values) => {
    loginUser(values)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          // Store the tokens
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);

          if (res.data.email_is_verified) {
            // If the email is verified, log in and navigate
            onLogin();
            setUser(res.data);
            navigate("/location-intelligence/2023");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // If the status code is 401, show an error message
          Modal.error({
            title: "Login failed.",
            content:
              "Please check your credentials and make sure your email is verified.",
          });
        }
      });
  };

  const onFinishSignup = (values) => {
    console.log(values);
    registerUser(values)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log(res);
          // Store the tokens
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          Modal.success({
            title: "Please check your email to verify your account",
          });
          onLogin();
          navigate("/location-intelligence/2023");
        } else {
          // Handle unsuccessful registration, e.g. show an error message
        }
      })
      .catch((err) => console.error(err));
  };

  const tabItems = [
    {
      label: "Login",
      key: "1",
      children: (
        <Form onFinish={onFinishLogin} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
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
          <Form.Item label="First Name" name="first_name">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
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
    <UserContext.Provider value={user}>
      <div className="background">
        <img src={logo} alt="Company Logo" style={{ height: "55px" }} />
        <Card style={cardStyle}>
          <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
      </div>
    </UserContext.Provider>
  );
};

export default UserAuthComponent;
