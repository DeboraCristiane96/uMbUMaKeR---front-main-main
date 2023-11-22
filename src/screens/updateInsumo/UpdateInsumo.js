/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "./UpdateInsumo.css";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import InsumoService from "../../services/InsumoService";

import MenuLeft from "../../components/Menu/MenuLeft";

export default class updateInsumo extends React.Component {
  state = {
    items: [
      { label: "Listagem", url: "/listInsumos" },
      { label: "Entrada / Saída" },
    ],
    home: { icon: "pi pi-home ", url: "/" },

    codigo: 0,
    nome: "",
    quantidadeTotal: "",
    quantidadeMinimaEstoque: "",
    quantidadeDiasAlertaVencimento: "",
    unidadeMedida: "",
    statusEstoque: "",

    unidadeMedidaSelect: [
      { label: "UNIDADE", value: "UNIDADE" },
      { label: "LITRO", value: "LITRO" },
      { label: "METRO", value: "METRO" },
      { label: "KILO", value: "KILO" },
    ],

    msgDeErro: "",
  };

  componentDidMount() {
    const url = window.location.href;
    const codigo = url.substring(url.lastIndexOf("/") + 1);
    this.findById(codigo);
  }

  constructor() {
    super();
    this.service = new InsumoService();
  }

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  editar = async () => {
    await this.service
      .update(this.state.codigo, {
        nome: this.state.nome,
        quantidadeMinimaEstoque: this.state.quantidadeMinimaEstoque,
        quantidadeTotal: this.state.quantidadeTotal,
        unidadeMedida: this.state.unidadeMedida,
      })
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Atualizado Com Sucesso",
        });
        await this.delay(2000);
        window.location.href = `/insumos`;
      })
      .catch((error) => {
        this.state.toast.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao Atualizar",
        });

        console.log(error);
      });
  };

  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Atualizado com Sucesso",
      life: 3000,
    });
    this.editar();
  };

  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Rejeitado",
      detail: "Atualização Cancelada",
      life: 3000,
    });
  };

  confirm = async (codigo) => {
    this.setState({ codigo: codigo });
    // eslint-disable-next-line no-unused-vars
    const a = document.getElementsByClassName(
      "p-button p-component p-confirm-dialog-reject p-button-text"
    );
    confirmDialog({
      message: "Você Realmente quer Editar esse Insumos?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(15);
  };

  validar = () => {
    let msgError = {
      severity: "error",
      summary: "Corrija os Erros a Baixo",
      detail: "Campos não podem ser nulos",
    };
    let disparo = 0;
    if (this.state.nome === "") {
      disparo++;
      let a = document.getElementById("nome");
      a.classList.add("p-invalid");
      this.setState({ error: "Esse Campo é Obrigatorio" });
    }
    if (disparo !== 0) {
      this.state.toast.show(msgError);
    } else {
      this.confirm();
    }
  };

  findById = (codigo) => {
    this.service
      .find(`${codigo}`)
      .then((response) => {
        const insumo = response.data;
        let codigo = insumo.codigo;
        const nome = insumo.nome;
        const quantidadeMinimaEstoque = insumo.quantidadeMinimaEstoque;
        const quantidadeTotal = insumo.quantidadeTotal;
        const unidadeMedida = insumo.unidadeMedida;

        this.setState({
          codigo: codigo,
          nome: nome,
          quantidadeMinimaEstoque: quantidadeMinimaEstoque,
          quantidadeTotal: quantidadeTotal,
          unidadeMedida: unidadeMedida,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
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
                <h3 id="meuH3">Nome</h3>
                <InputText
                  id="nome"
                  className="borderColorEdit"
                  type="text"
                  value={this.state.nome}
                  onChange={(e) => {
                    this.setState({ nome: e.target.value });
                  }}
                  placeholder="NOME DO INSUMO"
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>
            <h3 id="meuH3">Unidade de Medida</h3>
            <br/>
            <div className="input-texts">
              <Dropdown
                value={this.state.unidadeMedida}
                options={this.state.unidadeMedidaSelect}
                onChange={(e) => {
                  this.setState({ unidadeMedida: e.value });
                }}
                placeholder="UNIDADE DE MEDIDA"
              />
            </div>
            <br />
            <div className="input-texts">
              <div className="input-um">
                <h3 id="meuH3">Quantidade Total</h3>
                <InputNumber
                  id="qntTotal"
                  value={this.state.quantidadeTotal}
                  onValueChange={(e) =>
                    this.setState({ quantidadeTotal: e.target.value })
                  }
                  placeholder="QUANTIDADE DE INSUMO"
                  mode="decimal"
                  showButtons
                  min={0}
                  max={10000}
                />
              </div>
            </div>
          
          <div className="input-texts">
            <div className="input-um">
              <h3 id="meuH3">Mínimo de Estoque</h3>
              <InputNumber
                id="qntMin"
                value={this.state.quantidadeMinimaEstoque}
                onValueChange={(e) =>
                  this.setState({ quantidadeMinimaEstoque: e.target.value })
                }
                placeholder="QUANTIDADE MINIMA DO ESTOQUE"
                mode="decimal"
                showButtons
                min={0}
                max={10000}
              />
            </div>
          </div>
          </div>
          <div className="bts">
            <div className="bt">
              <Button label="SALVAR" severity="success" onClick={this.accept} />
            </div>
            <div className="bt">
              <a href="/insumos">
                <Button label="CANCELAR"></Button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
