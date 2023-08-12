/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import './ListTutors.css';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';
import Menu from "../../components/Menu/Menu";

import TutorService from "../../services/TutorService";
import CardListTutors from "../../components/cardListTutors/CardListTutors";

export default class ListTutors extends React.Component{
    state = {
        items:[{ label: 'Tutores', url:"/tutors" }],

        home: {icon: 'pi pi-home ', url: '/' },

        tutors:[
            {

                idTutor:'',
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


        tutorsFiltro:[
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
        this.service = new TutorService();
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

    


    delete = (tutorsId) =>{
        this.service.delete(tutorsId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Tutor Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Tutor' });
            })
    }

    editar = (tutorsId) => {
        window.location.href = `/updateUser/${tutorsId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Tutor Confirmado', life: 3000 });
        this.delete(this.state.managersId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Tutor Não Deletado', life: 3000 });
    };


    
    confirm = async (tutorsId) => {
        this.setState({tutorsId: tutorsId})
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Tutor?',
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
                            title="Filtrar Tutores" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos os Tutores" severity="warning" raised />
                        </div>
                       
                    </div>

                </div>

                <div className="managers">
                    <CardListTutors
                        tutors ={this.state.tutors}
                        delete = {this.confirm}
                        editar = {this.editar}
                       
                    />
                    
                </div>
            </div>
            </>
        )
    }

}