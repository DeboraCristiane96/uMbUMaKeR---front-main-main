/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "./UpdateInsumo.css";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import InsumoService from "../../services/InsumoService"
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/Toastr";

import MenuLeft from "../../components/Menu/MenuLeft";

export default class updateInsumo extends React.Component {
 state = {
      items: [
        { label: "Listagem", url: "/insumos" },
        { label: "Entrada / Saída" },
      ],
      home: { icon: "pi pi-home ", url: "/" },

      insumos: [
        {
         codigo:0,
         nome:"",
         quantidadeTotal:"",
         quantidadeMinimaEstoque:"",
         quantidadeDiasAlertaVencimento:"",
         unidadeMedida:"",
         statusEstoque:""
        },
      ],
      unidadeMedidaSelect: [
        { label: "UNIDADE", value: "UNIDADE" },
        { label: "LITRO", value: "LITRO" },
        { label: "METRO", value: "METRO" },
        { label: "KILO", value: "KILO" },
      ],
      unidadeMedida: "",


  }

constructor() {
  super();
  this.service = new InsumoService();
}

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  componentDidMount() {
    const url = window.location.href;
    const codigo = url.substring(url.lastIndexOf('/') + 1);
    this.findById(codigo);
  }
  
  findById = (codigo) => {
    this.service
      .find(codigo)
      .then((response) => {
        const insumo = response.data;
        const codigo = insumo.codigo;
        const nome = insumo.nome;
        const quantidadeMinimaEstoque = insumo.quantidadeMinimaEstoque;
        const quantidadeTotal = insumo.quantidadeTotal;
        const unidadeMedida = insumo.unidadeMedida;
        const statusEstoque = insumo.statusEstoque;

        this.setState({ codigo: codigo, nome: nome, quantidadeMinimaEstoque: quantidadeMinimaEstoque,quantidadeTotal:quantidadeTotal,unidadeMedida:unidadeMedida, statusEstoque:statusEstoque  });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

 
 
  confirm = async (codigo) => {
    this.setState({ codigo: codigo });
    // eslint-disable-next-line no-unused-vars
    const a = document.getElementsByClassName(
      "p-button p-component p-confirm-dialog-reject p-button-text"
    );
    confirmDialog({
      message: "Você Realmente quer Editar?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
    document.getElementsByClassName("p-button-label")[7].textContent = "Sim";
    document.getElementsByClassName("p-button-label")[6].textContent = "Não";
  };

  validate = () => {
    const errors = [];

    if (!this.state.nome) {
      errors.push("É obrigatório informar o nome do insumo!");
    }
    if (!this.state.quantidadeMinimaEstoque) {
      errors.push("É obrigatório informar a quantidade mínima do estoque!");
    }
    if (!this.state.quantidadeTotal) {
      errors.push("É obrigatório informar a quantidade total!");
    }
    if (!this.state.unidadeMedida) {
      errors.push("É obrigatório informar o nome do insumo!");
    }
    if (!this.state.quantidadeDiasAlertaVencimento) {
      errors.push("É obrigatório informar a quantidade de dias para o alerta do vencimento!");
    }
    return errors;
  };


  put = () => {
    const errors = this.validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .update(this.state.codigo, {
        nome: this.state.nome,
        quantidadeMinimaEstoque: this.state.quantidadeMinimaEstoque,
        quantidadeTotal: this.state.quantidadeTotal,
        unidadeMedida:this.state.unidadeMedida,
        statusEstoque: this.state.statusEstoque,
      })
      .then((Response) => {
        showSuccessMessage("Insumo atualizado com sucesso!");
        console.log(Response);
        this.props.history.push("/listInsumos");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.Response);
      });
  };

  cancel = () => {
    this.props.history.push("/listInsumos");
  };
  
  render() {
    return (
      <>
        <MenuLeft />
        <div className="container">
          <div className="header">
            <Toast ref={(el) => (this.state.toast = el)} />
            <ConfirmDialog
              acceptClassName="p-button-success"
              rejectClassName="p-button-danger"
              acceptLabel="Sim"
              rejectLabel="Não"
            />
            <div>
              <BreadCrumb
                model={this.state.items}
                home={this.state.home}
              ></BreadCrumb>
            </div>
          </div>

          <div>
            <div className="input-texts">
              <div className="input-um">
                <InputText
                  id="nome"
                  className="borderColorEdit"
                  type="text"
                  value={this.state.nome}
                  onChange={(e) => {
                    this.setState({ nome: e.target.value });
                  }}placeholder="NOME DO INSUMO"
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>

            <br />
            <div className="input-texts">
              <Dropdown
                value={this.state.unidadeMedida}
                options={this.state.unidadeMedidaSelect}
                onChange={(e) => {
                  this.setState({ unidadeMedida: e.value });
                }}
                placeholder="UNIDADE DE MEDIDA"/>
            </div>
            <br/>
            <div className="input-texts">
              <div className="input-um">
                <label htmlFor="qntTotal"></label>
                <InputNumber value={this.state.quantidadeTotal} onValueChange={(e) => 
                this.setState({quantidadeTotal: e.target.value})}placeholder="QUANTIDADE DE INSUMO" mode="decimal" showButtons min={0} max={10000} />
              </div>
            </div>
            </div>
            <br/>    
            <div className="input-texts">
            <div className="input-um">
              <InputNumber value={this.state.quantidadeMinimaEstoque} onValueChange={(e) => 
                this.setState({quantidadeMinimaEstoque: e.target.value})}placeholder="QUANTIDADE MINIMA DO ESTOQUE" mode="decimal" showButtons min={0} max={10000} />
                </div>
            </div>

            <div className="bts">
              <div className="bt">
                <Button
                  label="SALVAR"
                  severity="secondary"
                  raised
                  onClick={this.put}
                />
              </div>
              <div className="bt">
              <Button
                  label="CANCELAR"
                  raised
                  onClick={this.cancel}
                />
              </div>
            </div>
          </div>
      </>
    );
  }
}
