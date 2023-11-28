/* eslint-disable no-undef */
/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { Toast } from "primereact/toast";

import { Dropdown } from "primereact/dropdown";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import MenuLeft from "../../components/Menu/MenuLeft";
import DeviceService from "../../services/DeviceService";

// eslint-disable-next-line react-hooks/rules-of-hooks

export default class CreateDevice extends React.Component {
  state = {
    items: [{ label: "Dispositivos", url: "/devices" }, { label: "Cadastrar" }],

    home: { icon: "pi pi-home ", url: "/" },

    deviceid: "",
    filamentosArray: [],
    devices: [
      {
        codigo: "",
        img: "",
        ultimaManutencao: "",
        modelo: "",
        temperaturaMaxima: "",
        eixoX: "",
        eixoY: "",
        eixoZ: "",
        filamentos: [],
      },
    ],

    tipos: [
      { label: "CNC", value: "CNC" },
      { label: "SCANNER", value: "SCANNER" },
      { label: "IMPRESSORA_FDM", value: "IMPRESSORA_FDM" },
      { label: "CANETA3D", value: "CANETA3D" },
      { label: "OUTRO", value: "OUTRO" },
    ],
    tipo: "",

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

  onFilamentosChange = (e) => {
    let _filamentos = [this.filamentos];

    if (e.checked) _filamentos.push(e.value);
    else _filamentos.splice(_filamentos.indexOf(e.value), 1);

    this.filamentos = _filamentos;
  };

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  salvar = () =>{
    const dataOriginal = this.state.dataDeNascimento;
    const data = new Date(dataOriginal);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    //Formata o mes antes de mandar para o back
    console.log("tamanho do mes", mes.size )
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString().padStart(2, '0')}`;
    this.service.create({
        ultimaMnautencao: dataFormatada,
        codigo: this.state.codigo,
        modelo: this.state.modelo,
        temperaturaMaxima: this.state.temperaturaMaxima,
        eixoX: this.state.eixoX,
        eixoY: this.state.eixoY,
        eixoZ: this.state.eixoZ,
        filamentosSelecionados: this.state.filamentosSelecionado,
        tipo: this.state.tipo,
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
          <br />
          <br />
          <h3 id="meuH3">Data da Última Manutenção</h3>
          <br />
          <div className="input-um">
            <InputText
              type="date"
              id="dataUltManu"
              className="borderColorEdit input-cidade"
              value={this.state.ultimaManutencao}
              onChange={(e) => {
                this.setState({ ultimaManutencao: e.target.value });
              }}
            />
          </div>
          <div className="input-texts">
            <div className="input-um">
              <h3 id="meuH3">Modelo</h3>
              <InputText
                id="modelo"
                className="borderColorEdit"
                type="text"
                value={this.state.modelo}
                onChange={(e) => {
                  this.setState({ modelo: e.target.value });
                }}
                placeholder="MODELO"
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorMod && (
                <span style={{ color: "red" }}>{this.state.errorMod}</span>
              )}
            </div>
          </div>

          <div className="input-texts">
            <div className="input-um">
              <h3 id="meuH3">Temperatura Máxima</h3>
              <InputText
                id="temp"
                className="borderColorEdit"
                type="text"
                value={this.state.temperaturaMaxima}
                onChange={(e) => {
                  this.setState({ temperaturaMaxima: e.target.value });
                }}
                placeholder="TEMPERATURA MÁXIMA"
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorTemp && (
                <span style={{ color: "red" }}>{this.state.errorTemp}</span>
              )}
            </div>
          </div>

          <div className="input-check">
            <div className="input-dois">
              <h3 id="meuH3">Eixo X</h3>
              <InputText
                id="eX"
                type="text"
                value={this.state.eixoX}
                onChange={(e) => {
                  this.setState({ eixoX: e.target.value });
                }}
                placeholder="EIXO X"
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorEX && (
                <span style={{ color: "red" }}>{this.state.errorEX}</span>
              )}
            </div>

            <div className="input-dois">
              <h3 id="meuH3">Eixo Y</h3>
              <InputText
                id="eY"
                type="text"
                value={this.state.eixoY}
                onChange={(e) => {
                  this.setState({ eixoY: e.target.value });
                }}
                placeholder="EIXO Y"
              />
              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorEY && (
                <span style={{ color: "red" }}>{this.state.errorEY}</span>
              )}
            </div>

            <div className="input-dois">
              <h3 id="meuH3">Eixo Z</h3>
              <InputText
                id="eZ"
                type="text"
                value={this.state.eixoZ}
                onChange={(e) => {
                  this.setState({ eixoZ: e.target.value });
                }}
                placeholder="EIXO Z"
              />
              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorEZ && (
                <span style={{ color: "red" }}>{this.state.errorEZ}</span>
              )}
            </div>
          </div>

          <h3 id="meuH3">Filamentos Suportados</h3>
          <div className="input-um"></div>

          <div className="input-check">
            <div className="input-dois">
              <input
                type="checkbox"
                inputId="filamento1"
                name="suporte"
                value="PLA"
                onChange={this.onFilamentosChange("PLA")}
              />
              <label htmlFor="filamento1" className="ml-2">
                PLA
              </label>
            </div>
            <div className="input-dois">
              <input
                type="checkbox"
                inputId="filamento2"
                name="suporte"
                value="ABS"
                onChange={this.onFilamentosChange("ABS")}
              />
              <label htmlFor="filamento2" className="ml-2">
                ABS
              </label>
            </div>
            <div className="input-dois">
              <input
                type="checkbox"
                inputId="filamento3"
                name="suporte"
                value="PET"
                onChange={this.onFilamentosChange("PET")}
              />
              <label htmlFor="filamento3" className="ml-2">
                PET
              </label>
            </div>
          </div>
          <br />
          <div className="input-check">
            <div className="input-dois">
              <input
                type="checkbox"
                inputId="filamento5"
                name="suporte"
                value="TPU"
                onChange={this.onFilamentosChange("TPU")}
              />
              <label htmlFor="filamento5" className="ml-2">
                TPU
              </label>
            </div>
            <div className="input-dois">
              <input
                type="checkbox"
                inputId="filamento4"
                name="suporte"
                value="HIP"
                onChange={this.onFilamentosChange("HIP")}
              />
              <label htmlFor="filamento4" className="ml-2">
                HIP
              </label>
            </div>
            <div className="input-dois">
              <input
                type="checkbox"
                inputId="filamento6"
                name="suporte"
                value="ASA"
                onChange={this.onFilamentosChange("ASA")}
              />
              <label htmlFor="filamento6" className="ml-2">
                ASA
              </label>
            </div>

            <div>
              <div className="input-tipo">
                <h3 id="meuH3">Tipo de Dispositivo</h3>
                <br />
                <Dropdown
                  id="seletor-tipo"
                  value={this.state.tipo}
                  options={this.state.tipos}
                  onChange={(e) => this.setState({ tipo: e.value })}
                  placeholder="TIPO"
                />
                {/* usado para mostrar a msg de erro, caso tenha */}
                {this.state.errorTipo && (
                  <span style={{ color: "red" }}>{this.state.errorTipo}</span>
                )}
              </div>
            </div>
          </div>
          <div className="bts">
            <div className="bt">
              <Button label="SALVAR" onClick={this.validar} />
            </div>
            <div className="bt">
              <a href="/devices">
                <Button label="CANCELAR"></Button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
