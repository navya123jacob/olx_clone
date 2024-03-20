import React, { useEffect, useContext, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext, AuthContext } from "../../store/Contexts_olx";
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";
function Posts() {
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { Firebase, storage, firestore, auth } = useContext(FirebaseContext);
  const [product, setProducts] = useState([]);
  const productsCollectionRef = collection(firestore, "products");
  const navigate = useNavigate();
  useEffect(() => {
    const getProd = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProd();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreViewContainer"> 
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {product.map((item, index) => (
            
              <div className="card" onClick={() => { setPostDetails(item); navigate('/view'); }}>
                <div className="image">
                  <div className="favorite">
                    <Heart />
                  </div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {item.price}</p>

                  <p className="name">{item.name}</p>
                  <p className="description">
                    {item.description.trim().slice(0, 30)}...
                  </p>
                  <div className="date">
                    <span>{item.createdAt}</span>
                  </div>
                </div>
              </div>
            
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="row row-cols-lg-4" >
          
          {product.map((item, index) => (
            <div className=" col cards2" key={index}>
              <div className="card " onClick={() => { setPostDetails(item); navigate('/view'); }}>
                <div className="image">
                  <div className="favorite">
                    <Heart />
                  </div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {item.price}</p>
                  <span className="category">{item.category}</span>
                  <p className="name">{item.name}</p>
                  <p className="description">
                    {item.description.trim().slice(0, 25)}...
                  </p>
                  <div className="date">{item.createdAt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Posts;
