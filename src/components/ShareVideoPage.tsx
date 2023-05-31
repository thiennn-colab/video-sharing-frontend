import React, { Fragment } from "react";
import VideoForm from "./videos/VideoFrom";
import NavBar from "./NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface VideoFormData {
  title: string;
  url: string;
  description: string;
}

const ShareVideoPage: React.FC = () => {
  const history = useHistory();
  const handleFormSubmit = async (formData: VideoFormData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      history.push("/home");
    } catch (error: any) {
      switch (error.response.status){
        case 401: {
          localStorage.removeItem("access_token");
          localStorage.removeItem("email");
          history.push("login");
          break;
        }
        default: {
          console.log(error.response);
        }
      }
    }
  };

  return (
    <Fragment>
      <NavBar/>
      <div className="container">
        <div className="container">
          <h1 className="text-center" >Share a youtube video</h1>
          <VideoForm onSubmit={handleFormSubmit}/>
          </div>
      </div>
    </Fragment>
  );
};

export default ShareVideoPage;
