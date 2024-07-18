import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase'; // Adjust path to your Firebase setup
import { doc, getDoc } from 'firebase/firestore';

const PdfContainer = styled.div`
  width: auto;
  height: 300px; /* Adjust height as needed */
  display: flex;
  justify-content: center;
`;

const PdfList = (user_id) => {
  const [pdfs, setPdfs] = useState([]);
  const [userBranch, setUserBranch] = useState('');

  useEffect(() => {
    const fetchUserBranch = async (userId) => {
      try {
        if(userId != ''){
        const docRef = doc(db, 'user_data', userId); // Adjust 'user_data' to your Firestore collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserBranch(docSnap.data().Branch);
          fetchPdfs(docSnap.data().Branch); // Fetch PDFs after getting the user's branch
        } else {
          console.log("User does not exist");
        }
      }
      } catch (error) {
        console.error('Error fetching user branch:', error);
      }
    };

  fetchUserBranch(user_id.user_id); // Clean up auth listener
  }, [user_id]);

  const fetchPdfs = async (branch) => {
    try {
      const pdfsRef = collection(db, 'pdfs'); // Adjust to your Firestore collection name
      const q = query(pdfsRef, where('branch', '==', branch));
      const querySnapshot = await getDocs(q);

      const pdfList = [];
      querySnapshot.forEach((doc) => {
        pdfList.push({ id: doc.id, ...doc.data() });
      });

      setPdfs(pdfList);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  return (
    <div>
    <h2>PDFs for {userBranch} branch</h2>
    {pdfs.length > 0 ? (
      pdfs.map((pdf) => (
        <PdfContainer key={pdf.id}>
          <iframe
            title={pdf.name}
            src={pdf.url}
            width="auto"
            height="auto"
            style={{ border: 'none' }}
          />
        </PdfContainer>
      ))
    ) : (
      <p>No PDFs found for {userBranch} branch.</p>
    )}
  </div>
  );
};

export default PdfList;
