/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import './ListUsers.css';
import { Toast } from 'primereact/toast';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';
import MenuLeft from "../../components/Menu/MenuLeft"

import ContaAcessoService from "../../services/ContaAcessoService";
import AssociateService from "../../services/AssociateService";
import TutorService from "../../services/TutorService";
import ManagerService from "../../services/ManagerService";
import CardListUsers from "../../components/cardListUsers/CardListUsers";

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ListUsers extends React.Component {

    state = {
        items: [{ label: 'Associados', url: "/associates" }],
        home: { icon: 'pi pi-home ', url: '/' },

        contasAcesso: [
            {
                idContaAcesso: 0,
                nome: '',
                email: '',
                senha: '',
                telefone: '',
                linkWhatsapp: '',
                ativo: '',
                qrcode: '',
                tipo: ''
            },
        ],
        token: '',
        toast: '',
        nomeParaFiltro: '',

        associatesFiltro: [
            {
                idContaAcesso: '',
                nome: '',
                email: '',
                senha: '',
                telefone: '',
                linkWhatsapp: '',
                ativo: '',
                qrcode: '',
                tipo: ''

            }
        ],

        tipoAssociateSelectItems: [
            { label: 'ASSOCIADO', value: 'ASSOCIADO' },
            { label: 'TUTOR', value: 'TUTOR' },
            { label: 'GESTOR', value: 'GESTOR' }
        ],
        tipoAssociate: '',

    }

    constructor() {
        super();
        this.service = new ContaAcessoService();
    }

    async componentDidMount() {
        await this.service.findAll("")
            .then(response => {
                const contasAcesso = response.data;
                console.log(contasAcesso);
                this.setState({ contasAcesso });
                console.log("parei");
            }
            ).catch(error => {
                console.log('error');
                console.log(error.response);
                console.log("passou");
            }
            );

    }

    /**
     *  validarTipo = () => {
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
        } else {
            this.service = new AssociateService();
            this.listAssociates();
        }

    }
     */
   

    listAssociates = async () => {
        await this.service.findByTipo("ASSOCIADOS")
            .then(response => {
                const contasAcesso = response.data;
                this.setState({ contasAcesso });
                console.log("listAssociates");
            }).catch(error => {
            });
    }

    listTutor = async () => {
        await this.service.findByTipo("TUTORES")
            .then(response => {
                const associates = response.data;
                this.setState({ associates });
            }).catch(error => {
            });

    }

    listGestor = async () => {
        await this.service.findByTipo("GESTORES")
            .then(response => {
                const associates = response.data;
                this.setState({ associates });
            }).catch(error => {
            });

    }

    filtro = () => {
        let lista = []
        this.state.contasAcesso.forEach(element => {
            if (element.nome === this.state.nomeParaFiltro) {
                lista.push(element);
            }
        });
        this.setState({ contasAcesso: lista })
        console.log("teste", this.state.contasAcesso)
    }

    limparFiltro = () => {
        this.setState({ nomeParaFiltro: '' })
    }

    filtroTipo = async () =>{
        /**
         * let lista = []
        this.state.contasAcesso.forEach(element => {
            if(element.tipo === this.state.tipoAssociate){
                lista.push(element);
            }
        });
        this.setState({contasAcesso:lista})
        console.log("teste",this.state.contasAcesso)
         */
        

        await this.service.findByTipo(this.state.tipoAssociate)
            .then(response => {
                const contasAcesso = response.data;
                this.setState({ contasAcesso });
                console.log("listAssociates");
            }).catch(error => {
            });
       
      }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    delete = (idContaAcesso) => {
        this.service.delete(idContaAcesso)
            .then(async (response) => {
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro Excluido Com Sucesso' });
                await this.delay(2000);
                window.location.reload();
            }).catch(error => {
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir' });
            })
    }

    editar = (idContaAcesso) => {
        window.location.href = `/updateUser/${idContaAcesso}`;

    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Cadastro Excluido', life: 3000 });
        this.delete(this.state.contasAcesso.idContaAcesso);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: ' Não Deletado', life: 3000 });
    };



    confirm = async (idContaAcesso) => {
        //this.validarTipo();
        this.setState({ idContaAcesso : idContaAcesso })
        confirmDialog({

            message: 'Você Realmente quer Deletar esse Cadastro?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',

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
                        rejectLabel="Não" />

                    <div className="header">
                        <div>
                            <BreadCrumb model={this.state.items} home={this.state.home} />
                            <br />

                            <div className="filtragem">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search " />
                                    <InputText placeholder="PROCURAR"
                                        value={this.state.nomeParaFiltro}
                                        onChange={(e) => { this.setState({ nomeParaFiltro: e.target.value }) }} />
                                </span>

                                <Button className="bt-filtro" label="Filtrar"
                                    onClick={this.filtro}
                                    title="Filtrar" severity="warning" raised />

                                <Button className="bt-filtro" label="Limpar Filtro"
                                    onClick={this.limparFiltro}
                                    title="Listar Todos" severity="warning" raised />
                            </div>
                            <div className="input-status">
                                <Dropdown
                                    value={this.state.tipoAssociate}
                                    options={this.state.tipoAssociateSelectItems}
                                    onChange={e => {
                                        this.setState({ tipoAssociate: e.value });
                                    }}
                                    placeholder='TIPO'
                                />
                                <Button className="bt-filtro" label="Filtrar"
                                    onClick={this.filtroTipo}
                                    title="Filtrar" severity="warning" raised />
                            </div>

                            <div className="divCreat">
                                <a href="/createUser">
                                    <Button className="btCreat"
                                        severity="warning"
                                        raised>
                                        <FontAwesomeIcon icon={faPlus}
                                            style={{ color: "#0b6429", }} /></Button>
                                </a>
                            </div>

                            <br />
                        </div>

                    </div>

                    <div className="associates">
                        <CardListUsers
                            contasAcesso={this.state.contasAcesso}
                            delete={this.confirm}
                            editar={this.editar}
                        />


                    </div>
                </div>
            </>
        )
    }

}