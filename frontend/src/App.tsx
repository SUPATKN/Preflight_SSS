import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully!");
      fetchImages(); // Fetch images after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <h3>Uploaded Images</h3>
        {images.map((image: any) => (
          <div key={image.id}>
            <img
              crossOrigin="anonymous"
              src={`http://localhost:3000${image.path}`}
              alt={`Image ${image.id}`}
              width="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
