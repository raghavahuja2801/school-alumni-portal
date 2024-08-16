import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase.js';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import UserProfileMobile from './UserProfileMobile.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext.jsx';

const HomePages = styled.div`
  width: 100%;
  background-color: white;
`

const HomeContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AlumniSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
`;

const AlumniCard = styled.div`
  background: linear-gradient(to bottom, #1A9D8D, #FFD902);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  height: auto;
  text-align: center;

  @media (max-width: 768px) {
    width: 60%;
  }

  h3{
    margin: 3px auto;
  }

  p{
    margin: 4px 0;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #1A9D8D;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;

  &:hover {
    background-color: #0b6ea8;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px 0 10px 0;
`;

const Connects = () => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [UID, setUID] = useState('')
    const [userData, setUserData] = useState({})
    const [alumniList, setAlumni] = useState([])
    const { user } = useAuth();



    const fetchData = async (user) => {
      try {
        if (user) {
          const docRef = doc(db, 'user_data', user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            if (docSnap.data().status === false) {
              alert("Your account is not approved yet!");
              handleLogout();
            }
            fetchStudents(docSnap.data())
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };


    useEffect(()=>{
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setIsSignedIn(true)
              fetchData(user.uid)
            } else {
              // User is signed out
              // ...
              navigate('/login')
              alert("Sign in please")
              console.log("user is logged out")
            }
         
    }, [user])

    const fetchStudents = async (userData) => {
      if(userData){
      try {
        console.log("Fetching students");
        const studentsRef = collection(db, 'user_data'); // Adjust to your Firestore collection name
        const q = query(studentsRef, where('Branch', '==', userData.Branch), where('Batch', '==', userData.Batch)); // Adjust branch filtering criteria
        const querySnapshot = await getDocs(q);
  
        const studentList = [];
        querySnapshot.forEach((doc) => {
          studentList.push({ id: doc.id, ...doc.data() });
        });
  
        setAlumni(studentList);
        console.log(studentList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
    };

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

    const sendEmail = (email) => {
      window.location.href = `mailto:${email}`;
    };
  
  
  
    return (
            <HomePages>
            <Navbar isSignedIn = {isSignedIn}/>
            <HomeContainer>
              <UserProfileMobile/>
              <AlumniSection>
          {alumniList.map((alumni) => (
            <AlumniCard key={alumni.id}>
              <ProfileImage src={alumni.profilePicture}/>
              <h3>{alumni.Name}</h3>
              <p>Company: {alumni.Company}</p>
              <p>Occupation: {alumni.Occupation}</p>
              <StyledButton onClick={() => sendEmail(alumni.Email)}>Send Email</StyledButton>
            </AlumniCard>
          ))}
        </AlumniSection>
              </HomeContainer>
              <Footer />
            </HomePages>
    );
  };

export default Connects;