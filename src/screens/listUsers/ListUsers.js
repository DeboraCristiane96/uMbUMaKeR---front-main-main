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

import { faPlus} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ListUsers extends React.Component{

    state = {
        items:[{label: 'Associados', url:"/associates" }],
        home: {icon: 'pi pi-home ', url: '/' },
       
        associateId:'',

        associates:[
            {
                contaAcesso:{
                    id:'',
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
        token:'',
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

 

    validarTipo = () => {
        console.log('entrou no validar tipo');
        if (this.state.tipoAssociate === 'ASSOCIADO') {
            this.service = new AssociateService();
            this.listAssociates();
        } else if (this.state.tipoAssociate === 'GESTOR') {
            this.service = new ManagerService();
            this.listGestor();
            console.log('entoru no if');
        } else if (this.state.tipoAssociate === 'TUTOR') {
            this.service = new TutorService();
            this.listTutor();
        }else{
            this.service = new AssociateService();    
            this.listAssociates();
        }
        
    }
   
    async componentDidMount() {
        this.validarTipo();
        await this.service.findAll('')
            .then(response => {
                const associates = response.data;
                
                this.setState({ associates });
                console.log(response);
            }
            ).catch(error => {
                console.log('errrrrror');
                console.log(error.response);
            }
        );
    }


    listAssociates = async () => {
        await this.service.findAll('')
            .then(response => {
            const associates = response.data;
            this.setState({ associates });
        }).catch(error => {
        });
    }

    listTutor = async () => {
        await this.service.findAll('')
        .then(response => {
            const associates = response.data;
            this.setState({ associates });
        }).catch(error => {
        });
        
    }

    listGestor = async () => {
        await this.service.findAll('')
        .then(response => {
            const associates = response.data;
            this.setState({ associates });
        }).catch(error => {
        });
        
    }


    filtroByNome = () =>{
        this.validarTipo();
        let lista = []
        this.state.associates.forEach(element => {
            if(element.nome === this.state.nomeParaFiltro){
                lista.push(element);
            }
        });
        this.setState({associates:lista})
        console.log("teste",this.state.lista)
    }
    
    
    filtro = () =>{
        this.validarTipo();
        let lista = []
        this.state.associates.forEach(element => {
            if(element.nome === this.state.nomeParaFiltro){
                lista.push(element);
            }
        });
        this.setState({associates:lista})
        console.log("teste",this.state.associates)
    }

    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
    }
    

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
    
      
      delete = (associateId) =>{
        this.service.delete(associateId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: ' Cadastro Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Cadastro ' });
            })
    }

    editar = (associateId) => {
        window.location.href = `/updateUser/${associateId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Cadastro Deletado Com Sucesso ', life: 3000 });
        this.delete(this.state.colaboradorId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Cadastro Mantido', life: 3000 });
    };
    
    confirm = async (associateId) => {
        this.setState({associateId: associateId})
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Cadastro?',
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
                            onClick={this.filtro}
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
                            onClick={this.filtroByNome}
                            title="Filtrar" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos" severity="warning" raised />
                        </div>

                        <div className="divCreat">
                            <a href="/createUser">
                            <Button className="btCreat" 
                            severity="warning" 
                            raised>
                            <FontAwesomeIcon icon={faPlus}
                          style={{color: "#0b6429",}} /></Button>
                            </a>
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