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
import { db, auth} from '../firebase';
import { storage } from '../firebase'; // Ensure you have the storage import set up
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';




import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function UserProfile({ user }) {
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate()

  const handleLogout = () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully");
        })
        .catch((error) => {
          // An error happened.
        });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user !== '') {
          const docRef = doc(db, 'user_data', user); // Adjust 'user_data' to your Firestore collection name
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log('logged in')
            setUserData(docSnap.data());
            console.log(docSnap.data())
            if (docSnap.data().status == false){
                alert("Your account is not approved yet!")
                handleLogout()
            }
            // Check if profile picture exists
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
    const userId = user; // Assuming 'user' prop contains the user ID
  
    try {
      const storageRef = ref(storage, `profile_images/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      const userRef = doc(db, 'user_data', userId); // Adjust to your Firestore collection
      await setDoc(userRef, { profilePicture: downloadURL }, { merge: true });
  
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
        <UploadButton htmlFor="profilePicture">Upload Profile Picture</UploadButton>
      </ProfileHeader>
      <div>
        <h2>Hey {userData.Name}</h2>
        <h2>Welcome to {userData.Branch} alumni portal</h2>
        {/* Additional profile information can be displayed here */}
      </div>
    </ProfileContainer>
  );
}

export default UserProfile;

