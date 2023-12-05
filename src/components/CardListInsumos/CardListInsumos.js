
/* eslint-disable no-undef */
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CardListInsumos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import { faRotate} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt, faPenToSquare, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.insumos.map((insumos) => {
    return (
      <div className="card01">
        <Card>
          <div className="nomeZona">
              <p>{insumos.nome}</p>
          </div>
            <div className="qntTotal">
              <p>{insumos.quantidadeTotal} {insumos.unidadeMedida}</p>
            </div>
              <div className="porcento">
                  <p>{(insumos.quantidadeMinimaEstoque * insumos.quantidadeTotal) / 100} % </p>
              </div>
              <div className="icon01">
                <FontAwesomeIcon  icon={faCaretSquareUp} style={{color: "#1f5122",}} /> 
              </div>
              
            <div className="dias">
              <p>{insumos.quantidadeDiasAlertaVencimento} Dias</p>
            </div>
            <div className="icon02">
              <FontAwesomeIcon icon={faTrashCanArrowUp} />
            </div>
          <div className="card-butons">

          <Button
              className="bt"
              onClick={(e) => props.delete(insumos.codigo)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              aria-label="Deletar"
            > 
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Button
              className="bt"
              onClick={(e) => props.editar(insumos.codigo)}
              title="Editar"
              aria-label="Editar">
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#0b6429" }}/>
              
            </Button>
            <div>
             <a href="/localStorage">
             <Button className="bt" aria-label="atualizar"  title="Amários e Nichos"> 
              <FontAwesomeIcon icon={faBoxesStacked} style={{color: "#306f2f",}} />
              </Button>
              </a>
            </div>  
            <div>
                <a href="/EntradaSaidaInsumo">
                  <Button className="bt" aria-label="atualizar" title="Mostra Entrada e Saida"> 
                    <FontAwesomeIcon icon={faRotate} style={{color: "#20511f"}} />
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
