import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./VideoList.css";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

const VideoItem: React.FC<{ video: Video }> = ({ video }) => {
  const [currentVideo, setCurrentVideo] = useState(video);
  const history = useHistory();

  const setVideo = async (videoId: string) => {
    const response = await axios.get(`http://127.0.0.1:3000/posts/${videoId}?email=${localStorage.getItem("email")}`);
    setCurrentVideo(response.data.data);
  };

  const handlePostAction = async (videoId: string, action: string) => {
    try {
      await axios.post(
        `http://127.0.0.1:3000/posts/${videoId}/${action}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setVideo(videoId);
    } catch (error: any) {
      switch (error.response.status) {
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

  const handleDeleteAction = async (videoId: string, action: string) => {
    try {
      await axios.delete(
        `http://127.0.0.1:3000/posts/${videoId}/${action}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setVideo(videoId);
    } catch (error: any) {
      switch (error.response.status) {
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

  const handleLike = (videoId: string) => {
    handlePostAction(videoId, "like");
  };

  const handleUnLike = (videoId: string) => {
    handleDeleteAction(videoId, "unlike");
  };

  const handleDislike = (videoId: string) => {
    handlePostAction(videoId, "dislike");
  };

  const handleUnDislike = (videoId: string) => {
    handleDeleteAction(videoId, "undislike");
  };

  return (
    <div
      key={currentVideo.id}
      className="mb-4 shadow p-4"
      style={{ borderRadius: "10px" }}
    >
      <Row>
        <Col md={7}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${currentVideo.video_id}`}
            title="YouTube Video"
            allowFullScreen
          ></iframe>
        </Col>
        <Col md={5}>
          <div className="d-flex flex-column justify-content-between h-100">
            <div>
              <h3>{currentVideo.title}</h3>
              <p>Shared by: {currentVideo.created_by}</p>
              <div>
                {currentVideo.liked ? (
                  <button
                    className="icon-button"
                    onClick={() => handleUnLike(currentVideo.id)}
                  >
                    {currentVideo.likes_count}
                    <AiFillLike className="like-icon" />
                  </button>
                ) : (
                  <button
                    className="icon-button"
                    onClick={() => handleLike(currentVideo.id)}
                  >
                    {currentVideo.likes_count}
                    <AiOutlineLike className="like-icon" />
                  </button>
                )}
                {currentVideo.disliked ? (
                  <button
                    className="icon-button"
                    onClick={() => handleUnDislike(currentVideo.id)}
                  >
                    {currentVideo.dislikes_count}
                    <AiFillDislike className="dislike-icon" />
                  </button>
                ) : (
                  <button
                    className="icon-button"
                    onClick={() => handleDislike(currentVideo.id)}
                  >
                    {currentVideo.dislikes_count}
                    <AiOutlineDislike className="dislike-icon" />
                  </button>
                )}
              </div>
              <br/>
              <p>Description: {currentVideo.description}</p>
              <p>Created at: {currentVideo.created_at}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VideoItem
