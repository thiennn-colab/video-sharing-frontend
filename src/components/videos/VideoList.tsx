import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./VideoList.css"
import VideoItem from "./VideoItem";
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

const VideoList:React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch videos from API
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/posts?email=${localStorage.getItem("email")}`,);
      const data = await response.data;
      setVideos(data.data);
      console.log(data.data)
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

  const videosPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredVideos = currentVideos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideos = [...filteredVideos].sort((a, b) =>
    sortOrder === "asc"
      ? a.created_at.localeCompare(b.created_at)
      : b.created_at.localeCompare(a.created_at)
  );

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search videos"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              as="select"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="asc">Sort Ascending</option>
              <option value="desc">Sort Descending</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {sortedVideos.map((video) => (
            <VideoItem video={video} key={video.id}/>
          ))}
        </Col>
      </Row>
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col>
            <div className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index + 1}
                  variant="secondary"
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VideoList;
