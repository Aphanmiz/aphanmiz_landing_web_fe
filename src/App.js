// import React, { useState } from "react";
// import { Layout } from "antd";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthContext from "./AuthContext";
// import HeaderComponent from "./components/HeaderComponent";
// import DashboardNavigation from "./components/DashboardNavigation"; // import your DashboardNavigation
// import FooterComponent from "./components/FooterComponent";
// import MapComponent from "./components/MapComponent"; // import your MapComponent
// import TrendComponent from "./components/TrendComponent"; // import your PortfolioComponent

// import "./customStyles.css";

// const { Content } = Layout;

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       <Router>
//         <Layout>
//           <HeaderComponent />
//           <Layout>
//             <DashboardNavigation />
//             <Content style={{ padding: "0 24px", minHeight: 280 }}>
//               <Routes>
//                 <Route
//                   path="/location-intelligence"
//                   element={<MapComponent />}
//                 />
//                 <Route path="/trend-analysis" element={<TrendComponent />} />
//               </Routes>
//               <FooterComponent />
//             </Content>
//           </Layout>
//         </Layout>
//       </Router>
//     </AuthContext.Provider>
//   );
// };

// export default App;

import React, { useState } from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthContext from "./AuthContext";
import HeaderComponent from "./components/HeaderComponent";
import DashboardNavigation from "./components/DashboardNavigation";
import FooterComponent from "./components/FooterComponent";
import MapComponent from "./components/MapComponent";
import TrendComponent from "./components/TrendComponent";
import UserAuthComponent from "./components/UserAuthComponent"; // import your combined SignIn/SignUp component

import "./customStyles.css";

const { Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
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
                      path="/auth"
                      element={
                        <UserAuthComponent
                          onLogin={() => setIsAuthenticated(true)}
                        />
                      }
                    />
                    <Route
                      path="/location-intelligence"
                      element={<MapComponent />}
                    />
                    <Route
                      path="/trend-analysis"
                      element={<TrendComponent />}
                    />
                    <Route
                      index
                      element={<Navigate to="/location-intelligence" />}
                    />
                    {/* ... other routes */}
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
                  element={
                    <UserAuthComponent
                      onLogin={() => setIsAuthenticated(true)}
                    />
                  }
                />
                <Route path="*" element={<Navigate replace to="/auth" />} />
              </Routes>
              <FooterComponent />
            </Layout>
          )}
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
