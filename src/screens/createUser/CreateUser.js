/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Toast } from 'primereact/toast';

import { Dropdown } from 'primereact/dropdown';

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import Menu from "../../components/Menu/Menu";

import AssociateService from "../../services/AssociateService";
import TutorService from "../../services/TutorService";
import ManagerService from "../../services/ManagerService";

import './CreateUser.css'

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando do formulário com sucesso! ");
};

export default class CreateUser extends React.Component{  

    constructor(props){
        super(props);

        this.state = {
            items:[{ label: 'Associados', url:"/associates" }, { label: 'Cadastrar'}],
            home: {icon: 'pi pi-home ', url: '/' },
            associados:[
                {
                    id:'',
                    nome:'',
                    email:'',
                    senha:'',
                    telefone:'',
                    linkWhatsapp:'',
                    ativo:'',
                    tipo:'',
                    qrcode:''
                }
            ],

            tipoAssociateSelectItems: [
				{ label: 'ASSOCIADO', value: 'ASSOCIADO' },
				{ label: 'TUTOR', value: 'TUTOR' },
				{ label: 'GESTOR', value: 'GESTOR' }
			],
            tipoAssociate: '',
            
			

            ativoSelectItems: [
				{ label: 'ATIVO', value: true},
				{ label: 'NÃO ATIVO', value: false }
				
			],
			ativo: '',

        toast:'',

        msgDeErro:'',
        error:'',
        errorEmail:''
       }
        
    }
    
    validarTipo =() =>{
        if(this.tipoAssociate ==='ASSOCIADO' ){
            this.state.service = new AssociateService(); 
        }
        if(this.state.tipoAssociate ==='GESTOR' ){
            this.service = new ManagerService();
        }
        if(this.tipoAssociate ==='TUTOR'){
            this.state.service = new TutorService();
        }
    }
  
    validar = () =>{
        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Campos não podem ser nulos' };
        let disparo = 0;
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome'); 
            this.setState({error:'Esse Campo é Obrigatorio!'})
            a.classList.add('p-invalid')
        }
        if(this.state.email === ''){
            disparo ++;
            let a = document.getElementById('email') 
            a.classList.add('p-invalid')
        }
        if(this.state.linkWhatsapp === ''){
            disparo ++;
            let a = document.getElementById('linkWhatsapp') 
            a.classList.add('p-invalid')
        }
        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.validarTipo();
            this.confirm();
        }
    }

    

    confirm = () => {
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Deseja realizar esse Cadastro ?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',

            accept:this.accept,
            reject:this.reject,
            
        });
       
    };

    save = async () =>{
       
        await this.service.create(
            {
                nome:this.state.nome,
                email:this.state.email,
                senha:this.state.senha,
                telefone: this.state.telefone,
                linkWhatsapp:this.state.linkWhatsapp,
                ativo:this.state.ativo,
                tipo:this.state.tipoAssociate, 
                qrCode:this.state.qrCode    
 
        }
       ).then ( (response) =>{
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado!' });
            this.delay(2000);
            
        }).catch(error =>{
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar!' });
            console.log(error.response)
        })
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Cadastro realizado com sucesso!', life: 3000 });
        this.save();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Cadastro Cancelado!', life: 3000 });
    };

    
    

    render(){
        return(
            <>
            <Menu/>
            <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <Toast ref={(ex) => (this.state.toast = ex)} />
                    <div className="header">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <br/>
                    <label htmlFor="nome">Nome</label>
                <div className="input-texts">
                    <div className="input-um">
                        <InputText id="nome" className="borderColorEdit" type="text"
                        onChange={(e) => { this.setState({nome: e.target.value }) }}
                        value={this.state.nome}
                         />
                        {this.state.error && <span className="error">{this.state.error}</span>}
                    </div>
                </div>
                <br/>
                <label htmlFor="email">E-mail</label>
                <div className="input-texts">
                    <div className="input-um">
                        <InputText type="text" 
                        value={this.state.email}
                       onChange={(e) => { this.setState({email: e.target.value }) }}/>
                       {this.state.errorEmail && <span className="error">{this.state.errorEmail}</span>}
                   </div>
                </div>
                <br/>
                <label htmlFor="senha">Senha</label>
                <div className="input-texts">                    
                    <div className="input-dois">
                        <InputText type="text"
                        value={this.state.senha}
                        onChange={(e) => { this.setState({senha: e.target.value }) }}/>
                        {this.state.error && <span className="error">{this.state.error}</span>}
                    </div>
                </div>
                <br/>
                <label htmlFor="telefone">Telefone</label>
                <div className="input-texts">
                    <div className="input-um">
                        <InputText type="text" 
                        value={this.state.associados.telefone}
                        onChange={(e) => { this.setState({telefone: e.target.value })}}/>
                         {this.state.error && <span className="error">{this.state.error}</span>}
                    </div>
                                 
                </div>
                <br/>
                <label htmlFor="linkWhatsapp">Link do Whatsapp</label>
                <div className="input-texts">
                    <div className="input-um">
                        <InputText  type="text"
                        value={this.state.associados.linkWhatsapp}
                        onChange={(e) => { this.setState({linkWhatsapp: e.target.value }) }}/>
                        {this.state.error && <span className="error">{this.state.error}</span>}
                    </div>
                    
                </div>
                <br/>
                <div className="input-texts">
                        <Dropdown
                        value={this.state.tipoAssociate}
                        options={this.state.tipoAssociateSelectItems}
                        onChange={e => {
                            this.setState({ tipoAssociate: e.value });
                        }}
                        placeholder='Selecione o tipo'
                        />
                </div>
                <br/>
                <div className="input-texts">
                    <Dropdown
                        value={this.state.ativo}
                        options={this.state.ativoSelectItems}
                        onChange={e => {
                            this.setState({ ativo: e.value });
                        }}
                        placeholder='Selecione o status'
                    />
                </div>
                <br/>
                </div>
                <div className="bts">
                <div className="bt">
                    <ConfirmDialog 
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    />
                    <Button label="SALVAR" raised onClick={this.validar} />
                </div>
                <div className="bt">
                    <a href="/users"><Button label="CANCELAR" ></Button></a>
                </div>
                </div>
                </form>    
            </div>
            </>
        )
    }
}