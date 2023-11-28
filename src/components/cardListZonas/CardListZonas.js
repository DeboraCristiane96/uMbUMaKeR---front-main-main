/* eslint-disable no-undef */
import React , { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from 'primereact/dialog';
import { faCalendarDay, faCubes} from "@fortawesome/free-solid-svg-icons";
import "./CardListZonas.css";
import { faTrashAlt, faPenToSquare,faUsers } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const [visible, setVisible] = useState(false);

  const rows = props.zonas.map((zonas) => {
    return (
      <div className="cardZona">
        <Card>
          <div className="left">
            <div className="lbNome">
              <p>{zonas.nome}</p>
            </div>
          </div>
          <FontAwesomeIcon className="icone" icon={faUsers} />
            <div className="lbPessoas">
              <p>{zonas.qtdPessoas} Pessoas</p>
            </div>
           <div className="lbStatus">
              <p>{zonas.status}</p>
            </div>
          <div className="card-butons">
          <Button
              className="bt"
              onClick={(e) => props.delete(zonas.codigo)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              aria-label="Deletar"
            > 
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Button
              className="bt"
              style={{ color: '#0c9213' }}
              title="Editar"
              aria-label="Editar" onClick={() => setVisible(true)} ><FontAwesomeIcon icon={faPenToSquare} /> </Button>
              <Dialog header={zonas.nome} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <Card>

                </Card>
                         
          
              </Dialog>

            <Button
              className="bt"
              style={{ color: '#0c9213' }}
              title="Dispositivos"
              aria-label="Dispositivos" onClick={() => setVisible(true)} ><FontAwesomeIcon icon={faCubes} /> </Button>
              <Dialog header={zonas.nome} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <Card>
                  
                </Card>
                         
          
              </Dialog>
              <a href="/listAgendamento">
                <Button
                className="bt"
                style={{ color: '#0c9213' }}
                title="Agendamento"
                aria-label="Agendamento" ><FontAwesomeIcon icon={faCalendarDay} /> </Button>
              </a>
          </div>
        </Card>
        </div>
    );
  });

  return <div>{rows}</div>;
};