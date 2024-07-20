import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState([]);

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
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("File uploaded successfully!");
      fetchImages(); // Fetch images after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const handleDelete = async (filename: any) => {
    try {
      await axios.delete(`/api/photo/${filename}`);
      alert("File deleted successfully!");
      fetchImages(); // Fetch images after successful deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("/api/photo");
      setPhoto(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  console.log({ photo });
  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <h3>Uploaded Images</h3>
        {photo.map((photo: any) => (
          <div key={photo.id}>
            <img
              crossOrigin="anonymous"
              src={`/api/${photo.path}`}
              // alt={`Image ${photo.id}`}
              width="200"
            />
            <button onClick={() => handleDelete(photo.path.split("/").pop())}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
