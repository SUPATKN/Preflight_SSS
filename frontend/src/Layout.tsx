import React from "react";
import NavBar from "./Navbar";
import { Container } from "react-bootstrap";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Container className="my-4">{children}</Container>
    </div>
  );
};

export default Layout;
