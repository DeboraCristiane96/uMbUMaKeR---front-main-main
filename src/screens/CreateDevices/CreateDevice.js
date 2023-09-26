/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { Toast } from "primereact/toast";

import GrupoChekBox from "../../components/checkBox/GrupoChekBox" ;

import { Dropdown } from "primereact/dropdown";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import MenuLeft from "../../components/Menu/MenuLeft";
import DeviceService from "../../services/DeviceService";



export default class CreateDevice extends React.Component {
  state = {
    items: [{ label: "Dispositivos", url: "/devices" }, { label: "Cadastrar" }],

    home: { icon: "pi pi-home ", url: "/" },

    devices: [
      {
        
        deviceid:"",
        img:"",
        dataUltManu: "",
        codigo: "",
        modelo: "",
        tempMax: "",
        eixoX: "",
        eixoY: "",
        eixoZ: "",
        tipoDispositivo: "",
        filamentosSelecionados: [],
      },
    ],

    tipos: [
      { label: "SLA", value: "SLA" },
      { label: "SCANNER", value: "SCANNER" },
      { label: "FDM", value: "FDM" },
      { label: "DLP", value: "DLP" },
      { label: "CANETA 3D", value: "CANETA 3D" },
    ],
    
    toast: "",

    msgDeErro: "",
    errorCod: "",
    errorMod: "",
    errorTemp: "",
    errorEX: "",
    errorEY: "",
    errorEZ: "",
    errorTipo: "",
  };

  constructor() {
    super();
    this.service = new DeviceService();
  }

  

  addImg = ()=>{
      
     
    
    console.log("add img");

  }

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  salvar = () => {
    this.service
      .create({
        img: this.state.img,
        dataUltManu: this.state.dataDeManu,
        codigo: this.state.codigo,
        modelo: this.state.modelo,
        tempMax: this.state.tempMax,
        eixoX: this.state.eixoX,
        eixoY: this.state.eixoY,
        eixoZ: this.state.eixoZ,
        filamentosSelecionados: this.state.filamentosSelecionado,
        tipoDispositivo: this.state.tipoSelecionado,
      })
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Salvo Com Sucesso",
        });
        await this.delay(2000);
        window.location.href = `/devices`;
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

  confirm = async () => {
    confirmDialog({
      message: "Você Realmente quer Cadastrar?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
  };
  //Po up de confirmação de cadastro
  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Cadastro Confirmado",
      life: 3000,
    });
    this.salvar();
  };
  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Regeitado",
      detail: "Cadastro não Aceito",
      life: 3000,
    });
  };
 // Validar se os campos estão preenchidos corretamente
 validar = () => {
  let msgError = {
    severity: "error",
    summary: "Corrija os Erros a Baixo",
    detail: "Campos não podem ser nulos",
  };
  let frasePadrao = "Esse Campo é Obrigatorio";
  let disparo = 0;

  this.setState({ errorMod: "" });
  this.setState({ errorCod: "" });
  this.setState({ errorTemp: "" });
  this.setState({ errorEX: "" });
  this.setState({ errorEY: "" });
  this.setState({ errorEZ: "" });
  this.setState({ errorTipo: "" });


  //Pre Validação do codigo
  if (this.state.codigo === "") {
    disparo++;
    let a = document.getElementById("cod");
    a.classList.add("p-invalid");
    this.setState({ errorCod: frasePadrao });
  }

  if (this.state.modelo === "") {
    disparo++;
    let a = document.getElementById("modelo");
    a.classList.add("p-invalid");
    this.setState({ errorMod: frasePadrao });
  }

  if (this.state.tempMax === "") {
    disparo++;
    let a = document.getElementById("temp");
    a.classList.add("p-invalid");
    this.setState({ errorTemp: frasePadrao });
  }

  //Pre Validação do eixo X
  if (this.state.eixoX === "") {
    disparo++;
    let a = document.getElementById("eX");
    a.classList.add("p-invalid");
    this.setState({ errorEX: frasePadrao });
  }

  //Pre Validação do eixo Y
  if (this.state.eixoY === "") {
    disparo++;
    let a = document.getElementById("eY");
    a.classList.add("p-invalid");
    this.setState({ errorEY: frasePadrao });
  }

  //Pre Validação de eixo Z
  if (this.state.eixoZ === "") {
    disparo++;
    let a = document.getElementById("eZ");
    a.classList.add("p-invalid");
    this.setState({ errorEZ: frasePadrao });
  }
  //Pre Validação de Data de Manutenção
  if (this.state.dataDeManu === "") {
    disparo++;
    let a = document.getElementById("dataM");
    a.classList.add("p-invalid");
    this.setState({ errorData: frasePadrao });
  }
  if (disparo !== 0) {
    this.state.toast.show(msgError);
  } else {
    this.confirm();
  }
};
// Po up para velidar se realmente deseja
  
  render() {
    return (
      <>
        <MenuLeft />
        <div className="container">
          <div className="header">
            <Toast ref={(el) => (this.state.toast = el)} />

            {/* BreadCrumb: Usado para o menu de navegaçao que fica ao lado do bt de salvar */}
            <div className="header">
              <BreadCrumb
                model={this.state.items}
                home={this.state.home}
              ></BreadCrumb>
            </div>
          </div>
          <div className="bt-salvar">
            {/* Campo de dialogo que aparece para confirmar se deseja salvar  */}
            {/* Ele chama a função de validar, caso a validação der ok,apresenta o campo para confirmação e caso confirmado, chama a função de salva */}
            <ConfirmDialog
              acceptClassName="p-button-success"
              rejectClassName="p-button-danger"
              acceptLabel="Sim"
              rejectLabel="Não"
            />
          </div>
          {/* Começas os Campos  */}
         
          <div className="input-dois">
            <br />
            <label htmlFor="dataUltManu">Ultima Manutenção</label>
            <br />
            <InputText
              id="dataUltManu"
              className="borderColorEdit input-cidade"
              type="date"
              value={this.state.dataUltManu}
              onChange={(e) => {
                this.setState({ dataUltManu: e.target.value });
              }}
            />
          </div>
          <div className="input-texts">
            <div className="input-um">
              <label htmlFor="modelo">Modelo</label>

              <InputText
                id="modelo"
                className="borderColorEdit"
                type="text"
                value={this.state.modelo}
                onChange={(e) => {
                  this.setState({ modelo: e.target.value });
                }}
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorMod && (
                <span style={{ color: "red" }}>{this.state.errorMod}</span>
              )}
            </div>
          </div>

          <div className="input-texts">
            <div className="input-um">
              <label htmlFor="temp">Temperatura Máxima</label>

              <InputText
                id="temp"
                className="borderColorEdit"
                type="text"
                value={this.state.tempMax}
                onChange={(e) => {
                  this.setState({ tempMax: e.target.value });
                }}
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorTemp && (
                <span style={{ color: "red" }}>{this.state.errorTemp}</span>
              )}
            </div>
          </div>
          <br />

          <div className="input-texts">
            <div className="input-um">

            <label htmlFor="eX">Eixo X </label>
              <InputText
                id="eX"
                className="borderColorEdit"
                type="text"
                value={this.state.eixoX}
                onChange={(e) => {
                  this.setState({ eixoX: e.target.value });
                }}
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorEX && (
                <span style={{ color: "red" }}>{this.state.errorEX}</span>
              )}
            <label htmlFor="eY">Eixo Y </label>
              <InputText
                id="eY"
                className="borderColorEdit"
                type="text"
                value={this.state.eixoY}
                onChange={(e) => {
                  this.setState({ eixoY: e.target.value });
                }}
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorEY && (
                <span style={{ color: "red" }}>{this.state.errorEY}</span>
              )}

              <label htmlFor="eZ">Eixo Z </label>
                <InputText
                  id="eZ"
                  className="borderColorEdit"
                  type="text"
                  value={this.state.eixoZ}
                  onChange={(e) => {
                    this.setState({ eixoZ: e.target.value });
                  }}
                />
                {/* usado para mostrar a msg de erro, caso tenha */}
                {this.state.errorEZ && (
                  <span style={{ color: "red" }}>{this.state.errorEZ}</span>
                )}
            </div>
            </div>
          <br />  
          <div>
            <GrupoChekBox/>
          </div>
          <br />
          <div className="input-texts">
            <Dropdown
              id="seletor-tipo"
              value={this.state.tipoDispositivo}
              options={this.state.tipos}
              onChange={(e) => this.setState({ tipoDispositivo: e.value })}
              placeholder="TIPO"
            />
            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorTipo && (
              <span style={{ color: "red" }}>{this.state.errorTipo}</span>
            )}
          </div>
        </div>
        <br />

        <div className="bts">
          <div className="bt">
            <Button
              label="SALVAR"
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
      </>
    );
  }
}
