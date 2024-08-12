import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';


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

const FormGroup = styled.div`
  display: flex;
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
  background-image: url("https://i.imgur.com/KQEEOTF.png");
  background-size: cover; 
  background-position: center;
`

const LoginFormContainer = styled.div`
  max-width: 400px ;
  width: auto;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
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
  width: 50%;
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
    cursor: pointer;
  }
`;

const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #7f7f7f;
  text-decoration: none;
`;



const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
  };

  return (
    <PageContainer>
      <Navbar isSignedIn={isSignedIn} /> 
      <BackgroundImageContainer>
      <LoginFormContainer>
        <Title>{isSignup ? 'Sign Up' : 'Alumni Login'}</Title>
          {isSignup ? <SignupForm navigate={navigate} /> : <LoginForm navigate={navigate} />}
          <p>
            <SignUpLink onClick={handleFormSwitch}>{isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}</SignUpLink>
          </p>
      </LoginFormContainer>
      </BackgroundImageContainer>
      <Footer />
    </PageContainer>
  );
};





const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Loggin in")
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/home'); // Redirect to home after successful sign in
      })
      .catch((error) => {
        console.error('Sign in error:', error);
        alert("Invalid Credentials");
      });
  };

  return (
    <div>
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
    </div>
  );
};

const SignupForm = ({ navigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [batch, setBatch] = useState('');
  const [number,setNumber] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, 'user_data', user.uid), {
          Name: name,
          Email: email,
          Branch: branch,
          Batch: batch,
          Number: number,
          status: false,
          access: 'student',
        });
        navigate('/home'); // Redirect to home after successful signup
      })
      .catch((error) => {
        console.error('Sign up error:', error);
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup>
        <StyledLabel htmlFor="name">Name:</StyledLabel>
        <StyledInput
          type="text"
          id="name"
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput
          type="email"
          id="email"
          placeholder='Enter Valid Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel htmlFor="tel">Phone Number:</StyledLabel>
        <StyledInput
          type="tel"
          id="number"
          placeholder='Enter Phone Number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel htmlFor="confirmPassword">Confirm Password:</StyledLabel>
        <StyledInput
          type="password"
          id="confirmPassword"
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
      <StyledLabel htmlFor="branch">Branch:</StyledLabel>
          <StyledSelect
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <Option value="">Select Branch</Option>
            <Option value="brij vihar">Brij Vihar</Option>
            <Option value="noida">Noida</Option>
            <Option value="gangaram">Gangaram</Option>
          </StyledSelect>
      </FormGroup>
      <FormGroup>
        <StyledLabel htmlFor="batch">Batch:</StyledLabel>
        <StyledSelect
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          >
            <Option value="">Select Batch</Option>
            <Option value="2024">2024</Option>
            <Option value="2024">2023</Option>
            <Option value="2022">2022</Option>
          </StyledSelect>
      </FormGroup>
      <StyledButton type="submit">Sign Up</StyledButton>
    </Form>
  );
};

export default LoginPage;
