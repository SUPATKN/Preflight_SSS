import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/aos/aos.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/main.css";
import "react";
import { Form, Button, Image, Row, Col, Alert } from "react-bootstrap";
import { ChangeEvent } from "react";
export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [photos, setPhotos] = useState<{ id: string; path: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("File Uploaded Successfully 📂");
      fetchImages(); // Fetch images after successful upload
      setSelectedImage(""); // Clear the preview after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file.");
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      await axios.delete(`/api/photo/${filename}`);
      setSuccess("File Deleted 🗑️");
      fetchImages(); // Fetch images after successful deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file.");
    }
  };

  const fetchImages = async () => {
    try {
      const { data } = await axios.get<{ id: string; path: string }[]>(
        "/api/photo"
      );
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
    if (error) {
      setTimeout(() => setError(""), 2000); // ตั้งค่า error เป็น null หลังจาก 2 วินาที
    }

    if (success) {
      setTimeout(() => setSuccess(""), 2000); // ตั้งค่า success เป็น null หลังจาก 2 วินาที
    }
  }, [error, success]);

  return (
    <body id="body">
      {/* ========== HEADER SECTIONS ========= */}
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            <h1 className="sitename">IM UPLOA◥</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#body" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#instructor">Instructor</a>
              </li>
              <li className="dropdown">
                <a href="#creator">
                  <span>Creator</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <a href="#creator1">Supatkorn Pundontong</a>
                  </li>
                  <li>
                    <a href="#creator2">Suphakorn Komod </a>
                  </li>
                  <li>
                    <a href="#creator3">Sippakorn Kammesawang</a>
                  </li>
                </ul>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href="#body">
            Start upload
          </a>
        </div>
      </header>

      {/* ========== MAIN SECTIONS ========= */}
      <div id="main">
        {/* ----- UPLOAD IMAGE SECTIONS ----- */}
        <div id="hero" className="container-fluid hero section dark-background">
          <div className="container-xl">
            <div className="row gy-4">
              <div className="input-img col-lg p-3">
                <div className="choose-file">
                  <div className="choose-file-in">
                    <input type="file" onChange={handleFileChange} />
                    <button className="Bt" onClick={handleUpload}>
                      <h5>
                        Upload<i className="bi bi-upload"></i>
                      </h5>
                    </button>
                  </div>
                </div>
                <div className="show-img">
                  {selectedImage && (
                    <div className="mb-3">
                      <h3 className="upload">◣ Image Preview ◥ </h3>
                      <Image
                        src={selectedImage}
                        alt="Selected Image"
                        width="1300"
                        thumbnail
                      />
                    </div>
                  )}
                  {error && (
                    <Alert variant="danger" className="alertA mt-3">
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert variant="success" className="alertA mt-3">
                      {success}
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----- GALLERY SECTIONS ----- */}
        <div id="gallery" className="container-fluid portfolio section">
          <div className="container-xl section-title">
            <h2 className="Gallery-Creator-h">◣ Gallery ◥</h2>
            {error && (
              <Alert variant="danger" className="alertA mt-3">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="alertA mt-3">
                {success}
              </Alert>
            )}
            <div className="gall-nav">
              <p className="instructor-p2">
                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                consectetur velit
              </p>
              <ul className="portfolio-filters isotope-filters ">
                <li data-filter="*" className="filter-active">
                  All
                </li>
                <li data-filter=".filter-app">App</li>
                <li data-filter=".filter-product">Card</li>
                <li data-filter=".filter-branding">Web</li>
              </ul>
            </div>
          </div>

          <div className="container-xl isotope-layout">
            <div className="col-lg-4 col-md-6  isotope-item filter-app Box-img-up">
              {photos.map((photo: any) => (
                <div key={photo.id} className="img-up">
                  <img
                    className="img-in"
                    crossOrigin="anonymous"
                    src={`/api/${photo.path}`}
                    alt={`Image ${photo.id}`}
                  />
                  <button
                    className=" portfolio-item"
                    onClick={() => handleDelete(photo.path.split("/").pop())}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----- INSTRUCTOR SECTIONS ----- */}
        <div
          id="instructor"
          className="container-fluid team section  dark-background"
        >
          <div className="container-xl section-title">
            <h2 className="instructor-h">◣ Instructor ◥</h2>
            <p className="instructor-p1">
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>
          <div className="container-xl">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://www.cpe.eng.cmu.ac.th/img/staff/Lecturer-20200626-135425.jpg"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4 className="">Dome Potikanond</h4>
                    <span>Instructor</span>
                    <div className="social-gmail">
                      <i className="bi bi-phone"></i> Phone
                      <a href=""> : (+66) 84-614000-6</a> <br />
                      E-mail :
                      <a
                        href="https://mail.google.com/mail/u/0/#search/dome.potikanond%40cmu.ac.th?compose=new"
                        target="blank"
                      >
                        {" "}
                        dome.potikanond@cmu.ac.th
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://ie.eng.cmu.ac.th/_next/image?url=https%3A%2F%2Fieadmin.eng.cmu.ac.th%2Fwp-content%2Fuploads%2F2023%2F06%2F22NR2x3-1.jpg&w=1920&q=75"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>Nirand Pasutha-Arnond</h4>
                    <span>Instructor</span>
                    <div className="social-gmail">
                      <i className="bi bi-phone"></i> Phone
                      <a href=""> : (+66) 53-944125-6</a> <br />
                      E-mail :
                      <a
                        href="https://mail.google.com/mail/u/0/#search/nirand.p%40cmu.ac.th?compose=new"
                        target="blank"
                      >
                        {" "}
                        nirand.p@cmu.ac.th{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----- CREATOR SECTIONS ----- */}
        <div id="creator" className="container-fluid team section">
          <div className="container-xl section-title">
            <h2 className="Gallery-Creator-h">◣ Creator ◥</h2>
            <p className="instructor-p2">
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>
          <div className="container-xl">
            <div className="row gy-4">
              <div className="col-lg-6" id="creator1">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-1/420437855_3485194231793237_8794574940016918394_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=lOLke01eS6UQ7kNvgFDVb-X&_nc_ht=scontent.fbkk10-1.fna&cb_e2o_trans=t&oh=00_AYATQvP9oY1jtevC5gcAT2UnlIs-FuBsksuGm_T5d4TB6w&oe=66A4FE4D"
                      className="img-fluid"
                      alt="d
                  "
                    />
                  </div>
                  <div className="member-info">
                    <h4>650610812 : Supatkorn Pundontong</h4>
                    <span>Back-End Developer</span>
                    <p>" The sun is gone , But I have a light "</p>
                    <div className="social">
                      <a href="https://www.facebook.com/supatkn" target="blank">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/supatkn/"
                        target="blank"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" id="creator2">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/451013551_3672165679763586_2555418548600731658_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fz8Eq75GUqsQ7kNvgHfWDAv&_nc_ht=scontent.fbkk10-1.fna&cb_e2o_trans=t&oh=00_AYCbGfa2L2otl0p50mTgd2xCa41F-KK6sv0zxynFAL9qFw&oe=66A4D585"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>650610811 : Suphakorn komod</h4>
                    <span>Front-End Developer</span>
                    <p>
                      " Discipline will set you free without discipline ,<br />
                      You will be a slave to your passion and passion "{" "}
                    </p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/Titanz7x/ "
                        target="blank"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/tit4nzx_/"
                        target="blank"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" id="creator3">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/402152918_666183875701423_8645251544534264005_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JuSG2mDkR00Q7kNvgE2uYZh&_nc_ht=scontent.fbkk10-1.fna&cb_e2o_trans=t&oh=00_AYC7kYOAwWQsstnAMtOJqQ-n89TI_bIpgxjphVtMHLMHwQ&oe=66A50893"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>650610813 : Sippakon Khammisawang</h4>
                    <span>Back-End Developer</span>
                    <p>" Old keys won’t Open new doors "</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/profile.php?id=100069294507230"
                        target="blank"
                      >
                        {" "}
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/tt_kmsw/"
                        target="blank"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== FOOTER SECTIONS ========= */}
      <div className="footer dark-background ">
        <div className="container-xl copyright text-center">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">IM UPLOA◥</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            Designed by <a href="">CPE GROUPE 5</a>
          </div>
        </div>
      </div>

      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <script src="./assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="./assets/vendor/php-email-form/validate.js"></script>
      <script src="./assets/vendor/aos/aos.js"></script>
      <script src="./assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="./assets/vendor/swiper/swiper-bundle.min.js"></script>
      <script src="./assets/vendor/waypoints/noframework.waypoints.js"></script>
      <script src="./assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
      <script src="./assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
      <script src="./assets/js/main.js"></script>
    </body>
  );
}
