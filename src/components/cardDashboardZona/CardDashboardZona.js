/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardDashboardZona.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight,faUser } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const rows = props.agenda.map((agenda) => {
    return (
      <div className="cardBoard">
        <Card>
          <div className="left">
            <div className="lbNome">
              <p>{agenda.nome}</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faUser} style={{color: "#256a31",}} />
            <div className="lbPessoas">
              <p>{agenda.nome}</p>
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