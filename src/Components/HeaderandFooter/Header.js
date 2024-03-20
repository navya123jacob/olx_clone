import React ,{useEffect,useContext,useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';


import { onAuthStateChanged,signOut  } from "firebase/auth";
import { FirebaseContext } from '../../store/Contexts_olx';
import { AuthContext } from '../../store/Contexts_olx';

import {collection, query,where,getDocs} from "firebase/firestore"
import { useNavigate,Link } from 'react-router-dom';


function Header() {
  const {myuser,setMyuser}=useContext(AuthContext)
  const {  auth, firestore } = useContext(FirebaseContext);
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const uid = user.uid;
          console.log("uid", uid,'user',user.email)
          
          const getUserData = async () => {
            try {
              // Create a query to find the document with the provided email
              const q = query(collection(firestore, 'users'), where('email', '==', 'navyatjacob@gmail.com'));
              
              // Execute the query
              const querySnapshot = await getDocs(q);
              console.log(q,querySnapshot)
              if (!querySnapshot.empty) {
                // Retrieve the first document (assuming there's only one document with the given email)
                const userData = querySnapshot.docs[0].data();
                
                // Get the username from the user data
                const { username } = userData;
                console.log(username)
                setMyuser(username)
                
              }
              
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
          getUserData()

        } else {
          // User is signed out
          console.log("user is logged out")
        }
      });
     
}, [])


const navigate=useNavigate()

const handleLogout = () => {               
  signOut(auth).then(() => {
  // Sign-out successful.
      navigate("/login");
      console.log("Signed out successfully")
  }).catch((error) => {
  // An error happened.
  });
}

const navigateToSell=()=>{
  navigate("/create");
}


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {/* Render the user's name if logged in, or 'Login' */}
          {myuser ?`Welcome ${myuser}` : (<Link to='/login'>Login</Link>)}
          <hr />
         
        </div>
        <div className="loginPage">
  {/* Render the user's name if logged in, or 'Login' */}
  {myuser && (
    <a onClick={handleLogout}>Logout</a>
  
  )}
  <hr />
</div>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={navigateToSell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;


//get document
          // const q = query(collection(firestore, 'users'), orderBy('created', 'desc'))
          // onSnapshot(q, (querySnapshot) => {
          //  console.log(querySnapshot)
          //  setTasks(querySnapshot.docs.map(doc => ({
          //   id: doc.id,
          //   data: doc.data()
          // })))
          // console.log(tasks)
          // })
