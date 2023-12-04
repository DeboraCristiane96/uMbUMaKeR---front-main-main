import '../home/Home.css';

import MenuLeft from '../../components/Menu/MenuLeft';

import { Button } from "primereact/button";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from 'primereact/dialog';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";

import InsumoService from "../../services/InsumoService";
import EntradaEstoqueService from "../../services/EntradaEstoqueService";
import SaidaEstoqueService from "../../services/SaidaEstoqueService";
import Grafico from "../../components/graficos/Grafico";


export default class DashboardInsumos extends React.Component {
    state = {
        moduloSelect: [
          { label: 'DISPOSITIVOS', value: 'DISPOSITIVOS' },
          { label: 'INSUMOS', value: 'INSUMOS' },
          { label: 'ZONAS', value: 'ZONAS' }
        ],
        modulo: "",
        moduloFiltro: "",
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
        entradasEstoque: [{
            codigo: "",
            dataEntrada: "",
            dataValidade: "",
            quantidade: ""

        }],
        saidasEstoque: [{
            codigo: "",
            dataSaida: "",
            quantidade: ""
        }],
        //dados da Zonas
        toast: "",
      };
    
      constructor() {
        super();
        this.InsumoService = new InsumoService();
        //entradaEstoque
        //saidaEstoque
      }
    
      async componentDidMount() {
        //Entradas de estoques
        //Saidas de estoques
      }
      //verifica qual modulo foi selecionado || não esta sendo usado
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
        if (this.state.modulo === 'DISPOSITIVOS') {
            window.location.href = `/dashboardDispositivos`
        } else if (this.state.modulo === 'ZONAS') {
            window.location.href = `/dashboardZonas`
        } else {
            window.location.href = `/dashboardInsumos`
        }
      }
      //retornar botoes das zonas
      listZonas = async () => {
        await this.service.findAll("")
          .then(response => {
            const zonas = response.data;
            this.setState({ zonas });
          }).catch(error => {
          });
      }
      //nao esta sendo usado 
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
    
      dialogZonas(agenda) {
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
                    placeholder='INSUMOS'
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
              </div>
              <div className="insumos">
                <Grafico></Grafico>
              </div>
    
            </div>
          </>
        );
      }
    }



