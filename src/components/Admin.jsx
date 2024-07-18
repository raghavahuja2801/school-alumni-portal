import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path to your Firebase setup
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Assuming you have Navbar and Footer components already defined

const LoginContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Attempting to log in")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user.uid;
      console.log(user)
      const docRef = doc(db, 'user_data', user); // Adjust 'user_data' to your Firestore collection name
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const user_access = docSnap.data().access
            if (user_access == 'admin'){
            console.log('Admin logged in:', user.uid);
            // Redirect to admin dashboard or desired page
            navigate('/admin/dashboard');
            }
            else{
                console.log("You are not admin")
                navigate('/home')
            }
      }
      else{
        console.log("You don't have admin privalages!!")
        navigate("/login")
      }
      
    } catch (error) {
      setError(error.message);
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <LoginContainer>
        <h2>Admin Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <LoginForm onSubmit={handleFormSubmit}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
      </LoginContainer>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;
