/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { Dropdown } from "primereact/dropdown";

import { BreadCrumb } from "primereact/breadcrumb";

import { Button } from "primereact/button";

import MenuLeft from "../../components/Menu/MenuLeft";

import CardListZonas from "../../components/cardListZonas/CardListZonas";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputText } from "primereact/inputtext";

import ZonaService from "../../services/ZonaService";

export default class ListZonas extends React.Component {
  
  state = {
    items: [{ label: "Zonas", url: "/zonas" }],
    home: { icon: "pi pi-home ", url: "/" },

    zonas: [
      {
        codigo:0,
        nome: "",
        status: false,
        qtdPessoas:""
      },
    ],
    token: "",
    toast: "",
    
    statusParaFiltro:"",

    zonasFiltro: [
      {
       
        codigo: "",
        nome: "",
        status:false,
        qtdPessoas:""
      },
    ],



    statusSelect: [
      { label: "AGENDADO", value: true },
      { label: "EM MANUTENCAO", value: "EM MANUTENCAO" },
      { label: " NAO AGENDADO", value: false },
    ],

    zonasFiltroAuxiliar:[{}]


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
  filtro = () =>{
    let lista = []
    this.state.zonas.forEach(element => {
        if(element.nome === this.state.nomeParaFiltro){
            lista.push(element);
        }
    });
    this.setState({zonas:lista})
    console.log("teste",this.state.zonas)
}

limparFiltro = () =>{
    this.setState({nomeParaFiltro:''})
}

filtroStatus = async () =>{
  let lista = []
  this.state.zonas.forEach(element => {
      if(element.status === this.state.statusParaFiltro){
          lista.push(element);
      }
  });
  console.log("teste",this.state.zonas)
  this.setState({zonas:lista})
 
}

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  delete = (codigo) =>{
    this.service.delete(codigo)
        .then(async (response) =>{
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro Excluido Com Sucesso' });
            await this.delay(2000);
           window.location.reload();
        }).catch(error =>{
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Cadastro' });
        })
} 
editar = (codigo) => {
  window.location.href = `/updateZona/${codigo}`;    
  
}
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
    this.setState({codigo: codigo})
    confirmDialog({
      message: "Você Realmente quer Deletar esse Cadastro ?",
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
              <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="PROCURAR"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => {this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>
                          <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar" />
                          <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos"/>
                        </div>
                  
                        <div className= "input-status">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <Dropdown placeholder="STATUS"
                                value= {this.state.status} 
                                options={this.state.statusSelect}
                                onChange={(e) => {this.setState({status: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtroStatus}
                            title="Filtrar"/>
                           
                        </div>


              <div className="divCreat">
                <a href="/criarZona">
                  <Button className="btCreat">
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#0b6429" }}
                    />
                  </Button>
                </a>
              </div>
              <div className="menu-zonas1">
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="M"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="RA"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="FD-CNC"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="FD-3D"
                />
                <hr />
              </div>

              <br />

              <br />
            </div>
          </div>

          <div className="zonas">
            <CardListZonas
              zonas={this.state.zonas}
              delete={this.confirm}
              editar={this.editar}
            />
          </div>
        </div>
      </>
    );
  }
}
