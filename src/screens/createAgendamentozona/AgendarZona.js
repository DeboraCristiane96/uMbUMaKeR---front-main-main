/* eslint-disable react/no-direct-mutation-state */

import React from "react"
import "./AgendarZona.css"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import AgendaZonaService from "../../services/Zona/AgendaZonaService";
import MenuLeft from "../../components/Menu/MenuLeft";

import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from 'primereact/calendar';
import { Checkbox } from "primereact/checkbox";

import { PrimeIcons } from 'primereact/api';

import { InputTextarea } from 'primereact/inputtextarea';


export default class AgendarZona extends React.Component {

  state = {
    items: [{ label: "Agendamento", url: "/agendarZona" }],

    home: { icon: "pi pi-home ", url: "/" },

    agendamantoZona: [{
      dataSolicitacao: "",
      dataAgendamento: "",
      tempoReservado: "",
      horaInicial: "",
      horaFinal: "",
      dataDeTermino: "",
      descricao: "",
      politicaDeAceite: false,
      diasDaSemana: [],
      zonas: [],
      tutores: []
    }],
    diasSelect: [
      { name: "SEGUNDA",  key: "SEGUNDA" },
      { name: "TERCA",  key: "TERCA" },
      { name: "QUARTA",  key: "QUARTA" },
      { name: "QUINTA",  key: "QUINTA" },
      { name: "SEXTA",  key: "SEXTA" },
    ],
    dias: [],
    diasFiltro: "",

    toast: "",
    msgDeErro: "",
    error: ""
  }
  
  constructor() {
    super();
    this.service = new AgendaZonaService();
  }
  //verificar como funciona esse metodo
  onDiasChange = (e) => {
    let _diasSelect = [this.diasSelect];
    if (e.checked) _diasSelect.push(e.value);
    else _diasSelect.splice(_diasSelect.indexOf(e.value), 1);
      

    this.setState.dias = _diasSelect;
  };

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  salvar = async () => {
    await this.service
      .create({
        dataSolicitacao: this.state.dataSolicitacao,
        dataAgendamento: this.state.dataAgendamento,
        tempoReservado: this.state.tempoReservado,
        horaInicial: this.state.horaInicial,
        horaFinal: this.state.horaFinal,
        dataDeTermino: this.state.dataDeTermino,
        descricao: this.state.descricao,
        politicaDeAceite: this.state.politicaDeAceite,
        diasDaSemana: this.state.diasDaSemana,
        zonas: this.state.zonas,
        tutores: this.state.tutores
      })
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Salvo Com Sucesso",
        });
        await this.delay(2000);
        console.log(response);
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
  //esta pegando o id de zona
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
              <div className="input-texts" style={{ color: '#14770b', display: "inline" }}>
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
                  <i className="pi pi-calendar" style={{ fontSize: '2.1rem', color: '#14770b', margin: '0.5rem' }}></i>
                  <Calendar value={this.state.dataAgendamento}
                    onChange={(e) => this.setState({ dataAgendamento: e.target.value })} />
                </div>
                <div className="input-dois">
                  <h4 id="h4">Data de termino</h4>
                  <br />
                  <i className="pi pi-calendar" style={{ fontSize: '2.1rem', color: '#14770b', margin: '0.5rem' }}></i>
                  <Calendar value={this.state.dataDeTermino}
                    onChange={(e) => this.setState({ dataDeTermino: e.target.value })} />

                </div>
              </div>
              <div className="linhasHoras">
                <div className="input-um">
                  <h4 id="h4">Hora de início</h4>
                  <br />
                  <i className="pi pi-clock" style={{ fontSize: '2.1rem', color: '#14770b', margin: '0.5rem' }}></i>
                  <Calendar value={this.state.horaInicial}
                    onChange={(e) => this.setState({ horaInicial: e.target.value })} timeOnly />
                </div>
                <div className="input-dois">
                  <h4 id="h4">Hora de termino</h4>
                  <br />
                  <div className="input-um">
                    <i className="pi pi-clock" style={{ fontSize: '2.1rem', color: '#14770b', margin: '0.5rem' }}></i>
                    <Calendar value={this.state.horaFinal}
                      onChange={(e) => this.setState({ horaFinal: e.target.value })} timeOnly />
                  </div>
                </div>
              </div>
              <span className="p-float-label">
                <h4 id="h4">Descrição</h4>
                <br />
                <InputTextarea value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value })} id="username" rows={5} cols={65} />
              </span>
              <div className="input-text">
                <br />
                <InputSwitch checked={this.state.politicaDeAceite} onChange={(e) => this.setState({ politicaDeAceite: e.target.value })} />
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
                    onChange={this.onDiasChange("Segunda-Feira")}
                  />
                  <label htmlFor="Segunda-Feira" className="dia">
                    Segunda-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Terca-Feira"
                    name="diaSemana"
                    value="Terca-Feira"
                    onChange={this.onDiasChange("Terca-Feira")}
                  />
                  <label htmlFor="Terca-Feira" className="dia">
                    Terça-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Quarta-Feira"
                    name="diaSemana"
                    value="Quarta-Feira"
                    onChange={this.onDiasChange("Quarta-Feira")}
                  />
                  <label htmlFor="Quarta-Feira" className="dia">
                    Quarta-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Quinta-Feira"
                    name="diaSemana"
                    value="Quinta-Feira"
                    onChange={this.onDiasChange("Quinta-Feira")}
                  />
                  <label htmlFor="Quinta-Feira" className="dia">
                    Quinta-Feira
                  </label>
                </div>
                <div className="input-dois">
                  <input
                    type="checkbox"
                    inputId="Sexta-Feira"
                    name="diaSemana"
                    value="Sexta-Feira"
                    onChange={this.onDiasChange("Sexta-Feira")}
                  />
                  <label htmlFor="Sexta-Feira" className="dia">
                    Sexta-Feira
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
              <a href="/zonas">
                <Button label="CANCELAR"></Button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}


