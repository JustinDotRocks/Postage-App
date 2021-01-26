import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  background-color: #0089aa;
  display: flex;
  align-items: center;
  height: 35px;
  border-bottom: 3px solid #008894;
`

const NavItemsList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`

const NavItem = styled.li`
  margin-left: 1.2rem;

  > * {
    text-decoration: none;
    color: white;
  }
`
const Navbar = () => {
  return (
    <NavBarContainer>
      <NavItemsList>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/posts">Posts</Link>
        </NavItem>
        <NavItem>
          <Link to="/settings">Settings</Link>
        </NavItem>
      </NavItemsList>
    </NavBarContainer>
  )
}

export default Navbar;
