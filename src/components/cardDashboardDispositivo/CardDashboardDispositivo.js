/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardDashboardDispositivo.css";
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
              <div className="lbPessoa">
                <span className="pi pi-user"
                  style={{ fontSize: '1.50rem', color: 'green', margin:'1rem' }}></span>
                nome da pessoa
                <p>{agenda.nome}</p>
              </div>
              <div className="lbNome"> inico - termino
                <p>{agenda.nome}</p>
              </div>
              <div className="lbNome"> Status
                <p>{agenda.nome}</p>
              </div>
            </div>
            <div className="btDetalhes">
              <Button
                className="bt"
                onClick={(e) => props.Dialog(zona)}
                style={{ color: "#0b6429", margin:'1rem' }}
                title="Deletar"
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