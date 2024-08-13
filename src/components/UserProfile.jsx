// import React, { useState, useEffect } from 'react';
// import { doc, getDoc } from "firebase/firestore";
// import { db } from '../firebase';

// function UserProfile({ user }) {
//     const [user_data, setUser] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (user != '') {
//                     const docRef = doc(db, 'user_data', user); // Reference to the 'user_data' collection
//                     const docSnap = await getDoc(docRef);

//                 if (docSnap.exists()) {
//                     setUser(docSnap.data());
//                     console.log(docSnap.data())
//                 } else {
//                     console.log("No such document!");
//                 }
//             }
//             } catch (error) {
//                 console.error("Error fetching document:", error);
//             }
//         };

//         fetchData();
//     }, [user]); 

//     return (
//         <div>
//             <h2>Hey {user_data.Name}</h2>
//             <h2>Welcome to {user_data.Branch}</h2>
//         </div>
//     );
// }

// export default UserProfile;



// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { db, storage } from './firebase';

// const ProfileContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #ffffff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
// `;

// const ProfileHeader = styled.div`
//   text-align: center;
// `;

// const ProfileImage = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   object-fit: cover;
// `;

// const ProfileInfo = styled.div`
//   margin-top: 20px;
//   text-align: center;
// `;

// const UploadInput = styled.input`
//   display: none;
// `;

// const UploadButton = styled.label`
//   display: inline-block;
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: #ffffff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// function UserProfile({ user }) {
//   const [userData, setUserData] = useState({});
//   const [profileImage, setProfileImage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (user !== '') {
//           const docRef = doc(db, 'user_data', user);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//             // Check if profile picture exists
//             if (docSnap.data().profilePicture) {
//               setProfileImage(docSnap.data().profilePicture);
//             }
//           } else {
//             console.log("No such document!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching document:", error);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     // Assuming you're using Firebase Storage to store profile pictures
//     // Here, you would upload the file and update the profilePicture field in Firestore
//     // For simplicity, we're not implementing the upload functionality in this example
//     setProfileImage(URL.createObjectURL(file));

//   };

//   return (
//     <ProfileContainer>
//       <ProfileHeader>
//         {profileImage ? (
//           <ProfileImage src={profileImage} alt="Profile" />
//         ) : (
//           <ProfileImage src="/default-profile.png" alt="Default Profile" />
//         )}
//         <UploadInput
//           type="file"
//           id="profilePicture"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//         <UploadButton htmlFor="profilePicture">Upload Profile Picture</UploadButton>
//       </ProfileHeader>
//       <ProfileInfo>
//         <h2>Hey {userData.Name}</h2>
//         <h2>Welcome to {userData.Branch}</h2>
//         {/* Additional profile information can be displayed here */}
//       </ProfileInfo>
//     </ProfileContainer>
//   );
// }

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { storage } from '../firebase'; // Ensure you have the storage import set up
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 15px auto;
  padding: 20px;
  background: transparent;
`;

const ProfileHeader = styled.div`
  text-align: center;
  display: flex;
  width: 25%;
  margin-right: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  `

const ProfileData = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;

`

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
`

const ContentContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
`
const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px 0 10px 0;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #1A9D8D;
  color: #ffffff;
  border: none;
  margin: 5px 0 5px 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #1A9D8D;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0b6ea8;
  }
`;

const StyledInput = styled.input`
  margin-bottom: 5px;
  width: 50%;
  padding: 5px;
  font-size: 16px;
  color: #7f7f7f;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

function UserProfile({ user }) {
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    University: '',
    Degree: '',
    Occupation: '',
    Company: '',
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        University: userData.University || '',
        Degree: userData.Degree || '',
        Occupation: userData.Occupation || '',
        Company: userData.Company || '',
      });
    }
  }, [userData, isEditing]);

  const toggleEdit = () => {
    if (!isEditing) {
      setProfileData({
        University: userData.University || '',
        Degree: userData.Degree || '',
        Occupation: userData.Occupation || '',
        Company: userData.Company || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const mergedData = { ...userData, ...profileData };
      console.log(mergedData);
      await setDoc(doc(db, 'user_data', user), mergedData);

      // Update the userData with the newly saved profileData
      setUserData(mergedData);

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const docRef = doc(db, 'user_data', user);
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
  }, [user]);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    const userId = user;

    try {
      const storageRef = ref(storage, `profile_images/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await setDoc(doc(db, 'user_data', userId), { profilePicture: downloadURL }, { merge: true });
      setProfileImage(downloadURL);
      console.log('Image uploaded successfully:', downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        {profileImage ? (
          <ProfileImage src={profileImage} alt="Profile" />
        ) : (
          <ProfileImage src="/default-profile.png" alt="Default Profile" />
        )}
        <UploadInput
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
        />
        <UploadButton htmlFor="profilePicture">Upload</UploadButton>
      </ProfileHeader>
      <ProfileData>
        <DataContainer>
          <ContentContainer>
            <h3>Name:{userData.Name}</h3>
          </ContentContainer>
          <ContentContainer>
            <h3>University: </h3>
            {isEditing ? (
              <StyledInput
                type="text"
                name="University"
                value={profileData.University}
                onChange={handleChange}
              />
            ) : (
              <h3>{userData.University}</h3>
            )}
          </ContentContainer>
        </DataContainer>
        <DataContainer>
          <ContentContainer>
            <h3>Email:{userData.Email}</h3>
          </ContentContainer>
          <ContentContainer>
            <h3>Degree: </h3>
            {isEditing ? (
              <StyledInput
                type="text"
                name="Degree"
                value={profileData.Degree}
                onChange={handleChange}
              />
            ) : (
              <h3>{userData.Degree}</h3>
            )}
          </ContentContainer>
        </DataContainer>
        <DataContainer>
          <ContentContainer>
            <h3>Number:{userData.Number}</h3>
          </ContentContainer>
          <ContentContainer>
            <h3>Occupation: </h3>
            {isEditing ? (
              <StyledInput
                type="text"
                name="Occupation"
                value={profileData.Occupation}
                onChange={handleChange}
              />
            ) : (
              <h3>{userData.Occupation}</h3>
            )}
          </ContentContainer>
        </DataContainer>
        <DataContainer>
          <ContentContainer>
            <h3>Batch of {userData.Batch}</h3>
          </ContentContainer>
          <ContentContainer>
          <h3>Company: </h3>
            {isEditing ? (
              <StyledInput
                type="text"
                name="Company"
                value={profileData.Company}
                onChange={handleChange}
              />
            ) : (
              <h3>{userData.Company}</h3>
            )}
          </ContentContainer>
        </DataContainer>
          <StyledButton onClick={isEditing ? handleSave : toggleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </StyledButton>
      </ProfileData>
    </ProfileContainer>
  );
}


export default UserProfile;


