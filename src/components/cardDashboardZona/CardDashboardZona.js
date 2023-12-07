/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardDashboardZona.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const rows = props.agendamantoZona.map((agendamantoZona) => {
    return (
      <div className="cardBoard">
        <Card>
          <div className="quadro">
            <div className="left">
              <div className="lbNome">
                <p>{agendamantoZona.descricao}</p>
              </div>
              <div className="lbPessoa">
                <span className="pi pi-user"
                  style={{ fontSize: '1.50rem', color: 'green', margin:'1rem' }}></span>
                nome da pessoa
                <p>{agendamantoZona.nome}</p>
              </div>
              <div className="lbHorario">
                <p>{agendamantoZona.horaInicial}</p> - <p>{agendamantoZona.horaFinal}</p>
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