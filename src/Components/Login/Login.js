import React, { useState, useReducer, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';

import { FirebaseContext } from '../../store/Contexts_olx';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';


function Login() {
  const navigate=useNavigate()
  const {  auth, firestore } = useContext(FirebaseContext);
  const [errors, setErrors] = useState({});
  const reducer = (current, action) => {
    switch (action.type) {
     
      case 'CHANGE_EMAIL':
        return { ...current, email: action.payload };
      case 'CHANGE_PASSWORD':
        return { ...current, password: action.payload };
     
      
      default:
        return current;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    
    email: 'Enter email',
    password: ''
   
  });



  const emailChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_EMAIL', payload: value });
  };

  const passChange = (e) => {
    dispatch({ type: 'CHANGE_PASSWORD', payload: e.target.value });
  };

  
  const handlesubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    // Validate email
    if (state.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
      errors.email = 'Email is not valid';
    }

    
    // Validate password
    if (state.password === '' ) {
      errors.password = 'Password is required';
    }

    // If there are validation errors, update the state and return
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    let credentials;
    // Perform user authentication and database operation
    try {
      credentials=await signInWithEmailAndPassword(auth, state.email, state.password)
      console.log(credentials)
      navigate('/');
    } catch (error) {
      errors.email ='Invalid email and password'
      setErrors(errors);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <div class="login_outer">
      <div className="loginParentDiv">
        
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlesubmit}>
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
          <br />
          <div className="error m-1">{errors.email && errors.email}</div>
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
          <div className="error m-1">{errors.ivalid && errors.invalid}</div>
            <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
