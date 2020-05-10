import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import {
  Badge,
  Container,
  InputGroup,
  Col,
  Button,
  Card,
  OverlayTrigger,
  Tooltip,
  Row,
} from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Reunion from "../assets/img/reunion.png";

const LoginCandidato = () => {
  return (
    <Container className="p-0">
      <Row className="justify-content-center p-0">
        <Col md={12} sm={12} className="p-0">
          <Card style={{ border: "none" }}>
            <Card.Img md={12} src={Reunion} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>
                {" "}
                ¡Escríbenos!
                <Button
                  as="a"
                  href={"mailto:info@weintech"}
                  variant="secondary"
                  className="ml-2"
                >
                  contacta@weintech.com
                </Button>
              </Card.Title>
              <Card.Text></Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginCandidato;
