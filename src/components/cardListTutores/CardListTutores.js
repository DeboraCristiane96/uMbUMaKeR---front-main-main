/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardListTutores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.tutoress.map((tutores) => {

    return (
      <div className="card01">
        <Card>
          <div className="left">
            <div className="divEmail">
              <label className="lbEmail">Nome</label>
              <p>{tutores.contaAcesso.nome}</p>
            </div>
            <div className="divEmail">
              <label className="lbEmail">Email</label>
              <p>{tutores.contaAcesso.email}</p>
            </div>
            <div className="divTelefone">
              <label className="lbTel">Telefone</label>
              <p>{tutores.contaAcesso.telefone}</p>
            </div>
            <div className="divLinkWhatsapp">
              <label className="lbWht">Link Whatsapp</label>
              <p>{tutores.contaAcesso.linkWhatsapp}</p>
            </div>
            <div className="divQrCode">
              <label className="lbQr">QrCode</label>
              <p>{tutores.contaAcesso.idContaAcesso}</p>
            </div>
          </div>

          <div className="card-butons">
            <Button
              className="bt"
              onClick={(e) => props.editar(associate.contaAcesso.idContaAcesso)}
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
              onClick={(e) => props.delete(associate.contaAcesso.idContaAcesso)}
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
