import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import NoticeSection from './NoticeSection';
import CircularSection from './CircularSection';
import Footer from './Footer';
import Navbar from './Navbar.jsx';
import styled from 'styled-components';
import PdfList from './CircularSection';

const HomePages = styled.div`
  width: 100%;
  background-color: white;
`

const HomePage = () => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [uid,setUID] = useState('')
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              console.log("USER LOGGED IN")
              setUID(user.uid)
              setIsSignedIn(true)
              // ...
            } else {
              // User is signed out
              // ...
              navigate('/login')
              console.log("user is logged out")
            }
          });
         
    }, [])
  
  
    return (
            <HomePages>
            <Navbar isSignedIn = {isSignedIn}/>
              <UserProfile user={uid}/>
              <PdfList user_id={uid}/>
              <Footer />
            </HomePages>
    );
  };

export default HomePage;