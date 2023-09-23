/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay, faCubes} from "@fortawesome/free-solid-svg-icons";

import { faRotate} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.zona.map((zona) => {
    return (
      <div className="card">
        <Card>
          <div className="left">
            <div className="nome">
              <p>{zona.nome}</p>
              <FontAwesomeIcon icon={faTrashCanArrowUp} style={{color: "#d81313",}} />
            </div>
            
            <div className="lb">
              <p>{zona.qntPessoas}</p>
              
            </div>
            <div className="p03">
              <p>{insumo.qntporcento} %</p>
            </div>
            
          </div>

          <div className="card-butons">

            <Button>
                <FontAwesomeIcon icon={faCalendarDay} style={{color: "#2e511f",}} />
            </Button>
            <Button>
                 <FontAwesomeIcon icon={faCubes} style={{color: "#22511f",}} />
            </Button>
            <Button>
                <FontAwesomeIcon icon={faPenToSquare} style={{color: "#1f512b",}} />
            </Button>
          <Button
              className="bt"
              onClick={(e) => props.delete(insumo.id)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              severity="warning"
              aria-label="Deletar"
            > 
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Button
              className="bt"
              onClick={(e) => props.editar(insumo.id)}
              title="Editar"
              severity="warning"
              aria-label="Editar">

              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#0b6429" }}/>
            </Button>

            <div>
                <a href="/updateInsumos">
                  <Button className="bt" aria-label="atualizar" severity="warning" raised title="atualizar"> 
                    <FontAwesomeIcon icon={faRotate} style={{color: "#20511f",}} />
                  </Button>
                </a>
              </div>
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
