/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import './ListManagers.css';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';
import Menu from "../../components/Menu/Menu";
import ManagerService from "../../services/ManagerService";
import CardListManagers from "../../components/cardListManagers/CardListManagers";

export default class ListManagers extends React.Component{
    state = {
        items:[{ label: 'Gestores', url:"/managers" }],

        home: {icon: 'pi pi-home ', url: '/' },

        managers:[
            {

                idGestor:'',
                contaAcesso:{
                    idContaAcesso:'',
                    nome:'',
                    email:'',
                    senha:'',
                    telefone:'',
                    linkWhatsapp:'',
                    ativo:'',
                    qrcode:''

                }
               
            }
        ],
        token:"",
        toast:'',
        nomeParaFiltro:'',


        managersFiltro:[
            {
                idContaAcesso:'',
                nome:'',
                email:'',
                senha:'',
                telefone:'',
                linkWhatsapp:'',
                ativo:'',
                qrcode:''
                
            }
        ]
        
    }

    constructor(){
        super();
        this.service = new ManagerService();
    }


    filtro = () =>{
        let lista = []
        this.state.managers.forEach(element => {
            if(element.nome === this.state.nomeParaFiltro){
                lista.push(element);
            }
           
        });

        this.setState({managers:lista})
    }


    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
        this.findAll();
    }



    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

    


    delete = (managersId) =>{
        this.service.delete(managersId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Gestor Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Gestor' });
            })
    }

    editar = (managersId) => {
        window.location.href = `/updateUser/${managersId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Gestor Confirmado', life: 3000 });
        this.delete(this.state.managersId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Gestor Não Deletado', life: 3000 });
    };


    
    confirm = async (colaboradorId) => {
        this.setState({colaboradorId: colaboradorId})
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Gestor?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        await this.delay(10);
        document.getElementsByClassName('p-button-label')[9].textContent = "Sim"
        document.getElementsByClassName('p-button-label')[8].textContent = "Não"
    };

    render(){
        return(
            <>
            <Menu/>
            <div className="container">
                 <Toast ref={(el) => (this.state.toast = el)} />
                 <ConfirmDialog 
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>

                <div className="header">
                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                    
                        <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="Procurar"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => { this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar Gestores" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos os Gestores" severity="warning" raised />
                        </div>
                       
                    </div>

                </div>

                <div className="managers">
                    <CardListManagers 
                        managers ={this.state.managers}
                        delete = {this.confirm}
                        editar = {this.editar}
                       
                    />
                    
                </div>
            </div>
            </>
        )
    }

}