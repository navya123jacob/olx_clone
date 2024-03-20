import React from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import bannercopy from '../../assets/images/bannercopy.png';

function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
        <img src={bannercopy} alt="hghg" />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;

// To display images in your React application, you should import them into your component and use them as React components or specify their paths relative to your project's directory structure.