import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #333;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 10px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginForm = styled.div`
  display: flex;
  align-items: center;
`;

const UserGreeting = styled.div`
  font-size: 14px;
  margin-right: 10px;
  color: #ddd;
`;

function Navbar() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { user, isSignedIn } = User || {};
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <NavbarContainer>
      <Title onClick={handleHomeClick}>Vkaps Products Portal</Title>
      <NavLinks>
        <Button onClick={handleHomeClick}>Home</Button>
        <LoginForm>
          {isSignedIn ? (
            <>
              <UserGreeting>Logged in as {user?.name}</UserGreeting>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button onClick={handleSignup}>Sign Up</Button>
              <Button onClick={handleLogin}>Login</Button>
            </>
          )}
        </LoginForm>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
