/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import MenuLeft from "../../components/Menu/MenuLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import DispositivosService from "../../services/DeviceService";
import AgendaDispositivos from "../../services/AgendaDispositivoService";
import CardDashboardDispositivo from "../../components/cardDashboardDispositivo/CardDashboardDispositivo";
//Utilizar o redirecionamento de Dashboard
export default class DashboardDispositivos extends React.Component {

  state = {
    moduloSelect: [
      { label: 'DISPOSITIVOS', value: 'DISPOSITIVOS' },
      { label: 'INSUMOS', value: 'INSUMOS' },
      { label: 'ZONAS', value: 'ZONAS' }
    ],
    modulo: "",
    moduloFiltro: "",
    agendamentosSelect: [
      { label: "APROVADOS", value: "APROVADOS" },
      { label: "NÃO APROVADOS", value: "NÃO APROVADOS" },
      { label: "TODOS", value: "TODOS" },
    ],
    agendamentos: "",
    agendamentosFiltro: "",
    dispositivos: [
      {
        codigo: 0,
        modelo: "",
        ultimaManutencao: null,
        temperaturaMaxima: "",
        eixoX: 0,
        eixoY: 0,
        eixoZ: 0,
        tipoDispositivo: [],
        tipoFilamentoSuportado: [],
      },
    ],
    agenda: [{
      codigo: 0,
      dataSolicitacao: null,
      email: "",
      dataAgendamento: null,
      descricao: "",
      politicaDeAceite: "",
      StatusObjeto: [],
    },
    ],
    toast: "",
  };

  constructor() {
    super();
    this.serviceDispositivos = new DispositivosService();
    this.serviceAgenda = new AgendaDispositivos();
  }

  //este metodo vai utilizar o serviceDispositivos
  // e chamarar o metodo que lista os agendamentos de cada dispositivos
  async componentDidMount() {
    await this.service.findAll("")
      .then((response) => {
        const agenda = response.data;
        this.setState({ agenda });
        console.log(response);
      })
      .catch((error) => {
        console.log("erro!");
        console.log(error.response);
      });
  }
  //verifica qual modulo foi selecionado
  filtroModulo = async () => {
    let lista = []
    this.state.modulo.forEach(element => {
      if (element.status === this.state.agendamentosFiltro) {
        lista.push(element);
      }
    });
    console.log("teste", this.state.zonas)

  }
  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  //ok
  validarTipo = () => {
    if (this.state.modulo === 'ZONAS') {
      window.location.href = `/dashboardZonas`
    } else if (this.state.modulo === 'INSUMOS') {
      window.location.href = `/dashboardInsumos`
    } else {
      window.location.href = `/dashboardDispositivos`
    }
  }
//este metodo deve listar os agendamentos de um dipositivo
  listarAgenda = async () => {
    await this.serviceAgenda.findAll("")
      .then(response => {
        const agenda = response.data;
        this.setState({ agenda });
      }).catch(error => {
      });
  }

  filtro = () => {
    let lista = []
    this.state.modulo.forEach(element => {
      if (element.modulo.nome === this.state.nomeParaFiltro) {
        lista.push(element);
      }
    });
    this.setState({ modulo: lista })
    console.log("teste", this.state.modulo)
  }

  dialogDispositivo(agenda) {
    <Dialog
      visible={true}
      header="Detalhes do Agenda"
    >
      <div>
        <FontAwesomeIcon className="icone" icon={faUsers} />
        <p>: {agenda.nome}</p>
      </div>
    </Dialog>
  }

  render() {
    return (
      <>
        <MenuLeft />
        <div className="container">
          <div className="header">
            <div className="i">
              <Dropdown
                value={this.state.modulo}
                options={this.state.moduloSelect}
                onChange={e => {
                  this.setState({ modulo: e.value });
                }}
                placeholder='DISPOSITIVOS'
              />
              <Button className="bt-filtro" label="Selecionar Modulo"
                onClick={this.validarTipo}
                title="Selecionar Modulo" />
            </div>
            <div className="i">
              <Dropdown
                value={this.state.agendamentos}
                options={this.state.agendamentosSelect}
                onChange={e => {

                  this.setState({ agendamentos: e.value });
                }}
                placeholder='TODOS'
              />
              <Button className="bt-filtro" label="Filtrar"
                onClick={this.validarTipo}
                title="Filtrar" />

            </div>
          </div>
          <div className="menu-zonas1">
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="GTMAX 3D CORE A3V2"
            />
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="TREVO TORNADO"
            />
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="CREALITY RESIN"
            />
          </div>

          <div className="dispositivos">
          <CardDashboardDispositivo
              agenda={this.state.agenda}
              dialogDispositivo={this.cardDetalhes}
            />
           
          </div>

        </div>
      </>
    );
  }
}
