import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path to your Firebase setup
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Styled components for styling
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: auto;
`;

const FormGroup = styled(Form)`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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


const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Option = styled.option`
  padding: 8px;
  font-size: 16px;
`;

const BackgroundImageContainer = styled.div`
  background-image: url("https://i.imgur.com/PkTeIUz.jpeg");
  background-size: cover; 
  background-position: center;
  height: 500px;
`

const LoginFormContainer = styled.div`
  max-width: 400px ;
  width: auto;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(to bottom, #1A9D8D, #FFD902);
  border-radius: 20px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: bold;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  margin-right: 10px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  color: #7f7f7f;
  background-color: #D9D9D9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  color: #7f7f7f;
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 8px;
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

const SignUpLink = styled.a`
  display: block;
  margin-top: 10px;
  color: black;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #7f7f7f;
  text-decoration: none;
`;


const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignedIn, setSignedIn] = useState(false);

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
    <PageContainer>
      <Navbar isSignedIn={isSignedIn} /> 
      <BackgroundImageContainer>
        <LoginFormContainer>
          <Title>Admin Login</Title>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <StyledLabel>Email</StyledLabel>
          <StyledInput
            type="email"
            id="email"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
        <StyledLabel>Password</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            placeholder="Password Required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <StyledButton type="submit">Sign In</StyledButton>
      </Form>
      <ForgotPasswordLink href="/forgot-password">Forgot Password?</ForgotPasswordLink>
      </LoginFormContainer>
      </BackgroundImageContainer>
      <Footer />
      </PageContainer>
  );
};

export default AdminLoginPage;
