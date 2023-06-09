import React, { Fragment, useState } from "react";
import VideoForm from "./forms/VideoFrom";
import NavBar from "./NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import env from "../env";

interface VideoFormData {
  title: string;
  url: string;
  description: string;
}

const ShareVideoPage: React.FC = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const handleFormSubmit = async (formData: VideoFormData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${env.VITE_API_URL}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      history.push(`/video/${response.data.data.id}`);
    } catch (error: any) {
      switch (error.response.status){
        case 401: {
          localStorage.removeItem("access_token");
          localStorage.removeItem("email");
          history.push("/login");
          break;
        }
        default: {
          setError(error.response.data.error.messages.join(". "));
        }
      }
    }
  };

  return (
    <Fragment>
      <NavBar/>
      <h1 className="text-center" >Share a youtube video</h1>
      <VideoForm onSubmit={handleFormSubmit} error={error}/>
    </Fragment>
  );
};

export default ShareVideoPage;
