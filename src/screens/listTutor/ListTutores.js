/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import './ListTutores.css';

import { Toast } from 'primereact/toast';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import MenuLeft from "../../components/Menu/MenuLeft"

import CardListTutores from "../../components/cardListTutores/CardListTutores";

import { faPlus} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ListTutores extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
        items:[{label: 'Associados', url:"/associates" }],
        home: {icon: 'pi pi-home ', url: '/' },
       
        tutores: [
            {
                contaAcesso:{
                    idContaAcesso: 0,
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
        
      tutoresFiltro:[
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
        ],

        tipoAssociateSelectItems: [
            { label: 'ASSOCIADO', value: 'ASSOCIADO' },
            { label: 'TUTOR', value: 'TUTOR' },
            { label: 'GESTOR', value: 'GESTOR' }
        ],
        tipoAssociate: '',
        
    }
}
 
async componentDidMount() {
    await this.service.findAll('')
        .then(response => {
            const tutores = response.data;
            
            this.setState({ tutores });
            console.log(response);
        }
        ).catch(error => {
            console.log('error');
            console.log(error.response);
        }
    );
}
   
    
    filtro = () =>{
        let lista = []
        this.state.tutores.forEach(element => {
            if(element.contaAcesso.nome === this.state.nomeParaFiltro){
                lista.push(element);
            }
        });
        this.setState({tutores:lista})
        console.log("teste",this.state.tutores)
    }

    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
    
      delete = (idContaAcesso) =>{
        this.service.delete(idContaAcesso)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir' });
            })
    }

    editar = (idContaAcesso) => {
        window.location.href = `/updateUser/${idContaAcesso}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Cadastro Excluido', life: 3000 });
        this.delete(this.state.idContaAcesso);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: ' Não Deletado', life: 3000 });
    };


    
    confirm = async (idContaAcesso) => {
        this.setState({idContaAcesso: idContaAcesso})
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Cadastro?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        await this.delay(10);
       
    };

    render(){
        return(
            <>
            <MenuLeft/>
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
                            title="Filtrar" />
                    </div>
                </div>
                        <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="PROCURAR"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => {this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar"/>

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos"/>
                        </div>

                        <div className="divCreat">
                            <a href="/createUser">
                            <Button className="btCreat" >
                            <FontAwesomeIcon icon={faPlus}
                          style={{color: "#0b6429",}} /></Button>
                            </a>
                        </div>  

                        <br/>
                    </div>

                </div>

                <div className="tutores">
                    <CardListTutores
                        tutores = {this.state.tutores}
                        delete = {this.confirm}
                        editar = {this.editar}
                    />
                    
                </div>
            </div>
            </>
        )
    }

}