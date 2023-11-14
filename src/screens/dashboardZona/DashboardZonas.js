/* eslint-disable react/no-direct-mutation-state */
import React from "react";


import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import MenuLeft from "../../components/Menu/MenuLeft";

import ZonaService from "../../services/ZonaService";
import DeviceService from "../../services/DeviceService";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import CardDashboardZonas from "../../components/cardDashboardZona/CardDashboardZona";

import { Dropdown } from "primereact/dropdown";

export default class DashboardZonas extends React.Component {

  state = {

    moduloSelect: [
        { label: 'DISPOSITIVOS', value: 'DISPOSITIVOS'},
        { label: 'INSUMO', value: 'INSUMO'}
    ],
    modulo:"",
    moduloFiltro:"",
    agendamentosSelect: [
      { label: "APROVADOS", value: "APROVADOS" },
      { label: "NÃO APROVADOS", value: "NÃO APROVADOS"},
      { label: "TODOS", value: "TODOS"},
    ],
    agendamentos:"",
    agendamentosFiltro:"",
    zonas: [
        {
          codigo:0,
          nome: "",
          status: false,
          qtdPessoas:""
        },
      ],
     
   
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
        console.log("erro!");
        console.log(error.response);
      });
  }
  filtroModulo = async () =>{
    let lista = []
    this.state.modulo.forEach(element => {
        if(element.statusEstoque === this.state.agendamentosFiltro){
            lista.push(element);
        }
    });
    console.log("teste",this.state.insumos)
    this.setState({insumos:lista})
   
  }
  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  validarTipo = () => {
    if (this.state.modulo === 'DISPOSITIVOS') {
        this.service = new DeviceService();
        this.listDispositivo();
    }else{
        this.service = new ZonaService();    
        this.listZonas();
    }
    
}
listZonas = async () => {
  await this.service.findAll("")
      .then(response => {
        const zonas = response.data;
        this.setState({ zonas });
  }).catch(error => {
  });
}
listDispositivo = async () => {
    await this.service.findAll("")
        .then(response => {
          const zonas = response.data;
          this.setState({ zonas });
    }).catch(error => {
    });
  }


filtro = () =>{
  let lista = []
  this.state.modulo.forEach(element => {
      if(element.modulo.nome === this.state.nomeParaFiltro){
          lista.push(element);
      }
  });
  this.setState({modulo:lista})
  console.log("teste",this.state.modulo)
}

  dialogZonas (zonas){
    <Dialog
    visible={true}
    header="Detalhes do Zonas"
  >
    <div>
    <FontAwesomeIcon className="icone" icon={faUsers} />
      <p>: { zonas.nome}</p>
      <p>Eixo Z: { zonas.status}</p>
    
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
          value={this.state.agendamentos}
          options={this.state.agendamentosSelect}
          onChange={e => {
             this.setState({ modulo: e.value });
             
          }}
         placeholder='TODOS'
          />
         <Button className="bt-filtro" label="Filtrar" 
           onClick={this.validarTipo}
             title="Filtrar"/>
    
      <div className="i">
         <Dropdown
          value={this.state.modulo}
          options={this.state.moduloSelect}
          onChange={e => {
             this.setState({ agendamentos: e.value });
          }}
         placeholder='MÓDULO'
          />
         <Button className="bt-filtro" label="Filtrar" 
           onClick={this.validarTipo}
             title="Filtrar"/>
      </div>
      </div>

              <br />
              <hr/>
              <br />
            </div>
         
          <div className="zonas">
            <CardDashboardZonas
              zonas = {this.state.zonas}
              dialogZonas = {this.cardDetalhes}
            />
            </div>
           
        </div>
      </>
    );
  }
}
