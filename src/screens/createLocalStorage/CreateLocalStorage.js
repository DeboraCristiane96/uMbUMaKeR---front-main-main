/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";
       
import { BreadCrumb } from "primereact/breadcrumb";

import { Button } from "primereact/button";

import "./CreateLocalStorage.css";


import MenuLeft from "../../components/Menu/MenuLeft";
import LocalStorageService from "../../services/LocalStorageService";

export default class CreateLocalStorage extends React.Component {
 
  state = {
      items: [
        { label: "Armazenamento", url: "/localStorage" },
        { label: "Cadastrar" },
      ],
      
      home: { icon: "pi pi-home ", url: "/" },

      local: [
        {
          codigo:0,
          codigoArmario:"",
          codigoNicho:"",
        },
      ],
      toast: "",
      msgDeErro: "",
      error: "",
      namerror: "",
    };

    constructor() {
      super();
      this.service = new LocalStorageService();
    }
   
    
  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
 

  salvar = async () => {
    await this.service
      .create({
        codigoArmario: this.state.codigoArmario,
        codigoNicho: this.state.codigoNicho
       
       
      })
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Salvo Com Sucesso",
        });
        await this.delay(2000);
        window.location.href = `/localStorage`;
      })
      .catch((error) => {
        this.state.toast.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao Salvar",
        });
       
        console.log(error);
      });
  };
  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Cadastro Realizado com Sucesso",
      life: 3000,
    });
    this.salvar();
  };

  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Rejeitado",
      detail: "Cadastro Cancelado",
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
      message: "Deseja realizar esse Cadastro ?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
  };

  validar = () => {
    let msgError = {
      severity: "error",
      summary: "Corrija os Erros a Baixo",
      detail: "Campos não podem ser nulos",
    };
    let disparo = 0;
    if (this.state.codigoArmario=== "") {
      disparo++;
      let a = document.getElementById("codeA");
      a.classList.add("p-invalid");
      this.setState({ error: "Esse Campo é Obrigatorio" });
    }
    if (this.state.codigoNicho=== "") {
        disparo++;
        let a = document.getElementById("codeN");
        a.classList.add("p-invalid");
        this.setState({ error: "Esse Campo é Obrigatorio" });
      }
    if (disparo !== 0) {
      this.state.toast.show(msgError);
    } else {
      this.confirm();
    }
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
              <h3 id="cor">Armário</h3>
              <InputText
                id="codeA"
                className="borderColorEdit"
                type="text"
                value={this.state.codigoArmario}
                onChange={(e) => {
                  this.setState({ codigoArmario: e.target.value });
                }}
                placeholder="ARMÁRIO"
              />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
              
              <div className="input-um">
              <h3 id="cor">Nicho</h3>
                <InputText
                  id="codeN"
                  className="borderColorEdit"
                  type="text"
                  value={this.state.codigoNicho}
                  onChange={(e) => {
                    this.setState({ codigoNicho: e.target.value });
                  }}placeholder="NICHO"
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>
            <br/>
            
            </div>

            <div className="bts">
              <div className="btS">
                <Button
                  label="SALVAR"
                  onClick={this.salvar}
                />
              </div>
              <div className="btS">
                <a href="/localStorage">
                  <Button label="CANCELAR"></Button>
                </a>
              </div>
            </div>
          </div>
      </>
    );
  }
}
