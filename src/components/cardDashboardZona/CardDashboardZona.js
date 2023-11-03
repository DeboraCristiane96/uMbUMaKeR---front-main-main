/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight,faUsers } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const rows = props.zonas.map((zona) => {
    return (
      <div className="cardZona">
        <Card>
          <div className="left">
            <div className="lbNome">
              <p>{zona.nome}</p>
            </div>
          </div>
          <FontAwesomeIcon className="icone" icon={faUsers} />
            <div className="lbPessoas">
              <p>{zona.qtdPessoas} Pessoas</p>
            </div>
           <div className="lbStatus">
              <p>{zona.status}</p>
            </div>
          <div className="card-butons">
          <Button
              className="bt"
              onClick={(e) => props.Dialog(zona)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              severity="warning"
              aria-label="Deletar"
            > 
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </Card>
        </div>
    );
  });

  return <div>{rows}</div>;
};