/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import "./ListInsumos.css";
import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { Dropdown } from "primereact/dropdown";

import { BreadCrumb } from "primereact/breadcrumb";

import { Button } from "primereact/button";
import MenuLeft from "../../components/Menu/MenuLeft";

import InsumoService from "../../services/InsumoService";

import CardListInsumos from "../../components/CardListInsumos/CardListInsumos";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputText } from "primereact/inputtext";


export default class ListInsumos extends React.Component {
  state = {
    items: [{ label: "Insumos", url: "/insumos" }],
    home: { icon: "pi pi-home ", url: "/" },

    insumos: [
      {
        codigo:0,
        nome: "",
        quantidadeTotal:"",
        quantidadeMinimaEstoque:"",
        quantidadeDiasAlertaVencimento:"",
        unidadeMedida:"",
      },
    ],
    token: "",
    toast: "",
    
    statusParaFiltro:"",

    insumoFiltro: [
      {
       
        codigo: "",
        nome: "",
        statusEstoque:"",
        quantidadeTotal:"",
        quantidadeMinimaEstoque:"",
        quantidadeDiasAlertaVencimento:"",
        unidadeMedida:""
      },
    ],

    nomeSelect: [
      { label: "PLA", value: "PLA" },
      { label: "ABS", value: "ABS" },
      { label: "PETG", value: "PETG" },
      { label: "HIPS", value: "HIPS" },
      { label: "TPU", value: "TPU" },
      { label: "ASA", value: "ASA" },
    ],
    nomeParaFiltro: "",

    statusSelect: [
      { label: "REGULAR", value: "REGULAR" },
      { label: "ABAIXO MINÍMO", value: "ABAIXO MINÍMO" },
      { label: "ZERADO", value: "ZERADO" },
    ],
    statusEstoqueFiltro:"",

    insumoFiltroAuxiliar:[{}]


  };

  constructor() {
    super();
    this.service = new InsumoService();
  }
 

  async componentDidMount() {
    await this.service.findAll("")
      .then((response) => {
        const insumos = response.data;
        this.setState({ insumos });
        console.log(response);
      })
      
      .catch((error) => {
        console.log("erro!");
        console.log(error.response);
      });
  }
  filtro = () =>{
    let lista = []
    this.state.insumos.forEach(element => {
        if(element.nome === this.state.nomeParaFiltro){
            lista.push(element);
        }
    });
    this.setState({insumos:lista})
    console.log("teste",this.state.insumos)
}

limparFiltro = () =>{
    this.setState({nomeParaFiltro:''})
}

filtroStatus = async () =>{
  let lista = []
  this.state.insumos.forEach(element => {
      if(element.statusEstoque === this.state.statusParaFiltro){
          lista.push(element);
      }
  });
  console.log("teste",this.state.insumos)
  this.setState({insumos:lista})
 
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
  window.location.href = `/updateInsumo/${codigo}`;    
  
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
                            title="Filtrar" severity="warning" raised />
                 <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos" severity="warning" raised />
              </div>
                  
              <div className="input-status">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <Dropdown placeholder="STATUS"
                                value= {this.state.status} 
                                options={this.state.statusSelect}
                                onChange={(e) => {this.setState({status: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtroStatus}
                            title="Filtrar" severity="warning" raised />
                           
                        </div>


              <div className="divCreat">
                <a href="/criarInsumos">
                  <Button className="btCreat" severity="warning" raised>
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
                  onClick={(this.test)}
                  className="p-button-outlined mb-5"
                  label="FD-3D"
                />
                <hr />
              </div>

              <br />

              <br />
            </div>
          </div>

          <div className="insumos">
            <CardListInsumos
              insumos={this.state.insumos}
              delete={this.confirm}
              editar={this.editar}
            />
          </div>
        </div>
      </>
    );
  }
}
