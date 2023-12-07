
/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardLocalStorage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.local.map((local) => {
    return (
      <Card>
        <div className="cardLocal">
          <table className="table">
            <thead>
              <tr className="tr">
                <th className="th"> ARMÁRIO</th>
                <th className="th"> NICHO</th>
                <th className="th">  </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td className="td">{local.codigoArmario}</td>
                <td className="td">{local.codigoNicho}</td>
                <td className="td">
                  <div className="card-butons">
                    <Button
                      className="bt"
                      onClick={(e) => props.delete(local.codigoArmario)}
                      style={{ color: "#0b6429", margin: "6px" }}
                      title="Deletar"
                      aria-label="Deletar"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    );
  });

  return <div>{rows}</div>;
};
