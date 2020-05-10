import React from "react";
import Candidato from "./Candidato";
import styles from "./MostrarOfertas.css";

const MostrarCandidatos = (props) => {
  return (
    <div className="col s12">
      <div className={styles.MostrarOfertas}>
        {props.candidatos.map((candidato) => {
          return <Candidato candidato={candidato} key={candidato._id} />;
        })}
      </div>
    </div>
  );
};

export default MostrarCandidatos;
