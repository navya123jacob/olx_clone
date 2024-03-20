import React, { Fragment, useReducer,useContext,useEffect, useState} from 'react';
import './Create.css';
import Header from '../HeaderandFooter/Header';
import { FirebaseContext ,AuthContext} from '../../store/Contexts_olx';

import { ref, uploadBytesResumable, listAll,getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
const Create = () => {
  const {Firebase,storage}=useContext(FirebaseContext)
  const {myuser}=useContext(AuthContext)
  const reducer = (current, action) => {
    switch (action.type) {
      case 'CHANGE_USERNAME':
        return { ...current, username: action.payload };
      case 'CHANGE_CATEGORY':
        return { ...current, category: action.payload };
      case 'CHANGE_PRICE':
        return { ...current, price: action.payload };
      case 'CHANGE_IMG':
        return { ...current, img: action.payload };
      case 'CHANGE_IMGPROP':
        return { ...current, imgprop: action.payload };
      default:
        return current;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    username: '',
    category: '',
    price: 0,
    img: '',
    imgprop:''
  });

  const nameChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_USERNAME', payload: value });
  };

  const catChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_CATEGORY', payload: value });
  };
  const priceChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_PRICE', payload: value });
  };

  const Img_upload=(e)=>{
    const file = e.target.files[0]; // Get the selected file
    console.log(e.target.files[0])
    if (file) {
      const reader = new FileReader(); // Create a new FileReader object
      reader.readAsDataURL(file); // Read the selected file as a data URL
      
      // When the file is loaded, set the img property in state to the data URL
      reader.onload = () => {
        
        dispatch({ type: 'CHANGE_IMG', payload: reader.result });
        dispatch({ type: 'CHANGE_IMGPROP', payload: file });
      };
    }
  }

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let file=state.imgprop
    let imageRef = ref(storage,`images/${file.name +v4() }`,);
    uploadBytesResumable(imageRef, file)
        .then((snapshot) => {
            // Image upload successful, now get the download URL
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    // Use the download URL as needed (e.g., store it in a database)
                    console.log("Download URL:", url);
                    

                    // Clear the file input field or reset any related state variables if needed
                })
                .catch((error) => {
                    // Handle any errors that occur while getting the download URL
                    console.error("Error getting download URL:", error);
                    alert("Error getting download URL. Please try again.");
                });
        })
        .catch((error) => {
            // Handle any errors that occur during the upload process
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
        });
  
  };


const [imageList,setImage]=useState([])
  useEffect(()=>{

  },[])

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={state.username}
              onChange={nameChange}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={state.category}
              onChange={catChange}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
            value={state.price}
            onChange={priceChange} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={state.img}></img>
          <form>
            <br />
            <input type="file" onChange={Img_upload}/>
            <br />
            <button className="uploadBtn"  onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
