
/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardLocalStorage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.local.map((local) => {
    return (
      <div className="cardLocal">
        <Card>
          <div className="armario">
              <h2>Armário</h2>
              <p id="code">{local.codigoArmario}</p>
          </div>
          <div className="nicho">
              <h2>Nicho</h2>
              <p id="code">{local.codigoNicho}</p>
          </div>
          <div className="card-butons">

          <Button
              className="bt"
              onClick={(e) => props.delete(local.codigo)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              aria-label="Deletar"
            > 
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
