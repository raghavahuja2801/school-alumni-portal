import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavbarContainer = styled.nav`
  background-color: #199d8d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  opacity: 80%;
`;

const Logo = styled.img`
  width: 150px; /* Adjust logo size as needed */
  height: 100%;
`;

const NavButtons = styled.div`
  height: 100%;
  width: auto;
`

const NavButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  height: 100%;
  margin-left: 1rem;

  &:hover {
    background-color: #09685d;
  }
`;

const Navbar = ({ isSignedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isSignedIn) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully");
        })
        .catch((error) => {
          // An error happened.
        });
    } else {
      navigate("/");
    }
  };

  const handleAdmin = () => {
    navigate('/admin')
  }

  const handleConnects = () => {
    navigate('/connects')
  }

  return (
    <NavbarContainer>
      <Logo src="https://i.imgur.com/PkTeIUz.jpeg" alt="Logo" />
      <NavButtons>
        <NavButton onClick={handleAdmin}>Home</NavButton>
        <NavButton onClick={handleConnects}>Connect</NavButton>
        <NavButton>Circullars</NavButton>
        <NavButton onClick={handleLogout}>{isSignedIn ? 'Logout' : 'Login'}</NavButton>
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;


