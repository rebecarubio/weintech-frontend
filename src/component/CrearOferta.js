import React, { Component, useState, Link, useContext, useEffect } from "react";
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
  titulo: yup.string().required(),
  descripcion: yup.string().required(),
  puesto: yup.string().required(),
  salario: yup.number().required(),
  provincia: yup.string().required(),
  sector: yup.string().required(),
  //candidatos
  //empresa
});

const CrearOferta = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { empresaId, ofertaId } = useParams();
  const [oferta, setOferta] = useState(
    props.oferta || {
      titulo: "",
      descripcion: "",
      puesto: "",
      salario: "",
      provincia: "",
      sector: "",
    }
  );

  const [showNotificacion, setShowNotificacion] = useState(false);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("descripcion", values.descripcion);
    formData.append("puesto", values.puesto);
    formData.append("salario", values.salario);
    formData.append("provincia", values.provincia);
    formData.append("sector", values.sector);
    formData.append("empresa", auth.userId);

    const respuesta = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta${
        props.oferta ? `/${props.oferta._id}` : ""
      }`,
      {
        method: props.oferta ? "PATCH" : "POST",
        body: formData,
        credentials: "include",
        mode: "cors",
      }
    );
    const respuestaJson = await respuesta.json();

    if (respuestaJson.status === "success") {
      console.log(respuestaJson);
      setShowNotificacion({
        mensaje: respuestaJson.mensaje,
        variant: "success",
      });
      setTimeout(() => setShowNotificacion(false), 2000);
      console.log(respuestaJson.mensaje);
      //history.push("/candidato/" + respuestaJson.data._id);
    } else {
      //notificacion
      setShowNotificacion({
        mensaje: respuestaJson.mensaje,
        variant: "danger",
      });

      setTimeout(() => setShowNotificacion(false), 2000);
      console.log(respuestaJson.mensaje);
    }
  };

  return (
    <>
      <Row className="mb-2 justify-content-center ">
        <Col md={6}>
          <Card fluid className="p-4 mt-4 justify-content-center ">
            <Card.Title>
              {!props.oferta ? "Crea una nueva oferta" : "Editar Oferta"}
            </Card.Title>
            <Row>
              <Col>
                <Formik
                  className="mt-4"
                  enableReinitialize
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                  initialValues={oferta}
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
                          <Form.Label>Titulo Oferta</Form.Label>
                          <Form.Control
                            type="text"
                            name="titulo"
                            placeholder="titulo"
                            value={values.titulo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.titulo && !errors.titulo}
                            isInvalid={touched.titulo && errors.titulo}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.titulo}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="validationFormikName">
                          <Form.Label>Puesto</Form.Label>
                          <Form.Control
                            type="text"
                            name="puesto"
                            placeholder="Puesto"
                            value={values.puesto}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.puesto && !errors.puesto}
                            isInvalid={touched.puesto && errors.puesto}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.puesto}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="validationFormikName">
                          <Form.Label>Descripción</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            name="descripcion"
                            placeholder="descripcion"
                            value={values.descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.descripcion && !errors.descripcion}
                            isInvalid={
                              touched.descripcion && errors.descripcion
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.descripcion}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="validationFormikName">
                          <Form.Label>Salario</Form.Label>
                          <Form.Control
                            type="text"
                            name="salario"
                            placeholder="Salario"
                            value={values.salario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.salario && !errors.salario}
                            isInvalid={touched.salario && errors.salario}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.salario}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="validationFormikName">
                          <Form.Label>Provincia</Form.Label>
                          <Form.Control
                            as="select"
                            name="provincia"
                            value={values.provincia}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.provincia && !errors.provincia}
                            isInvalid={touched.provincia && errors.provincia}
                          >
                            <option>A Coruña</option>
                            <option>Albacete</option>
                            <option>Álava</option>
                            <option>Alicante</option>
                            <option>Almería</option>
                            <option>Asturias</option>
                            <option>Ávila</option>
                            <option>Badajoz</option>
                            <option>Baleares</option>
                            <option>Barcelona</option>
                            <option>Burgos</option>
                            <option>Cáceres</option>
                            <option>Cádiz</option>
                            <option>Cantabria</option>
                            <option>Castellón</option>
                            <option>Ciudad Real</option>
                            <option>Córdoba</option>
                            <option>Cuenca</option>
                            <option>Girona</option>
                            <option>Granada</option>
                            <option>Guadalajara</option>
                            <option>Gipuzkoa</option>
                            <option>Huelva</option>
                            <option>Huesca</option>
                            <option>Jaén</option>
                            <option>La Rioja</option>
                            <option>Las Palmas</option>
                            <option>León</option>
                            <option>Lérida</option>
                            <option>Lugo</option>
                            <option>Madrid</option>
                            <option>Málaga</option>
                            <option>Murcia</option>
                            <option>Navarra</option>
                            <option>Ourense</option>
                            <option>Palencia</option>
                            <option>Pontevedra</option>
                            <option>Salamanca</option>
                            <option>Segovia</option>
                            <option>Sevilla</option>
                            <option>Soria</option>
                            <option>Tarragona</option>
                            <option>Santa Cruz de Tenerife</option>
                            <option>Teruel</option>
                            <option>Toledo</option>
                            <option>Valencia</option>
                            <option>Valladolid</option>
                            <option>Vizcaya</option>
                            <option>Zamora</option>
                            <option>Zaragoza</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                          {errors.provincia}
                        </Form.Control.Feedback>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="validationFormikName">
                          <Form.Label>Sector</Form.Label>
                          <Form.Control
                            as="select"
                            name="sector"
                            placeholder="Sector"
                            value={values.sector}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.sector && !errors.sector}
                            isInvalid={touched.sector && errors.sector}
                          >
                            <option>Administrador</option>
                            <option>Administrativo</option>
                            <option>Analista</option>
                            <option>Analista Programador</option>
                            <option>Arquitecto TIC</option>
                            <option>Auditor</option>
                            <option>Big Data</option>
                            <option>Ciberseguridad</option>
                            <option>Comercial</option>
                            <option>Consultor</option>
                            <option>Desarrollador Móvil</option>
                            <option>Desarrollador Web</option>
                            <option>DevOps</option>
                            <option>Diseño</option>
                            <option>Electrónica</option>
                            <option>Formador</option>
                            <option>Helpdesk</option>
                            <option>I+D</option>
                            <option>Jefe de Equipo</option>
                            <option>Jefe de Proyecto</option>
                            <option>Marketing</option>
                            <option>Migración de Datos</option>
                            <option>Operador</option>
                            <option>Programador</option>
                            <option>Reclutador</option>
                            <option>Redes</option>
                            <option>Responsable de Producto</option>
                            <option>SEO/Posicionamiento Web</option>
                            <option>Sistemas de Calidad</option>
                            <option>Soporte Técnico</option>
                            <option>Tester</option>
                            <option>Técnico de Bases de Datos</option>
                            <option>Técnico de Gestión</option>
                            <option>Técnico de Mantenimiento</option>
                            <option>Técnico de Sistemas</option>
                            <option>Técnico Hardware</option>
                            <option>Técnico Software</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.sector}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Group>
                        {" "}
                        {!props.oferta
                          ? `Al hacer clic en «Aceptar y crear», aceptas las
                        Condiciones de uso, la Política de privacidad y la
                        Política de cookies de WeInTech.`
                          : " "}
                      </Form.Group>
                      <Form.Row className="justify-content-center">
                        <Notificacion
                          show={showNotificacion}
                          variant={showNotificacion.variant}
                          mensaje={showNotificacion.mensaje}
                        />
                      </Form.Row>
                      <Row className="justify-content-center">
                        <Button className="mr-5 mt-4" type="submit">
                          {!props.oferta ? "Aceptar y crear" : "Actualizar"}
                        </Button>
                        <Button
                          variant="secondary"
                          className="mt-4"
                          onClick={() => {
                            if (props.setOfertaEditar) {
                              props.setOfertaEditar();
                            } else {
                              history.push("/empresa/" + empresaId);
                            }
                          }}
                        >
                          Volver
                        </Button>
                      </Row>
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

export default CrearOferta;
