import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';

import AssociateService from "../../services/AssociateService";
import ManagerService from "../../services/ManagerService";
import TutorService from "../../services/TutorService";

import './UpdateUser.css'

import Menu from "../../components/Menu/Menu";

export default class updateUser extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items:[{ label: 'Associados', url:"/associates" }, { label: 'Atualizar Cadastrar'}],
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
   

    validarTipo = () => {
        console.log('entrou no validar tipo');
        if (this.state.tipoAssociate === 'ASSOCIADO') {
            this.service = new AssociateService();
        } else if (this.state.tipoAssociate === 'GESTOR') {
            this.service = new ManagerService();
            console.log('entoru no if');
        } else if (this.state.tipoAssociate === 'TUTOR') {
            this.service = new TutorService();
        } else{
            this.service = new AssociateService();    
        }
        
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
      componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        this.findId(id)
    }

   editar  = async () =>{
    this.validarTipo();
    await this.service.update(this.state.associateId,{
        nome:this.state.nome,
        email:this.state.email,
        senha:this.senha,
        telefone: this.state.telefone,
        ativo:this.state.ativo,
        linkWhatsapp: this.state.linkWhatsapp,
    }).then(async (response) =>{
        this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Atualizado Com Sucesso' });
        await this.delay(2000);
        window.location.href = `/associates`;
    })
        .catch(error =>{

            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Atualizar' });

            console.log(error)
        })
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Atualizado com Sucesso', life: 3000 });
        this.editar();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Não foi Atualizado', life: 3000 });
    };

    confirm = async (associateId) => {
        this.setState({associateId: associateId})
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Editar?',
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
        
        if(this.state.email === ''){
            
            disparo ++;
            
            let a = document.getElementById('email') 
            a.classList.add('p-invalid')
        }
        const regex = /@/;
        if (!regex.test(this.state.email)) {
            this.setState({errorEmail:'Esse Campo precisa ser um e-mail'})
          }
        if(this.state.senha === ''){
            disparo ++;
            let a = document.getElementById('senha') 
            a.classList.add('p-invalid')
        }

        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }

        
    }

   
    findId = (id) =>{
        this.validarTipo();
        this.service.findById(`/${id}`)
            .then(response =>{
                const associate = response.data;
                const id = associate.id
                const nome = associate.nome
                const email = associate.email
                const senha = associate.senha
                const telefone = associate.telefone
                const ativo = associate.ativo
                const linkWhatsapp = associate.linkWhatsapp
                this.setState({id:id,nome:nome,email:email, senha:senha, telefone:telefone, ativo:ativo, linkWhatsapp:linkWhatsapp})

                console.log(this.state.associate, 'aaa')
            })
            .catch(error =>{
                console.log(error)
            })
    }
   
    render(){
    
         return(
            <>
             <Menu/>
                <div className="container">
                    <div className="header">
                    <Toast ref={(el) => (this.state.toast = el)} />
                    <ConfirmDialog 
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                    acceptLabel="Sim"
                    rejectLabel="Não"/>
                        <div>
                            <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                        </div>
                    </div>

                    <div >                
                    
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
                            <label htmlFor="email">E-mail</label>
                            <InputText id="email" className="borderColorEdit" type="text" value= 
                            {this.state.email} 
                            onChange={(e) => { this.setState({email: e.target.value }) }}
                            />
                            {this.state.errorEmail && <span style={{ color: 'red' }}>{this.state.errorEmail}</span>}
                        </div>
                    </div>


                    <div className="input-texts">
                        <div className="input-um">
                            <label  htmlFor="senha">Senha</label>
                            <InputText id="senha" className="borderColorEdit" type="text" value= {this.state.senha} 
                            onChange={(e) => { this.setState({senha: e.target.value }) }}/>
                            {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                        </div>
                    </div>


                    <div className="input-texts">
                        <div className="input-um">
                            <label  htmlFor="linkWhatisapp">Link do Whatsapp</label>

                            <InputText id="linkWhatsapp" className="borderColorEdit" type="text" 
                            value= {this.state.linkWhatsapp} 
                            onChange={(e) => { this.setState({linkWhatsapp: e.target.value }) }}/>
                            {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}

                        </div>
                        
                    </div>

                    <div className="input-texts">
                        <div className="input-um">
                            <label  htmlFor="telefone">Telefone</label>
                            <InputText id="telefone" className="borderColorEdit" type="text" 
                            value= {this.state.telefone} 
                            onChange={(e) => { this.setState({telefone: e.target.value }) }}/>
                            {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                        </div>
                        
                    </div>

                    <br/>
            
                    <div className="input-texts">
                        <div>
                            <Dropdown
                                value={this.state.ativo}
                                options={this.state.ativoSelectItems}
                                onChange={e => {
                                this.setState({ ativo: e.value });
                                }}
                                placeholder='SELECIONE UM STATUS'
                            />
                        </div>
                        
                    </div>

                    <div className="bts">
                        <div className="bt">
                            <Button label="Salvar" severity="warning" raised onClick={this.validar} />
                        </div>
                        <div className="bt">
                            <a href="/associates"><Button label="CANCELAR" ></Button></a>
                        </div>

                    </div>            
                    
                </div>
            </div>
        
        </>

        )
       
    }
}