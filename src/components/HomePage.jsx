import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar.jsx';
import styled from 'styled-components';
import UserToDo from './UserToDo.jsx';
import UserProfileMobile from './UserProfileMobile.jsx';

const HomePages = styled.div`
  width: 100%;
  background-color: white;
`

const HomeContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://i.imgur.com/KQEEOTF.png");
    background-size: cover;
    background-position:  cover;
    background-size: 150%;
    opacity: 0.6; /* Change this value to adjust the opacity */
    z-index: -1;
  }

  @media (max-width: 768px) {
    

    &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://i.imgur.com/KQEEOTF.png");
    background-repeat: no-repeat; /* Optional: Prevents image repetition */
    background-size: cover; /* Optional: Scales image to cover entire div */
    background-attachment: fixed;
    opacity: 0.6; /* Change this value to adjust the opacity */
    z-index: -1;
    background-attachment: fixed;
  }
}


`;

const HomePage = () => {
   const { user } = useAuth();
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(()=>{          
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setIsSignedIn(true)
              // ...
            } else {
              // User is signed out
              // ...
              alert("Please sign in")
              navigate('/login')
              console.log("user is logged out")
            }
         
    }, [user])

  
  
    return (
            <HomePages>
            <Navbar isSignedIn = {isSignedIn}/>
            <HomeContainer>
              <UserProfileMobile/>
              <UserToDo />
              </HomeContainer>
              <Footer />
            </HomePages>
    );
  };

export default HomePage;