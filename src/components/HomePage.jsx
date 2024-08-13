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
              navigate('/')
              console.log("user is logged out")
            }
          });
         
    }, [])

    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
          console.log("Signed out successfully");
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user) {
            const docRef = doc(db, 'user_data', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log('logged in');
              setUserData(docSnap.data());
              console.log(docSnap.data());
              if (docSnap.data().status === false) {
                alert("Your account is not approved yet!");
                handleLogout();
              }
              if (docSnap.data().profilePicture) {
                setProfileImage(docSnap.data().profilePicture);
              }
            } else {
              console.log("No such document!");
            }
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      };
  
      fetchData();
    }, [uid]);
  
  
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