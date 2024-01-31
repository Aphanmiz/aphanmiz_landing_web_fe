import React, { useState, useCallback } from "react";
import { Layout, ConfigProvider } from "antd";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserContext from "./contexts/UserContext";
import AuthContext from "./contexts/AuthContext";

import HeaderComponent from "./components/HeaderComponent";
import DashboardNavigation from "./components/DashboardNavigation";
import FooterComponent from "./components/FooterComponent";
import MapComponent from "./components/MapComponent";
import TrendComponent from "./components/TrendComponent";
import UserAuthComponent from "./components/UserAuthComponent"; // import your combined SignIn/SignUp component

const theme = {
  // The variable to override
  token: {
    colorPrimary: "#002F56",
  },
};

const { Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const onLogin = useCallback(() => setIsAuthenticated(true), []);

  return (
    <ConfigProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Router>
            <Layout>
              {isAuthenticated ? (
                <Layout>
                  <HeaderComponent />

                  <Layout>
                    <DashboardNavigation />

                    <Content>
                      <Routes>
                        <Route
                          path="/location-intelligence/:year"
                          element={<MapComponent />}
                        />
                        <Route
                          path="/trend-analysis"
                          element={<TrendComponent />}
                        />
                        <Route
                          index
                          element={
                            <Navigate
                              to="location-intelligence/:year"
                              replace
                            />
                          }
                        />
                      </Routes>
                      <FooterComponent />
                    </Content>
                  </Layout>
                </Layout>
              ) : (
                <Layout>
                  <Routes>
                    <Route
                      path="/auth"
                      element={<UserAuthComponent onLogin={onLogin} />}
                    />
                    <Route path="*" element={<Navigate replace to="/auth" />} />
                  </Routes>
                  <FooterComponent />
                </Layout>
              )}
            </Layout>
          </Router>
        </AuthContext.Provider>
      </UserContext.Provider>
    </ConfigProvider>
  );
};

export default App;
