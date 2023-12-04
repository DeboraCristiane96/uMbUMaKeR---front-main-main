/* eslint-disable react/no-direct-mutation-state */

import React from "react"
import "./AgendarZona.css"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import ZonaService from "../../services/ZonaService";
import MenuLeft from "../../components/Menu/MenuLeft";

import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from 'primereact/calendar';
import { PrimeIcons } from 'primereact/api';

import { InputTextarea } from 'primereact/inputtextarea';


export default class AgendarZona extends React.Component {

  state = {
    items: [{ label: "Agendamento", url: "/zonaMM" }],

    home: { icon: "pi pi-home ", url: "/" },

    zona: [{
      zonaId: "",
      nome: "",
      qntPessoas: "",
      checked: true,
      dataInicio: "",
      dataTermino: ""
    }],

    toast: "",
    msgDeErro: "",
    error: ""
  }
  //add service do agendamento de zona
  constructor() {
    super();
    this.service = new ZonaService();
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

  salvar = async () => {
    await this.service
      .create({
        checked: this.state.checked,
        dataInicio: this.state.dataInicio,
        dataTermino: this.state.dataTermino,
        qntPessoas: this.state.qntPessoas,
      })
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Salvo Com Sucesso",
        });
        await this.delay(2000);
        window.location.href = `/zonas`;
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

  confirm = async (zonaId) => {
    this.setState({ zonaId: zonaId });
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
          {/**colocar ação nos botões de Agendamento Avulso e Agendamento Recorrente */}
          <div className="menu-zonas1">
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="Agendamento Avulso"
            />
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="Agendamento Recorrente"
            />
          </div>
          <div className="retanguloBase">
            <div className="retanguloEsquerda">
              <div className="input-texts" style={{ color: '#14770b', display:"inline" }}>
                <h4 id="h4">Título do agendamento</h4>
                <div className="input-um">
                  <InputText
                    id="nome"
                    className="borderColorEdit"
                    type="text"
                    value={this.state.nome}
                    onChange={(e) => {
                      this.setState({ nome: e.target.value });
                    }}
                  />
                  {this.state.error && (
                    <span style={{ color: "red" }}>{this.state.error}</span>
                  )}
                </div>
              </div>
              <div className="linhasDatas">
                <div className="input-um">
                  <h4 id="h4">Data de início</h4>
                  <br />
                  <i className="pi pi-calendar" style={{ fontSize: '2.1rem', color: '#14770b', margin:'0.5rem' }}></i>
                  <Calendar value={this.state.dataInicio}
                    onChange={(e) => this.setState({ dataInicio: e.target.value })} />
                </div>
                <div className="input-dois">
                  <h4 id="h4">Data de termino</h4>
                  <br />
                  <i className="pi pi-calendar" style={{ fontSize: '2.1rem', color: '#14770b', margin:'0.5rem' }}></i>
                  <Calendar value={this.state.dataSolicitacao}
                    onChange={(e) => this.setState({ dataSolicitacao: e.target.value })} />

                </div>
              </div>
              <div className="linhasHoras">
                <div className="input-um">
                  <h4 id="h4">Hora de início</h4>
                  <br />
                  <i className="pi pi-clock" style={{ fontSize: '2.1rem', color: '#14770b', margin:'0.5rem' }}></i>
                  <Calendar value={this.state.dataInicio}
                    onChange={(e) => this.setState({ dataInicio: e.target.value })}  timeOnly/>
                </div>
                <div className="input-dois">
                  <h4 id="h4">Hora de termino</h4>
                  <br />
                  <div className="input-um">
                    <i className="pi pi-clock" style={{ fontSize: '2.1rem', color: '#14770b', margin:'0.5rem' }}></i>
                    <Calendar value={this.state.dataSolicitacao}
                      onChange={(e) => this.setState({ dataSolicitacao: e.target.value })} timeOnly/>
                  </div>
                </div>
              </div>
              <span className="p-float-label">
                <h4 id="h4">Descrição</h4>
                <br />
                <InputTextarea id="username" rows={5} cols={60} />
              </span>
              <div className="input-text" _>
                <br />
                <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({ checked: e.target.value })} />
                <h4 id="h4A">Políticas de aceite</h4>

              </div>
            </div>
            <div className="retanguloDireita">
              <h4 id="h4">Dias da Semana</h4>

              <div className="input-check">
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Segunda-Feira"
                    name="diaSemana"
                    value="Segunda-Feira"
                    onChange={this.onFilamentosChange("Segunda-Feira")}
                  />
                  <label htmlFor="Segunda-Feira" className="ml-2">
                    Segunda-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Terca-Feira"
                    name="diaSemana"
                    value="Terca-Feira"
                    onChange={this.onFilamentosChange("Terca-Feira")}
                  />
                  <label htmlFor="Terca-Feira" className="ml-2">
                    Terça-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Quarta-Feira"
                    name="diaSemana"
                    value="Quarta-Feira"
                    onChange={this.onFilamentosChange("Quarta-Feira")}
                  />
                  <label htmlFor="Quarta-Feira" className="ml-2">
                    Quarta-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Quinta-Feira"
                    name="diaSemana"
                    value="Quinta-Feira"
                    onChange={this.onFilamentosChange("Quinta-Feira")}
                  />
                  <label htmlFor="Quinta-Feira" className="ml-2">
                    Quinta-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Sexta-Feira"
                    name="diaSemana"
                    value="Sexta-Feira"
                    onChange={this.onFilamentosChange("Sexta-Feira")}
                  />
                  <label htmlFor="Sexta-Feira" className="ml-2">
                    Sexta-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Sabado"
                    name="diaSemana"
                    value="Sabado"
                    onChange={this.onFilamentosChange("Sabado")}
                  />
                  <label htmlFor="Sabado" className="ml-2">
                    Sábado
                  </label>
                </div>

              </div>
            </div>
          </div>
          <div className="bts">
            <div className="bt">
              <Button
                label="Salvar"
                onClick={this.validar}
              />
            </div>
            <div className="bt">
              <a href="/zonaMM">
                <Button label="CANCELAR"></Button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}


