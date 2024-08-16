import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
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
`;

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
         
    }, [uid])


    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       if (uid) {
    //         const docRef = doc(db, 'user_data', uid);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //           console.log('logged in');
    //           setUserData(docSnap.data());
    //           console.log(docSnap.data());
    //           if (docSnap.data().status === false) {
    //             alert("Your account is not approved yet!");
    //             handleLogout();
    //           }
    //           if (docSnap.data().profilePicture) {
    //             setProfileImage(docSnap.data().profilePicture);
    //           }
    //         } else {
    //           console.log("No such document!");
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error fetching document:", error);
    //     }
    //   };
  
    //   fetchData();
    // }, [uid]);
  
  
    return (
            <HomePages>
            <Navbar isSignedIn = {isSignedIn}/>
            <HomeContainer>
              <UserProfileMobile user={uid}/>
              <UserToDo />
              </HomeContainer>
              <Footer />
            </HomePages>
    );
  };

export default HomePage;