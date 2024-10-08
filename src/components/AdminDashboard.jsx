import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Adjust path to your Navbar component
import Footer from './Footer'; // Adjust path to your Footer component
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import { auth, db, storage } from '../firebase'; // Adjust path to your Firebase setup


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 5rem; /* Ensure the dashboard takes at least the full viewport height */
  background-color: white;
`;

const ContentContainer = styled.div`
  flex: 1; /* Take up remaining vertical space */
  padding: 20px;
`;

// const FileContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

const UploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  justify-content: space-evenly;
  padding: 10px;
  margin: 10px;

  @media (max-width: 768px){
   width: 80%; 
  }
`

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  width: auto;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
`;


const StyledInput = styled.input`
  width: 80%;
  text-align: center;
  margin: 10px;
  align-items: center;
`
const StyledButton = styled(Button)`
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

const StudentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StudentItem = styled.li`
  margin-bottom: 10px;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const { user } = useAuth();


  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const docRef = doc(db, 'user_data', user.uid); // Adjust 'user_data' to your Firestore collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (docSnap.data().access === 'admin') {
            fetchStudents(docSnap.data()); // Call fetchStudents after admin data is fetched
          } else {
            console.log("You are not admin");
            navigate('/home');
          }
        } else {
          console.log("Admin does not exist");
        }
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    };

    if (user) {
      console.log("Admin LOGGED IN");
      setIsSignedIn(true);
      fetchAdmin(); // Fetch admin data when user is logged in
    } else {
      navigate('/admin');
      console.log("Admin is logged out");
    }
  }, [user]);

  const fetchStudents = async (admin_data) => {
    try {
      console.log("Fetching students");
      const studentsRef = collection(db, 'user_data'); // Adjust to your Firestore collection name
      const q = query(studentsRef, where('Branch', '==', admin_data.Branch), where('status', '==', false)); // Adjust branch filtering criteria
      const querySnapshot = await getDocs(q);

      const studentList = [];
      querySnapshot.forEach((doc) => {
        studentList.push({ id: doc.id, ...doc.data() });
      });

      setStudents(studentList);
      console.log(studentList);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const approveStudent = async (studentId) => {
    try {
      const studentDocRef = doc(db, 'user_data', studentId); // Adjust to your Firestore collection and document ID
      await updateDoc(studentDocRef, {
        status: true, // Update status to true for approval
      });

      // Update local state after approval
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );

      console.log('Student approved successfully!');
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const uploadPdf = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file first');
      return;
    }

    const pdfRef = ref(storage, `pdfs/${admin.Branch}/${pdfFile.name}`);
    try {
      await uploadBytes(pdfRef, pdfFile);
      const downloadURL = await getDownloadURL(pdfRef);

      await addDoc(collection(db, 'pdfs'), {
        branch: admin.Branch,
        url: downloadURL,
        name: pdfFile.name,
        uploadedAt: new Date(),
      });

      alert('PDF uploaded successfully');
      setPdfFile(null); // Clear the file input
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error uploading PDF');
    }
  };

  return (
    <DashboardContainer>
      <Navbar isSignedIn={isSignedIn} />
      <ContentContainer>
        <h2>Students awaiting approval:</h2>
        <StudentList>
          {students.map((student) => (
            <StudentItem key={student.id}>
              {student.Name} - {student.Batch}
              <StyledButton onClick={() => approveStudent(student.id)}>Approve</StyledButton>
            </StudentItem>
          ))}
        </StudentList>
      </ContentContainer>
      <UploadContainer>
        <BoxContainer>
          <h2>Upload Notice</h2>
            <StyledInput type="file" accept="application/pdf" onChange={handlePdfChange} />
            <StyledButton onClick={uploadPdf}>Upload PDF</StyledButton>
        </BoxContainer>
        <BoxContainer>
          <h2>Upload Circular</h2>
          <StyledInput type="file" accept="application/pdf" onChange={handlePdfChange} />
          <StyledButton onClick={uploadPdf}>Upload PDF</StyledButton>
        </BoxContainer>
      </UploadContainer>
      <Footer />
    </DashboardContainer>
  );
};

export default AdminDashboard;
