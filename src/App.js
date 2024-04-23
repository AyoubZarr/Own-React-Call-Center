import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./fonts/AbelRegular.ttf";
import "./fonts/AlataRegular.ttf";
import "./fonts/Roihu_Regular.otf";
import "./fonts/Roihu_Light.otf";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthPage from "./features/auth/AuthPage";
import Sidebar from "./features/sidebar/Sidebar";
import Dashboard from "./features/dashboard/Dashboard";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ErlangPage from "./features/erlang/ErlangPage";
import ErlangMultiPage from "./features/erlang/ErlangMultiPage";

function App() {
  const logged = useSelector((state) => state.auth.logged);
  return (
    <Router>
      <div className="App">{logged ? <LoggedComponent /> : <AuthPage />}</div>
    </Router>
  );
}

const FeaturesContainer = styled.div`
  background: #efefef;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 40px;
  left: 250px;
  right: 0;
  left: ${({ sidebar }) => (sidebar ? "250" : "0")};
  transition: 350ms;
  z-index: 10;
`;

export const LoggedComponent = () => {
  const sidebar = useSelector((state) => state.inapp.sidebar);
  return (
    <div>
      <Sidebar />
      <FeaturesContainer className="main-container" sidebar={sidebar}>
        <Routes>
          <Route exact path="/callcenter/" element={<Dashboard />} />
          <Route exact path="/callcenter/home" element={<Dashboard />} />
          <Route exact path="/callcenter/erlang" element={<ErlangPage />} />
          <Route
            exact
            path="/callcenter/erlang-multi"
            element={<ErlangMultiPage />}
          />
          <Route exact path="/callcenter/signin" element={<AuthPage />} />
        </Routes>
      </FeaturesContainer>
    </div>
  );
};

export default App;
