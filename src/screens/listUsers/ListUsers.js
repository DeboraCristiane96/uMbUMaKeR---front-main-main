/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import './ListUsers.css';
import { Toast } from 'primereact/toast';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';
import Menu from "../../components/Menu/Menu"

import AssociateService from "../../services/AssociateService";
import TutorService from "../../services/TutorService";
import ManagerService from "../../services/ManagerService";
import CardListUsers from "../../components/cardListUsers/CardListUsers";

export default class ListUsers extends React.Component{
    state = {
        items:[{label: 'Associados', url:"/associates" }],
        home: {icon: 'pi pi-home ', url: '/' },

        associates:[
            {

                idAssociates:'',
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


        associatesFiltro:[
            {
                id:'',
                nome:'',
                email:'',
                senha:'',
                telefone:'',
                linkWhatsapp:'',
                ativo:'',
                qrcode:''
                
            }
        ],

        tipoAssociateSelectItems: [
            { label: 'ASSOCIADO', value: 'ASSOCIADO' },
            { label: 'TUTOR', value: 'TUTOR' },
            { label: 'GESTOR', value: 'GESTOR' }
        ],
        tipoAssociate: '',
        
    }

    validarTipo =() =>{
        if(this.state.tipoAssociate ==='ASSOCIADO' ){
            this.service = new AssociateService(); 
            this.service.findAll();
        }
        if(this.state.tipoAssociate ==='GESTOR' ){
            this.service = new ManagerService();
            this.service.findAll();
        }
        if(this.state.tipoAssociate ==='TUTOR'){
            this.service = new TutorService();
            this.service.findAll();
        }
    }
  
    async componentDidMount(){
        this.validarTipo();
        await this.service.findAll()
            .then(response => {
                const associates = response.data;
                this.setState({associates})
                console.log(associates);
                console.log(this.state.associates);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    filtro = () =>{
        let lista = []
        this.state.associates.forEach(element => {
            if(element.nome === this.state.nomeParaFiltro){
                lista.push(element);
            }
           
        });

        this.setState({associates:lista})
    }


    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
        this.findAll();
    }

    

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      delete = (associatesId) =>{
        this.service.delete(associatesId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Associado Excluido Com Sucesso' });
                await this.delay(2000);
                window.location("/associates")
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Associado' });
            })
    }

    editar = (associatesId) => {
        window.location.href = `/updateUser/${associatesId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Associado Confirmado', life: 3000 });
        this.delete(this.state.associatesId.idContaAcesso);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Associado Não Deletado', life: 3000 });
    };


    
    confirm = async (associatesId) => {
        this.setState({associatesId: associatesId})
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Associado?',
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

                        <br/>
                        <div className="input-texts">
                        <Dropdown
                        value={this.state.tipoAssociate}
                        options={this.state.tipoAssociateSelectItems}
                        onChange={e => {
                            this.setState({ tipoAssociate: e.value });
                        }}
                        placeholder='TIPO'
                        />
                    <div>
                        <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.validarTipo}
                            title="Filtrar" severity="warning" raised />
                    </div>
                        
                    </div>
                   
                        <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="PROCURAR"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => { this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos" severity="warning" raised />
                        </div>

                        <br/>

                
                       
                    </div>

                </div>

                <div className="associates">
                    <CardListUsers
                        associates = {this.state.associates}
                        delete = {this.confirm}
                        editar = {this.editar}
                       
                    />
                    
                </div>
            </div>
            </>
        )
    }

}