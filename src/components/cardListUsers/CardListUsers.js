/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardListUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.associates.map((associate) => {

    return (
      <div className="card">
        <Card>
          <div className="left">
            <div className="divNome">
              <label className="lbNome">Nome</label>
              <p> {associate.contaAcesso.nome}</p>
            </div>
            <div className="divEmail">
              <label className="lbEmail">Email</label>
              <p>{associate.contaAcesso.email}</p>
            </div>
            <div className="divTelefone">
              <label className="lbTel">Telefone</label>
              <p>{associate.contaAcesso.telefone}</p>
            </div>
            <div className="divLinkWhatsapp">
              <label className="lbWht">Link Whatsapp</label>
              <p>{associate.contaAcesso.linkWhatsapp}</p>
            </div>
            <div className="divQrCode">
              <label className="lbQr">QrCode</label>
              <p>QrCode</p>
            </div>
          </div>

          <div className="card-butons">
            <Button
              className="bt"
              onClick={(e) => props.editar(associate.contaAcesso.id)}
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
              onClick={(e) => props.delete(associate.contaAcesso.id)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              severity="warning"
              aria-label="Deletar"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
