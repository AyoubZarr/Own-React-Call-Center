import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../reducers/InAppSlice";

const Nav = styled.div`
  background: #efefef;
  height: 40px;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  position: sticky;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 1rem;
  font-size: 1rem;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #efefef;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  font-family: "Primary";
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const sidebar = useSelector((state) => state.inapp.sidebar);
  const dispatch = useDispatch();

  return (
    <>
      <IconContext.Provider value={{ color: "#5a5a5a" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={() => dispatch(toggleSidebar())} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineArrowLeft
                onClick={() => dispatch(toggleSidebar())}
              />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
