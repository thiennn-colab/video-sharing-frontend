import React, { Fragment } from "react";
import NavBar from "./NavBar";
import VideoList from "./videos/VideoList";

const HomePage: React.FC = () => {
  

  return (
    <Fragment>
      <NavBar/>
      <div className="container">
        <h1 className="text-center" >Enjoy our funny videos</h1>
        <VideoList/>
      </div>
    </Fragment>
  );
};

export default HomePage;
