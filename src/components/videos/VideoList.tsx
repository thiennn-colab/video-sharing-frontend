import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

interface Video {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "07Ezo3tWJpc",
      title: "Video 1",
      description: "Description for Video 1",
      createdBy: "User 1",
      createdAt: "2022-01-01",
      likes: 10,
      dislikes: 2,
    },
    {
      id: "9rNxwnnSMYg",
      title: "Video 2",
      description: "Description for Video 2",
      createdBy: "User 2",
      createdAt: "2022-02-01",
      likes: 5,
      dislikes: 1,
    },
    // Add more videos as needed
  ]);

  const videosPerPage = 1;
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

  const handleLike = (videoId: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const handleDislike = (videoId: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? { ...video, dislikes: video.dislikes + 1 }
          : video
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredVideos = currentVideos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideos = [...filteredVideos].sort((a, b) =>
    sortOrder === "asc"
      ? a.createdAt.localeCompare(b.createdAt)
      : b.createdAt.localeCompare(a.createdAt)
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
            <div key={video.id} className="mb-4">
              <Row>
                <Col md={7}>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title="YouTube Video"
                    allowFullScreen
                  ></iframe>
                </Col>
                <Col md={5}>
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                      <h3>{video.title}</h3>
                      <p>Description: {video.description}</p>
                      <p>Created by: {video.createdBy}</p>
                      <p>Created at: {video.createdAt}</p>
                    </div>
                    <div>
                      <p>Likes: {video.likes}</p>
                      <p>Dislikes: {video.dislikes}</p>
                      <Button
                        variant="primary"
                        onClick={() => handleLike(video.id)}
                      >
                        Like
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDislike(video.id)}
                      >
                        Dislike
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
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
