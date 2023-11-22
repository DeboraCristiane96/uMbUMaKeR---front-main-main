/* eslint-disable react/no-direct-mutation-state */

import React from "react"
import "./AgendarDispositivo.css"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import AgendaDispositivoService from "../../services/AgendaDispositivoService";
import MenuLeft from "../../components/Menu/MenuLeft";

import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from 'primereact/calendar';

import { InputTextarea } from 'primereact/inputtextarea';


export default class AgendarDispositivo extends React.Component {

  state = {
    items: [{ label: "Agendamento", url: "/devices" }],

    home: { icon: "pi pi-home ", url: "/" },


    codigo: 0,
    dataSolicitacao: "",
    email: "",
    dataAgendamento: "",
    descricao: "",
    politicaDeAceite: false,
    statusObjeto: ""

    ,
    toast: "",
    msgDeErro: "",
    error: ""
  }

  constructor() {
    super();
    this.service = new AgendaDispositivoService();
  }

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  salvar = async () => {
    await this.service
      .create({
        dataSolicitacao: this.state.dataSolicitacao,
        email: this.state.email,
        dataAgendamento: this.state.dataAgendamento,
        descricao: this.state.descricao,
        politicaDeAceite: this.state.politicaDeAceite,
        statusObjeto: this.state.statusObjeto
      })
      .then(async (response) => {
        console.log(response);
        console.log("salver...");
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Salvo Com Sucesso",
        });
        await this.delay(2000);
        //window.location.href = `/devices`;
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
    console.log("Accept...")
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
    console.log("confirm :" + codigo);
    this.setState({ codigo: codigo });
    // eslint-disable-next-line no-unused-vars
    const a = document.getElementsByClassName(
      "p-button p-component p-confirm-dialog-reject p-button-text"
    );
    confirmDialog({
      message: "Deseja realizar esse Agendamento ?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
  };

  validar = () => {
    console.log("validar...");
    let msgError = {
      severity: "error",
      summary: "Corrija os Erros a Baixo",
      detail: "Campos não podem ser nulos",
    };
    let disparo = 0;
    if (this.state.email === "") {
      disparo++;
      let a = document.getElementById("email");
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
            <BreadCrumb
              model={this.state.items}
              home={this.state.home}
            ></BreadCrumb>
          </div>
          <div>
            <h4 id="meuH3" htmlFor="dataSolicitasao" className="font-bold block mb-2">Data de solicitação</h4>
            <br />
            <div className="input-um">
              <Calendar value={this.state.dataSolicitacao}
                onChange={(e) => this.setState({ dataSolicitacao: e.target.value })} />
            </div>
            <h4 id="meuH3">Email</h4>
            <div className="input-texts">
              <div className="input-um">
                <InputText id="" className="borderColorEdit"
                  type="text" value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>

            <div className="input-dois">
              <div className="input-um">
                <h4 id="meuH3" htmlFor="dataUltManu"
                  className="font-bold block mb-2">statusObjeto </h4>
                <br />
              </div>
            </div>

            <div>
              <h4 id="meuH3" htmlFor="descricao">Descrição</h4>
              <br />
              <span className="p-float-label">
                <InputTextarea id="username" rows={5} cols={100}
                  type="text"
                  value={this.state.descricao}
                  onChange={(e) => {
                    this.setState({ descricao: e.target.value });
                  }} />
              </span>
            </div>

            <div className="input-text" >
              <br />
              <InputSwitch checked={this.state.checked}
                onChange={(e) => this.setState({ checked: e.target.value })} />
              <br />
              <h4 id="meuH3A" htmlFor="username">Política de aceite</h4>

              <div className="input-um">
                <br />
                <h4 id="meuH3" htmlFor="dataUltManu"
                  className="font-bold block mb-2">Data agendada </h4>
                <br />
                <div className="flex-auto">
                  <Calendar value={this.state.dataAgendamento}
                    onChange={(e) => this.setState({
                      dataAgendada: e.target.value
                    })} />
                </div>
              </div>
            </div>

            <div className="bts">
              <div className="bt">
                <Button
                  label="Salvar"
                  severity="warning"
                  raised
                  onClick={this.validar}
                />
              </div>

              <div className="bt">
                <a href="/devices">
                  <Button label="CANCELAR"></Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


