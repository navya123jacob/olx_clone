import React, { useState, useReducer, useContext } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Contexts_olx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate();
  const {  auth, firestore } = useContext(FirebaseContext);
  const [errors, setErrors] = useState({});
  const reducer = (current, action) => {
    switch (action.type) {
      case 'CHANGE_USERNAME':
        return { ...current, username: action.payload };
      case 'CHANGE_EMAIL':
        return { ...current, email: action.payload };
      case 'CHANGE_PASSWORD':
        return { ...current, password: action.payload };
      case 'CHANGE_PHONE':
        return { ...current, phone: action.payload };
      default:
        return current;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const nameChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_USERNAME', payload: value });
  };

  const emailChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_EMAIL', payload: value });
  };

  const passChange = (e) => {
    dispatch({ type: 'CHANGE_PASSWORD', payload: e.target.value });
  };

  const phoneChange = (e) => {
    dispatch({ type: 'CHANGE_PHONE', payload: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};

    // Validate username
    if (state.username.trim() === '') {
      errors.username = 'Username is required';
    }

    // Validate email
    if (state.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
      errors.email = 'Email is not valid';
    }

    // Validate phone
    if (state.phone.trim() === '') {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(state.phone)) {
      errors.phone = 'Phone number is not valid';
    }

    // Validate password
    if (state.password === '') {
      errors.password = 'Password is required';
    }

    // If there are validation errors, update the state and return
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Perform user authentication and database operation
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user);
      await addDoc(collection(firestore, 'users'), {
        email: state.email,
        username: state.username,
        phone: state.phone,
        password: state.password,
      });
      navigate('/login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode==='auth/email-already-in-use'){
        errors.invalid="Already registered"
        setErrors(errors)
      }
      console.log(errorCode)
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <>
      <div className="signupPage "> {/* Add a wrapping div with a specific class */}
        <div className="signupParentDiv">
          <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
          <form onSubmit={handlesubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              id="fname"
              name="name"
              value={state.username}
              onChange={nameChange}
            />
             <div className="error m-1">{errors.username && errors.username}</div>
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="fname"
              name="email"
              value={state.email}
              onChange={emailChange}
            />
             <div className="error m-1">{errors.email && errors.email}</div>
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              id="lname"
              name="phone"
              value={state.phone}
              onChange={phoneChange}
            />
             <div className="error m-1">{errors.phone &&errors.phone}</div>
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="lname"
              name="password"
              value={state.password}
              onChange={passChange}
            />
            <div className="error m-1">{errors.password && errors.password}</div>
            <div className="error m-1">{errors.invalid && errors.invalid}</div>
            <br />
            <br />
            <button type="submit">Signup</button>
          </form>
          <Link to='/login'>Log in</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
