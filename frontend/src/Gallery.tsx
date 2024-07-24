// src/Gallery.tsx
import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
import { Image, Row, Col } from "react-bootstrap";
import Layout from "./Layout";
>>>>>>> 838fd7f113493df8620f17cab2e22852b5429009

const Gallery = () => {
  const [photos, setPhotos] = useState<{ id: string; path: string }[]>([]);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get<{ id: string; path: string }[]>(
        "/api/photo"
      );
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Layout>
      <h3 className="mb-4">Gallery</h3>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} xs={12} md={4} lg={3} className="mb-4">
            <Image
              crossOrigin="anonymous"
              src={`/api/${photo.path}`}
              alt={`Image ${photo.id}`}
              thumbnail
              className="w-100"
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Gallery;
