/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCalendarDay, faCubes} from "@fortawesome/free-solid-svg-icons";
import "./CardZonas.css";
import { faTrashAlt, faPenToSquare,faUsers } from "@fortawesome/free-solid-svg-icons";
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
            <div className="icone">
              <FontAwesomeIcon icon={faUsers} style={{color: "#1f5122",}} />
            </div>
            <div className="lbPessoas">
              <p> {zona.qntPessoas} Pessoas</p>
            </div>
           <div className="lbStatus">
                  <p>{zona.status}</p>
            </div>
          </div>

          <div className="card-butons">
          <Button
              className="bt"
              onClick={(e) => props.delete(zona.id)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              severity="warning"
              aria-label="Deletar"
            > 
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <div>
                <a href="/updateZona">
                  <Button className="bt" aria-label="atualizar" severity="warning" raised title="atualizar"> 
                  <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0b6429" }}/>
                  </Button>
                </a>
              </div>
              <Button  className="bt">
                 <FontAwesomeIcon icon={faCubes} style={{color: "#22511f",}} />
            </Button>
              <Button  className="bt">
                <FontAwesomeIcon icon={faCalendarDay} style={{color: "#2e511f",}} />
            </Button>
           
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
