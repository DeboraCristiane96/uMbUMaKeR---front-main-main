/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardDashboardZona.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const rows = props.agenda.map((agenda) => {
    return (
      <div className="cardBoard">
        <Card>
          <div className="quadro">
            <div className="left">
              <div className="lbNome">nome do agendamento
                <p>{agenda.nome}</p>
              </div>
              <FontAwesomeIcon icon={faUser} style={{ color: "#256a31", }} />
              <div className="lbPessoas">nome da pessoa
                <p>{agenda.nome}</p>
              </div>
              <div className="lbNome"> inico - termino
                <p>{agenda.nome}</p>
              </div>
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
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};