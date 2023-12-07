
/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import "./CardListAgendamento.css";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.agendamantoZona.map((agendamantoZona) => {
    return (
      <div className="card01">
        <Card>
          <div className="left">
          <div className="hInicial">
              <p>{agendamantoZona.horaInicial}</p> -
              <p>{agendamantoZona.horaFinal}</p>
            </div>
            <div className="nome">
              <p>{agendamantoZona.descricao}</p>
            </div>
            
            
           
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
