/* eslint-disable react/no-direct-mutation-state */
import React from "react"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./EntradaSaidaInsumos.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import EntradaEstoqueService from "../../services/EntradaEstoqueService";
import SaidaEstoqueService from "../../services/SaidaEstoqueService";
import MenuLeft from "../../components/Menu/MenuLeft";
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from "primereact/inputswitch";
import CardListarEntradas from "../../components/CardListarEntradas/CardListarEntradas";
import CardListarSaidas from "../../components/CardListarSaidas/CardListarSaidas";


export default class EntradaSaidaInsumos extends React.Component {

    state = {
        items: [{ label: "Entrada e Saida", url: "/zonaMM" }],
        home: { icon: "pi pi-home ", url: "/" },
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

        toast: "",
        msgDeErro: "",
        error: "",
        checked: true
    }

    constructor() {
        super();
        this.entradaEstoqueService = new EntradaEstoqueService();
        this.saidaEstoqueService = new SaidaEstoqueService();
    }

    delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    async componentDidMount() {
        //Chamar os metodos findAll de Entrada
        //e Saida!!!
        this.findAllEntrada();
        this.findAllSaida();
    }


    salvar = async () => {
        await this.service
            .create({
                nome: this.state.nome,
                qntPessoas: this.state.qntPessoas,
            })
            .then(async (response) => {
                this.state.toast.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Salvo Com Sucesso",
                });
                await this.delay(2000);
                window.location.href = `/zonas`;
            })
            .catch((error) => {
                this.state.toast.show({
                    severity: "error",
                    summary: "Erro",
                    detail: "Erro ao Salvar",
                });

                console.log(error);
            });
    };



    accept = () => {
        this.state.toast.show({
            severity: "info",
            summary: "Confirmado",
            detail: "Cadastro Realizado com Sucesso",
            life: 3000,
        });
        this.salvar();
    };

    reject = () => {
        this.state.toast.show({
            severity: "warn",
            summary: "Rejeitado",
            detail: "Cadastro Cancelado",
            life: 3000,
        });
    };

    confirm = async (zonaId) => {
        this.setState({ zonaId: zonaId });
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName(
            "p-button p-component p-confirm-dialog-reject p-button-text"
        );
        confirmDialog({
            message: "Deseja realizar esse Cadastro ?",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",

            accept: this.accept,
            reject: this.reject,
        });
        await this.delay(10);
    };

    validar = () => {
        let msgError = {
            severity: "error",
            summary: "Corrija os Erros a Baixo",
            detail: "Campos não podem ser nulos",
        };
        let disparo = 0;
        if (this.state.nome === "") {
            disparo++;
            let a = document.getElementById("nome");
            a.classList.add("p-invalid");
            this.setState({ error: "Esse Campo é Obrigatorio" });
        }
        if (disparo !== 0) {
            this.state.toast.show(msgError);
        } else {
            this.confirm();
        }
    };

    filtor = () => {

    }

    findAllEntrada = async () => {
        await this.entradaEstoqueService.findAll("")
            .then((response) => {
                const entradasEstoque = response.data;
                this.setState({ entradasEstoque });

                console.log(response);
                console.log(entradasEstoque);
            })
            .catch((error) => {
                console.log("error");
                console.log(error.response);
            });
    }

    findAllSaida = async () => {
        await this.saidaEstoqueService.findAll("")
            .then((response) => {
                const saidasEstoque = response.data;
                this.setState({ saidasEstoque });

                console.log(response);
            })
            .catch((error) => {
                console.log("error");
                console.log(error.response);
            });
    }

    render() {
        return (
            <>
                <MenuLeft />
                <div className="container">
                    <div className="header">
                        <Toast ref={(el) => (this.state.toast = el)} />
                        <ConfirmDialog
                            acceptClassName="p-button-success"
                            rejectClassName="p-button-danger"
                            acceptLabel="Sim"
                            rejectLabel="Não"
                        />
                        <div>
                            <BreadCrumb
                                model={this.state.items}
                                home={this.state.home}
                            ></BreadCrumb>
                        </div>
                    </div>
                    <div className="body1">
                        <div className="total" htmlFor="total">
                            <div className="dias">
                                <p>{"DIAS"} </p>
                            </div>
                            <div className="icon02">
                                <FontAwesomeIcon icon={faTrashCanArrowUp} />
                            </div>
                        </div>
                        <div className="filtroData" htmlFor="filtroData">
                            <div >
                                <label htmlFor="dataDeInicio" className="font-bold block mb-2">De </label>
                                <br />
                                <div className="flex-auto">
                                    <Calendar value={this.state.dataInicio} onChange={(e) => this.setState({ dataInicio: e.target.value })} dateFormat="dd/mm/yy" />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="dataDeTermino" className="font-bold block mb-2">Ate </label>
                                <br />
                                <div className="flex-auto">
                                    <Calendar value={this.state.dataTermino} onChange={(e) => this.setState({ dataTermonio: e.target.value })} dateFormat="dd/mm/yy" />
                                </div>
                            </div>
                        </div>
                        <div className="quadroEntradaSaida" htmlFor="quadroEntradaSaida">
                            <div className="esquerda" htmlFor="esquerda">
                                <div className="divTituloQuadro">
                                    <label htmlFor="entradasLb" className="entradasLb">ENTRADAS </label>
                                    <div className="entredaBt">
                                        <Button
                                            className="editarBt"
                                            htmlFor="editarBt"
                                            onClick={(e) => ("1")}
                                            title="Editar"
                                 
                                            aria-label="Editar">
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                style={{ color: "#0b6429" }} />
                                        </Button>

                                        <InputSwitch checked={this.state.checked}
                                            onChange={(e) => this.setState(e.value)} />

                                        <Button
                                            className="deletarBt"
                                            onClick={(e) => delete ("1")}
                                            htmlFor="deletarBt"
                                            title="Deletar"
                                   
                                            aria-label="Deletar"
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt}
                                                style={{ color: "#0b6429" }} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="quadroEntradas" htmlFor="quadroEntradas">
                                    <CardListarEntradas
                                        entradasEstoque={this.state.entradasEstoque} />
                                </div>
                            </div>
                            <div className="direita" htmlFor="direita">
                                <div className="divTituloQuadro">
                                    <label htmlFor="saidasLb" className="saidasLb">SAÍDAS </label>
                                    <Button
                                        className="deletarBt"
                                        onClick={(e) => delete ("1")}
                                        style={{ color: "#0b6429" }}
                                        title="Deletar"
                                
                                        aria-label="Deletar"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                </div>
                                <div className="quadroSaidas" htmlFor="quadroSaidas">
                                    <CardListarSaidas
                                        saidasEstoque={this.state.saidasEstoque} />
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="bts">
                            <div className="bt">
                                <Button
                                    label="Salvar"
                                    onClick={this.validar}
                                />
                            </div>

                            <div className="bt">
                                <a href="/zonaMM">
                                    <Button label="CANCELAR"></Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
