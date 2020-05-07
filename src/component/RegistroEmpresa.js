import React, { Component, useState, Link, useContext } from "react";
import Notificacion from "./util/Notificacion";
import { AuthContext } from "../context/auth-context";
import {
  Form,
  InputGroup,
  Col,
  Button,
  Card,
  Spinner,
  Row,
} from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  nombre: yup.string().required(),
  sector: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const RegistroEmpresa = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [empresa, setEmpresa] = useState({
    nombre: "",
    sector: "",
    email: "",
    password: "",
  });

  const [showNotificacionError, setShowNotificacionError] = useState(false);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("sector", values.sector);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const respuesta = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/signupempresa`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    const respuestaJson = await respuesta.json();

    if (respuestaJson.status === "success") {
      console.log(respuestaJson);
      history.push("/empresa/" + respuestaJson.data._id);
    } else {
      //notificacion
      setShowNotificacionError(respuestaJson.mensaje);
      setTimeout(() => setShowNotificacionError(false), 2000);
      console.log(respuestaJson.mensaje);
    }
  };

  return (
    <>
      <Row className=" justify-content-center ">
        <Col md={6}>
          <Card className="p-4 mt-4 justify-content-center ">
            <Card.Title>Registrate como empresa</Card.Title>
            <Row className="justify-content-center">
              <Col>
                <Formik
                  className="mt-4"
                  enableReinitialize
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                  initialValues={{
                    nombre: "",
                    sector: "",
                    email: "",
                    password: "",
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
                          <Form.Label>Nombre Empresa</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.nombre && !errors.nombre}
                            isInvalid={touched.nombre && errors.nombre}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="validationFormikName">
                          <Form.Label>Sector</Form.Label>
                          <Form.Control
                            type="text"
                            name="sector"
                            placeholder="Sector"
                            value={values.sector}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.sector && !errors.sector}
                            isInvalid={touched.sector && errors.sector}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.sector}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
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
                            type="text"
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
                      <Form.Group>
                        Al hacer clic en «Aceptar y unirte», aceptas las
                        Condiciones de uso, la Política de privacidad y la
                        Política de cookies de WeInTech.
                      </Form.Group>
                      <Form.Row>
                        <Notificacion
                          show={showNotificacionError}
                          variant="danger"
                          mensaje="Empresa no válida"
                        />
                      </Form.Row>
                      <Button className="mr-5 mt-4" type="submit">
                        Aceptar y unirse
                      </Button>
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={() => history.push("/")}
                      >
                        Back to home
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RegistroEmpresa;
