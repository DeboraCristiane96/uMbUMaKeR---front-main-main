
/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import "./CardListAgendamento.css";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.agenda.map((agenda) => {
    return (
      <div className="card01">
        <Card>
          <div className="left">
            <div className="nome">
              <p> Zona A {agenda.nome}</p>
            </div>
            <div className="hInicial">
              <p>10:00{agenda.horaInicial}</p>
            </div>
            <div className="hTermino">
              <p>11:00{agenda.horaTermino}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
