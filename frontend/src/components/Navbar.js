import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../App.css';
import styled from 'styled-components';
import logo from './Logo.png';
import { AuthContext, useAuth } from '../components/AuthContext';

function Navbar() {
  let location = useLocation(); {/* getting the current location */}
  const { authData, setAuthData } = useAuth();

  const handleLogout = () => {
    setAuthData({ isLoggedIn: false, data: null });
  };

  if (location.pathname === "/Login" || location.pathname === "/Register"){
    return null;
  }

  if (location.pathname !== "/Login" || location.pathname !== "/Register") { {/* In login page, the navbar will disappear */}
    return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            <img src={logo} width={50} height={50} />
          </NavLink>
          <NavLink to="/">
            Home
          </NavLink>
          <NavDropdown>
            <NavLink to="/Clubs">
              Clubs▿ <i className="fa fa-angle-down"></i>
            </NavLink>
            <NavDropdownMenu>
              <NavLink to="/Clubs">Club List</NavLink>
              <NavLink to="/Manage_Clubs">Manage Clubs</NavLink>
            </NavDropdownMenu>
          </NavDropdown>
          <NavDropdown>
            <NavLink to="/Organizations">
              Organizations▿ <i className="fa fa-angle-down"></i>
            </NavLink>
            <NavDropdownMenu style={{
              minWidth: '200px'
            }}>
              <NavLink to="/Organizations">Organization List</NavLink>
              <NavLink to="/Manage_Organizations">Manage Organizations</NavLink>
            </NavDropdownMenu>
          </NavDropdown>
          <NavDropdown>
            <NavLink to="/Events">
              Events▿ <i className="fa fa-angle-down"></i>
            </NavLink>
            <NavDropdownMenu>
              <NavLink to="/Search_Events">Search Events</NavLink>
              <NavLink to="/Manage_Events">Manage Events</NavLink>
            </NavDropdownMenu>
          </NavDropdown>
          <NavLink to="/Calendar">
            Calendar
          </NavLink>
        </NavMenu>
        <NavBtn>
          {authData && authData.isLoggedIn ? (
            <>
              <NavBtnLink to="/Profile">Profile</NavBtnLink>
              <NavBtnLink onClick={handleLogout} to="/">Logout</NavBtnLink>
            </>
          ) : (
            <NavBtnLink to="/Login">Login</NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    );
  }
}

export default Navbar;

// >>styles are written here<<

const NavDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const NavDropdownMenu = styled.div`
  position: absolute;
  z-index: 1;
  display: none;
  min-width: 150px;
  padding: 8px 0;
  background-color: #000020;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  & a {
    color: #f0f0f0;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
      color: #2020ff;
    }
  }
  ${NavDropdown}:hover & {
    display: block;
  }
`;

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  background: #000020;
  height: 70px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  z-index: 1;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  };
`;

export const NavLink = styled(Link)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  align: right;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #40a0ff;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #e0e0e0;
    color: #2020ff;
  }
`;