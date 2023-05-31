import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./VideoFrom.css";

interface VideoFormProps {
  onSubmit: (formData: VideoFormData) => void;
  error: string;
}

interface VideoFormData {
  title: string;
  url: string;
  description: string;
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    url: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      url: "",
      description: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="video-form shadow-sm">
      <Form.Group controlId="title">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group controlId="url">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Enter URL"
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </Form.Group>

      <br />
      <Button className="btn-light" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default VideoForm;
