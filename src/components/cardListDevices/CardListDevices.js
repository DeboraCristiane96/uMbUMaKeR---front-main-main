/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { Image } from 'primereact/image';

        
import "./CardListDevices.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.devices.map((device) => {
    return (
      <div className="card">
        <Card>
          <div className="left">
            <div className="divImg">
              <Image src="/imgsTest/impressora3d.png" alt="Image" width="80" height="60" />
            </div>
            <div className="divModelo">
              <p>{device.modelo}</p>
            </div>
            <div className="divTipo">
              <p>{device.tipo}</p>
            </div>
          </div>
          <div className="card-butons">
            <Button
              className="bt"
              onClick={(e) => props.detalhes(device.deviceId)}
              style={{ color: "#0b6429" }}
              title="Detalhes"
              severity="warning"
              aria-label="Detalhes"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>

            <Button
              className="bt"
              onClick={(e) => props.editar(device.deviceId)}
              title="Editar"
              severity="warning"
              aria-label="Editar"
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#0b6429" }}
              />
            </Button>

            <Button
              className="bt"
              onClick={(e) => props.delete(device.deviceId)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              severity="warning"
              aria-label="Deletar"
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#1d8729" }} />
            </Button>
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
