import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import {
  Form,
  Container,
  InputGroup,
  Col,
  Button,
  Card,
  Spinner,
  Row,
} from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Notificacion from "./util/Notificacion";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const LoginCandidato = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [showNotificacionError, setShowNotificacionError] = useState(false);

  const handleSubmit = async (values) => {
    const respuesta = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/login`,
      {
        method: "POST",
        body: JSON.stringify(values),
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const respuestaJson = await respuesta.json();
    console.log(respuestaJson);
    if (respuestaJson.status === "success") {
      auth.login(respuestaJson.data);
      history.push("/candidato/" + respuestaJson.data._id);
    } else {
      setShowNotificacionError(respuestaJson.mensaje);
      setTimeout(() => setShowNotificacionError(false), 2000);
    }
  };

  return (
    <Row className=" justify-content-center ">
      <Col md={6}>
        <Card className="p-4 mt-4 mb-4 justify-content-md-center">
          <Card.Title>Accede como candidat@</Card.Title>
          <Row>
            <Col>
              <Formik
                className="mt-4"
                initialValues={{ email: "", password: "" }}
                enableReinitialize
                validationSchema={schema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(values);
                    }}
                  >
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Label>
                      <Card.Link href="/">
                        ¿Has olvidado tu contraseña? Pulsa aquí para restaurarla
                      </Card.Link>
                    </Form.Label>
                    <Form.Row>
                      <Notificacion
                        show={showNotificacionError}
                        variant="danger"
                        mensaje="Candidato no registrado. Si lo desea puede crear un cuenta"
                      />
                    </Form.Row>

                    <Button className="mr-5 mt-4" type="submit">
                      Entrar
                    </Button>
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={() => history.push("/signup")}
                    >
                      Crear cuenta
                    </Button>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginCandidato;
