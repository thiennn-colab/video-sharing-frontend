import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./NavBar";
import VideoItem from "./videos/VideoItem";
import axios from "axios";
import { Redirect, useHistory, useLocation } from "react-router-dom";

interface Video {
  id: string;
  video_id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  likes_count: number;
  dislikes_count: number;
  liked: boolean;
  disliked: boolean;
}

const VideoDetailPage: React.FC = () => {
  const [video, setVideo] = useState<Video>();
  const history = useHistory();
  const location = useLocation();
  const video_id = location.pathname.split("/").reverse()[0];
  useEffect(() => {
    // Fetch videos from API
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/posts/${video_id}?email=${localStorage.getItem("email")}`
      );
      const data = await response.data;
      setVideo(data.data);
      console.log(data.data);
    } catch (error: any) {
      history.push("/home");
    }
  };

  return video ? (
          <Fragment>
            <NavBar />
            <div className="container">
              <VideoItem video={video} key={video.id} />
            </div>
          </Fragment>
        ) : null
  ;
};

export default VideoDetailPage;
