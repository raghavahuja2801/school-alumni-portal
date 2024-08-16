import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Adjust path to your Navbar component
import Footer from './Footer'; // Adjust path to your Footer component
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
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

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  width: auto;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

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
  const [admin_id, setAdminId] = useState('');
  const [admin, setAdmin] = useState({});
  const [students, setStudents] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const fetchAdmin = async (admin_uid) => {
      try {
        const docRef = doc(db, 'user_data', admin_uid); // Adjust 'user_data' to your Firestore collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (docSnap.data().access === 'admin') {
            setAdmin(docSnap.data());
            console.log("ADMIN DATA UPDATED", docSnap.data());
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

    const authListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Admin LOGGED IN");
        setAdminId(user.uid);
        setIsSignedIn(true);
        fetchAdmin(user.uid); // Fetch admin data when user is logged in
      } else {
        navigate('/admin');
        console.log("Admin is logged out");
      }
    });

    return () => authListener(); // Clean up auth listener
  }, []);

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

        <h2>Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        <button onClick={uploadPdf}>Upload PDF</button>
      </ContentContainer>
      <Footer />
    </DashboardContainer>
  );
};

export default AdminDashboard;
