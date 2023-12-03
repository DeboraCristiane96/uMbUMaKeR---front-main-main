/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { BreadCrumb } from "primereact/breadcrumb";

import { Button } from "primereact/button";
import MenuLeft from "../../components/Menu/MenuLeft";
import { Dropdown } from "primereact/dropdown";
import { faCalendarDay} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ZonaService from "../../services/ZonaService";
import "./ListAgendamento.css";
import CardListAgendamento from "../../components/cardListAgendamentos/CardListAgendamento";
export default class ListAgendamento extends React.Component {
  
  state = {
    items: [{ label: "Agendamentos", url: "/zonas" }],
    home: { icon: "pi pi-home ", url: "/" },

    agenda: [{
      codigo:0,
      nome:"",
      horaInicial: "",
      horaTermino: "",
      diaSemana: "",
      },
    ],
    token: "",
    toast: "",
  };

  constructor() {
    super();
    this.service = new ZonaService();
  }

  async componentDidMount() {
    await this.service.findAll("")
      .then((response) => {
        const zonas = response.data;
        this.setState({ zonas });
        
        console.log(response);
      })
      .catch((error) => {
        console.log("error");
        console.log(error.response);
      });
  }

  setActiveIndex = () => {};
  

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  delete = (codigo) => {
    this.service
      .delete(codigo)
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Cadastro Excluido Com Sucesso",
        });
        await this.delay(2000);
        window.location.reload();
      })
      .catch((error) => {
        this.state.toast.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao Excluir",
        });
      });
  };

  editar = (codigo) => {
    window.location.href = `/updateAgendamento/${codigo}`;
  };

  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Cadastro Excluido",
      life: 3000,
    });
    this.delete(this.state.codigo);
  };

  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Regeitado",
      detail: " Não Deletado",
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
      message: "Você Realmente quer Deletar esse Cadastro?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
  };

  render() {
    return (
      <>
        <MenuLeft />
        <div className="container">
          <Toast ref={(el) => (this.state.toast = el)} />
          <ConfirmDialog
            acceptClassName="p-button-success"
            rejectClassName="p-button-danger"
            acceptLabel="Sim"
            rejectLabel="Não"
          />

          <div className="header">

            <div>
              <BreadCrumb model={this.state.items} home={this.state.home} />
              <br />
              <div>
              <br />
              <div className="filtragem">
                <span className="p-input-icon-left">
                  <i className="pi pi-search " />
                  <Dropdown
                  value={this.state.nomeParaFiltro}
                  options={this.state.nomeSelect}
                  onChange={(e) => {
                    this.setState({ nomeParaFiltro: e.value });
                    
                  }}placeholder="STATUS DE AGENDAMENTO"
                />
                </span>
                 <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar" />
              </div>
                  
              
            </div>
              <div className="divCreat">
                <a href="/agendarZona">
                  <Button className="btCreat">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      style={{ color: "#0b6429" }}
                    />
                  </Button>
                </a>
              </div>
              <br />
              <br/>
              <div>
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="SEGUNDA"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="TERÇA"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="QUARTA-FEIRA"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="QUINTA-FEIRA"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="SEXTA-FEIRA"
                />
                <hr/>
              </div>
              <br />
              <br />
            </div>
          </div>

          <div className="zonas">
            <CardListAgendamento
              agenda={this.state.agenda}
              delete = {this.confirm}
              editar = {this.editar}
            />
          </div>
        </div>
      </>
    );
  }
}
