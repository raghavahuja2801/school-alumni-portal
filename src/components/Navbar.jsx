// import React from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const NavbarContainer = styled.nav`
//   background-color: #199d8d;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 60px;
//   width: 100%;
//   opacity: 80%;
// `;

// const Logo = styled.img`
//   width: 150px; /* Adjust logo size as needed */
//   height: 100%;
// `;

// const NavButtons = styled.div`
//   height: 100%;
//   width: auto;
// `

// const NavButton = styled.button`
//   background-color: transparent;
//   color: white;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   height: 100%;
//   margin-left: 1rem;

//   &:hover {
//     background-color: #09685d;
//   }
// `;

// const Navbar = ({ isSignedIn }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (isSignedIn) {
//       signOut(auth)
//         .then(() => {
//           // Sign-out successful.
//           navigate("/login");
//           console.log("Signed out successfully");
//         })
//         .catch((error) => {
//           // An error happened.
//           console.log(error)
//         });
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleHome = () => {
//     if(isSignedIn){
//       navigate('/home')
//     }
//     else{
//       navigate('/login')
//     }
    
//   }

//   const handleConnects = () => {
//     navigate('/connect')
//   }

//   return (
//     <NavbarContainer>
//       <Logo src="https://i.imgur.com/PkTeIUz.jpeg" alt="Logo" />
//       <NavButtons>
//         <NavButton onClick={handleHome}>Home</NavButton>
//         <NavButton onClick={handleConnects}>Connect</NavButton>
//         <NavButton>Circullars</NavButton>
//         <NavButton onClick={handleLogout}>{isSignedIn ? 'Logout' : 'Login'}</NavButton>
//       </NavButtons>
//     </NavbarContainer>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  z-index: 100;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  opacity: 100%;
  position: relative; /* Required for the dropdown */
`;

const Logo = styled.img`
  width: 150px; /* Adjust logo size as needed */
  padding-left: 15px;
  height: 100%;
`;

const NavButtons = styled.div`
  height: 100%;
  width: auto;
  display: flex;

  @media (max-width: 768px) {
    z-index: -9;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: auto;
    background-color: white;
    opacity: 100%;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 16px;
  height: 100%;
  margin-left: 1rem;

  &:hover {
    color: white;
    background-color: rgb(170, 170, 170);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
    text-align: center;
    margin-left: 0;
  }
`;

const BurgerMenu = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  color: #1A9D8D;

  div {
    width: 30px;
    height: 3px;
    background-color: #1A9D8D;
    margin: 4px 10px 4px 0;
  }

  @media (max-width: 768px) {
    display: flex;
    margin-right: 10px;
  }
`;

const Navbar = ({ isSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
      console.log("Signed out successfully");
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleHome = () => {
    navigate(isSignedIn ? '/home' : '/login');
  };

  const handleConnects = () => {
    navigate('/connect');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo src="https://i.imgur.com/PkTeIUz.jpeg" alt="Logo" />
      <BurgerMenu onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </BurgerMenu>
      <NavButtons isOpen={isOpen}>
        <NavButton onClick={handleHome}>Home</NavButton>
        <NavButton onClick={handleConnects}>Connect</NavButton>
        <NavButton>Notices</NavButton>
        <NavButton>Circulars</NavButton>
        <NavButton onClick={handleLogout}>{user ? 'Logout' : 'Login'}</NavButton>
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;
