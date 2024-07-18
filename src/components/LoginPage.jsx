// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {  createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'firebase/auth';
// import { auth, db } from '../firebase';
// import { doc, setDoc } from "firebase/firestore"; 
// import Navbar from './Navbar';
// import Footer from './Footer';
// import styled from 'styled-components';


  


// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         navigate("/home") // Redirect to login after successful signin (might want to redirect to a different page)
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage)
//     });
//     // Implement form submission logic here
//     // This would typically involve sending data to a backend server
//     console.log('Submitting form...');
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     createUserWithEmailAndPassword(auth, email, password)
//           .then((userCredential) => {
//               // Signed in
//               const user = userCredential.user;
//               console.log(user);
//               console.log("Adding to db!")
//               setDoc(doc(db, "user_data", user.uid), 
//                 {
//                 Name: name,
//                 Email: email,
//                 }
//               )
//               navigate('/home')
//           })
//           .catch((error) => {
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               console.log(errorCode, errorMessage);
//               // ..
//               });
//     // Implement form submission logic here
//     // This would typically involve sending data to a backend server
//     console.log('Submitting form...');
//   };
  

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <label htmlFor="name">Name:</label>
//       <input
//         type="text"
//         id="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <label htmlFor="confirmPassword">Confirm Password:</label>
//       <input
//         type="password"
//         id="confirmPassword"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };


// const LoginPage = () => {
//   console.log("Login Page Loading!")
  // const [isSignup, setIsSignup] = useState(false);


//   const handleFormSwitch = () => {
//     setIsSignup(!isSignup);
//   };

//   return (
//     <div>
      
//     <Navbar isSignedIn = {false} />
//     <div className="login-page">
//       <h1>Welcome!</h1>
//       {isSignup ? (
//         <SignupForm/>
//       ) : (
//         <LoginForm  />
//       )}
//       <p>
//         {isSignup ? 'Already have an account?' : 'New user?'}
//         <button onClick={handleFormSwitch}>
//           {isSignup ? 'Sign In' : 'Sign Up'}
//         </button>
//       </p>
//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default LoginPage;

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

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 350px;
`;

const CardTitle = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
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
      <ContentContainer>
        <Card>
          <CardTitle>{isSignup ? 'Sign Up' : 'Sign In'}</CardTitle>
          {isSignup ? <SignupForm navigate={navigate} /> : <LoginForm navigate={navigate} />}
          <p>
            {isSignup ? 'Already have an account?' : 'New user?'}
            <Button onClick={handleFormSwitch}>{isSignup ? 'Sign In' : 'Sign Up'}</Button>
          </p>
        </Card>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleFormSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/home'); // Redirect to home after successful signin
      })
      .catch((error) => {
        console.error('Sign in error:', error);
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit">Sign In</Button>
    </Form>
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
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Phone Number:</Label>
        <Input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password:</Label>
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="branch">Branch:</Label>
          <Select
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <Option value="">Select Branch</Option>
            <Option value="brij vihar">Brij Vihar</Option>
            <Option value="noida">Noida</Option>
            <Option value="gangaram">GangaRam</Option>
          </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="batch">Batch:</Label>
        <Select
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          >
            <Option value="">Select Batch</Option>
            <Option value="2024">2024</Option>
            <Option value="2024">2023</Option>
            <Option value="2022">2022</Option>
          </Select>
      </FormGroup>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default LoginPage;
