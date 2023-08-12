/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Toast } from 'primereact/toast';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from "primereact/breadcrumb";

import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import Menu from "../../components/Menu/Menu"

import ManagerService from "../../services/ManagerService";

export default class UpdateUser extends React.Component{

    state = {
        items:[{ label: 'Associados', url:"/associates" }, 
        { label: 'Atualizar Cadastro'}],

        home: {icon: 'pi pi-home ', url: '/' },
        tipos: [
            {tipo:'ATIVO'},{tipo:'NÃO ATIVO'}
        ],
        estado:{nome:''},

                id:'',
                nome:'',
                email:'',
                senha:'',
                telefone:'',
                linkwhatsapp:'',
                qrcode:'',
                toast:''
        
    }

    componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        this.findByid(id)
    }

    constructor(){
        super();
        this.service = new ManagerService();
        console.log(this.state.associate.contaAcesso)
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

   update  = async () =>{
    await this.service.update(this.state.idContaAcesso,{

        nome:this.state.nome,
        email:this.state.email,
        senha: this.state.senha,

        telefone:this.state.telefone,
        linkwhatsapp: this.state.linkwhatsapp,
        estado:this.state.estado.tipo,
       
    }).then(async (response) =>{
        this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: ' Editado Com Sucesso' });

        await this.delay(2000);
        window.location.href = `/users`;
    })
        .catch(error =>{

            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Editar' });

            console.log(error)
        })
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Confirmado', life: 3000 });
        this.editar();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: ' Não Deletado', life: 3000 });
    };

    confirm = async (associateId) => {
        this.setState({associateId: associateId})
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Editar esse Gestor?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        await this.delay(10);
        document.getElementsByClassName('p-button-label')[7].textContent = "Sim"
        document.getElementsByClassName('p-button-label')[6].textContent = "Não"
    };


    validar = () =>{
        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Campos não podem ser nulos' };
        let disparo = 0;
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome'); 
            a.classList.add('p-invalid');
            this.setState({error:'Esse Campo é Obrigatorio'})
        }
        if(this.state.telefone === ''){
            disparo ++;
            let a = document.getElementById('telefone') 
            a.classList.add('p-invalid')
        }
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome') 
            a.classList.add('p-invalid')
        }
        if(this.state.email === ''){
            
            disparo ++;
            
            let a = document.getElementById('email') 
            a.classList.add('p-invalid')
        }
        const regex = /@/;
        if (!regex.test(this.state.email)) {
            this.setState({errorEmail:'Esse Campo precisa ser um e-mail'})
          }
        if(this.state.estado === ''){
            disparo ++;
            let a = document.getElementById('estado') 
            a.classList.add('p-invalid')
        }
        if(this.state.senha === ''){
            disparo ++;
            let a = document.getElementById('senha') 
            a.classList.add('p-invalid')
        }
        
        
        if(this.state.estado.nome === ''){
            disparo ++;
            let a = document.getElementById('seletor-estado') 
            a.classList.add('p-invalid')
        }
        
        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }

        
    }

    findByid = (id) =>{
        this.service.find(`/${id}`)
            .then(response =>{

                const user = response.data;

                const id = user.id;
                const nome = user.nome;
                const email = user.email;

                const senha = user.passoword
                const telefone = user.telefone;
                const linkWhatsapp = user.linkWhatsapp;

                const tipo = user.tipo;
                const estado = user.estado;
                const qrcode = user.qrcode;

                this.setState({id:id,nome:nome, email:email, senha:senha, telefone:telefone, linkWhatsapp:linkWhatsapp,
                    tipo:tipo, estado:estado, qrcode:qrcode})

                console.log(this.state.associate.contaAcesso, 'ok')
            })
            .catch(error =>{
                console.log(error)
            })
    }

    render() {
        return(
            <>
            <Menu/>
            <div className="container">
                <div className="header">
                <Toast ref={(el) => (this.state.toast = el)} />
                    <div className="header">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                </div>
                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className="borderColorEdit" type="text"
                         value={this.state.nome}
                        onChange={(e) => { this.setState({nome: e.target.value }) }} />
                        {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" className="borderColorEdit" type="text"
                         value={this.state.email}
                        onChange={(e) => { this.setState({email: e.target.value }) }} />
                        {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="telefone">Telefone</label>
                        <InputText id="telefone" className="borderColorEdit" type="text"
                         value={this.state.telefone}
                        onChange={(e) => { this.setState({telefone: e.target.value }) }} />
                        {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="senha">Senha</label>
                        <InputText id="senha" className="borderColorEdit" type="text"
                         value={this.state.senha}
                        onChange={(e) => { this.setState({senha: e.target.value }) }} />
                        {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="linkWhatsapp">Link do Whatsapp</label>
                        <InputText id="senha" className="borderColorEdit" type="text"
                         value={this.state.linkwhatsapp}
                        onChange={(e) => { this.setState({senha: e.target.value }) }} />
                        {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                    </div>
                </div>
                    
                </div>
                <div className="input-texts">
                        <Dropdown id="seletor" 
                        value={this.state.estado} 
                        onChange={(e) => this.setState({estado: this.estado = e.value})} 
                        options={this.state.tipos} 
                        optionLabel="tipo" 
                        placeholder="Status" />
                </div>
               
                <div className="bts">
                    <div className="bt-save">
                        <Button className="bt" label="SALVAR" onClick={this.update} />
                    </div>
                    <div className="bt-cancel">
                         <Button className="bt" label="CANCELAR" />
                    </div>
                </div>
        </>
        )
    }
}