import React ,{Fragment,useEffect,useContext,useState} from 'react';

import './View.css';
import Header from '../HeaderandFooter/Header';
import Footer from '../HeaderandFooter/Footer';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Contexts_olx';
import { collection, getDoc } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const {firestore}=useContext(FirebaseContext)
  useEffect(()=>{
    const getProd = async () => {
      const prodCollectionRef = collection(firestore, "products");
      
    };
    getProd()
  })
  return (
    <Fragment>
      <Header />
      {postDetails &&(<div className="viewParentDiv">
  <div style={{"width":"100%","height":"100%" ,"display":"flex"}}><div className="imageShowDiv">
    <img src={postDetails.image} alt="" />
  </div>
  <div className="rightSection">
    <div className="productDetails">
      <p>&#x20B9; {postDetails.price}</p>
      <p>{postDetails.name}</p>
      <p>{postDetails.category}</p>
      <span>{postDetails.createdAt}</span>
    </div>
    
    <div className="contactDetails">
      <p>Seller details</p>
      <p>{postDetails.sellerName}</p>
      <p>{postDetails.contactNumber}</p>
    </div>
  </div></div>
  <div className="descriptionCard">
    <h4><b>Description</b></h4>
    <br/>
      <p className="description">{postDetails.description}</p>
    </div>
</div>)}

      <Footer />
    </Fragment>
  );
}

export default View;