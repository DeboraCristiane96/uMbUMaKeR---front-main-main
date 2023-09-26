/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardListInsumos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import { faRotate} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.insumos.map((insumo) => {

    return (
      <div className="card01">
        <Card>
          <div className="left">
            <div className="nome">
              <p>{insumo.nome}</p>
              <FontAwesomeIcon icon={faTrashCanArrowUp} style={{color: "#d81313",}} />
            </div>
            
            <div className="p02">
              <p>{10} {insumo.unidadeMedida} / {insumo.quantidadeDiasAlertaVencimento} Dias</p>
            </div>
            
            <div className="lb">
              <p>{insumo.quantidadeTotal} {insumo.unidadeMedida}</p>
              <FontAwesomeIcon icon={faCaretSquareUp } style={{color: "#1f5122",}} />
            </div>

            <div className="p03">
              <p>{(insumo.quantidadeTotal * insumo.quantidadeMinimaEstoque) / 100} % </p>
            </div>
          </div>

          <div className="card-butons">

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
                <a href="/entradaSaidaInsumos">
                  <Button className="bt" aria-label="atualizar" severity="warning" raised title="Mostra Entrada e Saida"> 
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
