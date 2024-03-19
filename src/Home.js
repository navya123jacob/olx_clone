import React from 'react';
import Header from './Components/HeaderandFooter/Header';
import Banner from './Components/Home/Banner';
import Posts from './Components/Home/Posts';
import Footer from './Components/HeaderandFooter/Footer';


function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header></Header>
      <Banner></Banner>
      <Posts></Posts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
 
