import { useState } from "react";
import { Modal, Tab, Nav } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ show, handleClose }) => {
  const [activeKey, setActiveKey] = useState("login");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="position-relative">

        <button
          type="button"
          className="btn-close position-absolute"
          style={{ top: "10px", right: "15px" }}
          onClick={handleClose}
        />

        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Nav variant="tabs" className="mb-3 my-3">
            <Nav.Item>
              <Nav.Link eventKey="login">LOGIN</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register">REGISTER</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login switchToRegister={() => setActiveKey("register")} />
            </Tab.Pane>

            <Tab.Pane eventKey="register">
              <Register switchToLogin={() => setActiveKey("login")} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
