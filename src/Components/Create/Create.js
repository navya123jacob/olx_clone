import React, {
  Fragment,
  useReducer,
  useContext,
  
  useState,
} from "react";
import "./Create.css";
import Header from "../HeaderandFooter/Header";
import Footer from '../HeaderandFooter/Footer'
import { FirebaseContext, AuthContext } from "../../store/Contexts_olx";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
const Create = () => {
  const { Firebase, storage, firestore } = useContext(FirebaseContext);
  const { myuser } = useContext(AuthContext);
  const date = new Date();
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({
    username: "",
    category: "",
    price: "",
    img: "",
    description: "",
    location: ""
  });

  const reducer = (current, action) => {
    switch (action.type) {
      case "CHANGE_USERNAME":
        return { ...current, username: action.payload };
      case "CHANGE_CATEGORY":
        return { ...current, category: action.payload };
      case "CHANGE_PRICE":
        return { ...current, price: action.payload };
      case "CHANGE_IMG":
        return { ...current, img: action.payload };
      case "CHANGE_IMGPROP":
        return { ...current, imgprop: action.payload };
      case "CHANGE_DESCRIPTION":
        return { ...current, description: action.payload };
      case "CHANGE_LOCATION":
        return { ...current, location: action.payload };
      default:
        return current;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    username: "",
    category: "",
    price: 0,
    img: "",
    imgprop: "",
    description: "",
    location: ""
  });

  const nameChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "CHANGE_USERNAME", payload: value });
  };

  const catChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "CHANGE_CATEGORY", payload: value });
  };
  
  const priceChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "CHANGE_PRICE", payload: value });
  };

  const descriptionChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "CHANGE_DESCRIPTION", payload: value });
  };

  const locationChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "CHANGE_LOCATION", payload: value });
  };

  const Img_upload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const imageURL = URL.createObjectURL(file);
    dispatch({ type: "CHANGE_IMG", payload: imageURL });
    dispatch({ type: "CHANGE_IMGPROP", payload: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: "",
      category: "",
      price: "",
      img: "",
      description: "",
      location: "",
    });
  
    let valid = true;
    if (state.username.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Name is required",
      }));
      valid = false;
    }
    if (state.category.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: "Category is required",
      }));
      valid = false;
    }
    if (state.price === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price is required",
      }));
      valid = false;
    }
    if (!state.imgprop) {
      setErrors((prevErrors) => ({ ...prevErrors, img: "Image is required" }));
      valid = false;
    }
    if (state.description.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
      valid = false;
    }
    if (state.location.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Location is required",
      }));
      valid = false;
    }
  
    if (valid) {
      try {
        const file = state.imgprop;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const snapshot = await uploadBytesResumable(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
  
        console.log("Download URL:", url);
  
        await addDoc(collection(firestore, "products"), {
          prodname: state.username,
          category: state.category,
          price: state.price,
          image: url,
          userId: myuser,
          description: state.description,
          location: state.location,
          createdAt: date.toDateString(),
        });
  
        await navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Error occurred. Please try again.");
      }
    }
  };
  


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <div>
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
              <div className="error">{errors.username}</div>
            </div>
            <div>
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
              <div className="error">{errors.category}</div>
            </div>
            <div>
              <label htmlFor="fname">Price</label>
              <br />
              <input
                className="input"
                type="number"
                id="fname"
                name="Price"
                value={state.price}
                onChange={priceChange}
              />
              <div className="error">{errors.price}</div>
            </div>
            <div> 
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                className="input"
                id="description"
                name="description"
                value={state.description}
                onChange={descriptionChange}
              ></textarea>
              <div className="error">{errors.description}</div>
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <br />
              <input
                className="input"
                type="text"
                id="location"
                name="location"
                value={state.location}
                onChange={locationChange}
              />
              <div className="error">{errors.location}</div>{" "}
            </div>
          </form>
          <br />
          <img alt="Selected Image" width="200px" height="200px" src={state.img}></img>
          <form>
            <br />
            <input type="file" onChange={Img_upload} />
            <div className="error">{errors.img}</div>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>
              Upload and Submit
            </button>
          </form>
        </div>
      </card>
      
    </Fragment>
  );
};

export default Create;
