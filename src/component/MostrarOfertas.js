import React from "react";
import Oferta from "./Oferta";
import styles from "./MostrarOfertas.css";

const MostrarOfertas = (props) => {
  return (
    <div className="col s12">
      <div className={styles.MostrarOfertas}>
        {props.ofertas.map((oferta) => {
          return (
            <Oferta
              oferta={oferta}
              deleteOferta={props.deleteOferta}
              editOferta={props.editOferta}
              key={oferta._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MostrarOfertas;
