/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardListUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
function CardListUser (props) {
  const rows = props.contasAcesso.map((contasAcesso) => {

    return (
      <div className="card01">
        <Card>
          <div className="left">
            <div className="divEmail">
              <label className="lbEmail">Nome</label>
              <p>{contasAcesso.nome}</p>
            </div>
            <div className="divEmail">
              <label className="lbEmail">Email</label>
              <p>{contasAcesso.email}</p>
            </div>
            <div className="divTelefone">
              <label className="lbTel">Telefone</label>
              <p>{contasAcesso.telefone}</p>
            </div>
            <div className="divLinkWhatsapp">
              <label className="lbWht">Link Whatsapp</label>
              <p>{contasAcesso.linkWhatsapp}</p>
            </div>
            <div className="divQrCode">
              <label className="lbQr">QrCode</label>
              <p>{contasAcesso.qrcode}</p>
            </div>
          </div>

          <div className="card-butons">
            <Button
              className="bt"
              onClick={(e) => props.editar(contaAcesso.idContaAcesso)}
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
              onClick={(e) => props.delete(contaAcesso.idContaAcesso)}
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

export default CardListUser;
