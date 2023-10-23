/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { Dropdown } from "primereact/dropdown";

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";

import AssociateService from "../../services/AssociateService";
import ManagerService from "../../services/ManagerService";
import TutorService from "../../services/TutorService";

import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/Toastr";

import "./UpdateUser.css";


import MenuLeft from "../../components/Menu/MenuLeft";

export default class updateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { label: "Associados", url: "/associates" },
        { label: "Atualizar Cadastrar" },
      ],
      home: { icon: "pi pi-home ", url: "/" },
      
      associates: [
        {
     
          contaAcesso: {
            idContaAcesso: 0,
            nome: "",
            email: "",
            senha: "",
            telefone: "",
            linkWhatsapp: "",
            ativo: "",
            qrcode: "",
          },
        },
      ],

      tipoAssociateSelectItems: [
        { label: "ASSOCIADO", value: "ASSOCIADO" },
        { label: "TUTOR", value: "TUTOR" },
        { label: "GESTOR", value: "GESTOR" },
      ],
      tipoAssociate: "",

      ativoSelectItems: [
        { label: "ATIVO", value: true },
        { label: "NÃO ATIVO", value: false },
      ],
      ativo: "",
      toast: "",
      msgDeErro: "",
      error: "",
      errorEmail: "",
    };
  }

  validarTipo = () => {
    console.log("entrou no validar tipo");
    if (this.state.tipoAssociate === "ASSOCIADO") {
      this.service = new AssociateService();
    } else if (this.state.tipoAssociate === "GESTOR") {
      this.service = new ManagerService();
      console.log("entoru no if");
    } else if (this.state.tipoAssociate === "TUTOR") {
      this.service = new TutorService();
    } else {
      this.service = new AssociateService();
    }
  };

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  componentDidMount() {
    const url = window.location.href;
    const idContaAcesso = url.substring(url.lastIndexOf('/') + 1);
    this.findById(idContaAcesso);
  }

  findById = (idContaAcesso) => {
    this.service.find(idContaAcesso)
      .then((response) => {
        const associado = response.data;
        const idContaAcesso = associado.idContaAcesso;
        const nome = associado.nome;
        const email = associado.email;
        const senha = associado.senha;
        const telefone = associado.unidadeMedida;
        const linkWhatsapp = associado.linkWhatsapp;
        const ativo = associado.ativo;
        const qrcode = associado.qrcode;
        const tipoAssociate = associado.tipoAssociate;

        this.setState({ idContaAcesso: idContaAcesso, nome: nome, email:email, senha:senha, telefone:telefone,linkWhatsapp:linkWhatsapp,ativo:ativo,qrcode:qrcode, tipoAssociate:tipoAssociate});
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
 
  validate = () => {
    const errors = [];

    if (!this.state.nome) {
      errors.push("É obrigatório informar o nome!");
    }
    if (!this.state.email) {
      errors.push("É obrigatório informar o email!");
    }
    if (!this.state.senha) {
      errors.push("É obrigatório informar uma senha!");
    }
    if (!this.state.telefone) {
      errors.push("É obrigatório informar o telefone!");
    }
    if (!this.state.linkWhatsapp) {
      errors.push("É obrigatório informar o link do whatsapp!");
    }
    return errors;
  };

  put = () => {
    const errors = this.validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .update(this.state.idContaAcesso, {
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
        telefone:this.state.telefone,
        linkWhatsapp: this.state.linkWhatsapp,
        ativo: this.state.state.ativo,
        qrcode: this.qrcode,
        tipoAssociate: this.tipoAssociate
      })
      .then((Response) => {
        showSuccessMessage("Insumo atualizado com sucesso!");
        console.log(Response);
        this.props.history.push("/listInsumos");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.Response);
      });
  };

  cancel = () => {
    this.props.history.push("/listInsumos");
  };
  

 
  confirm = async (associateId) => {
    this.setState({ associateId: associateId });
    // eslint-disable-next-line no-unused-vars
    const a = document.getElementsByClassName(
      "p-button p-component p-confirm-dialog-reject p-button-text"
    );
    confirmDialog({
      message: "Você Realmente quer Editar?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
    document.getElementsByClassName("p-button-label")[7].textContent = "Sim";
    document.getElementsByClassName("p-button-label")[6].textContent = "Não";
  };

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

          <div>
            <div className="input-texts">
              <div className="input-um">
                <label htmlFor="nome">Nome</label>

                <InputText
                  id="nome"
                  className="borderColorEdit"
                  type="text"
                  onChangeText={(nome) => this.setState({nome})}
                  value={this.state.nome}
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>

            <div className="input-texts">
              <div className="input-um">
                <label htmlFor="email">E-mail</label>
                <InputText
                  id="email"
                  className="borderColorEdit"
                  type="text"
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  
                />
                {this.state.errorEmail && (
                  <span style={{ color: "red" }}>{this.state.errorEmail}</span>
                )}
              </div>
            </div>

            <div className="input-texts">
              <div className="input-um">
                <label htmlFor="senha">Senha</label>
                <InputText
                  id="senha"
                  className="borderColorEdit"
                  type="text"
                  onChangeText={(senha) => this.setState({senha})}
                  value={this.state.senha}
                  
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>

            <div className="input-texts">
              <div className="input-um">
                <label htmlFor="linkWhatisapp">Link do Whatsapp</label>

                <InputText
                  id="linkWhatsapp"
                  className="borderColorEdit"
                  type="text"
                  value={this.state.linkWhatsapp}
                  onChange={(e) => {
                    this.setState({ linkWhatsapp: e.target.value });
                  }}
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>

            <div className="input-texts">
              <div className="input-um">
                <label htmlFor="telefone">Telefone</label>
                <InputText
                  id="telefone"
                  className="borderColorEdit"
                  type="text"
                  value={this.state.telefone}
                  onChange={(e) => {
                    this.setState({ telefone: e.target.value });
                  }}
                />
                {this.state.error && (
                  <span style={{ color: "red" }}>{this.state.error}</span>
                )}
              </div>
            </div>

            <br />

            <div className="input-texts">
              <div>
                <Dropdown
                  value={this.state.ativo}
                  options={this.state.ativoSelectItems}
                  onChange={(e) => {
                    this.setState({ ativo: e.value });
                  }}
                  placeholder="SELECIONE UM STATUS"
                />
              </div>
            </div>

            <div className="bts">
              <div className="bt">
                <Button
                  label="SALVAR"
                  severity="warning"
                  raised
                  onClick={this.put}
                />
              </div>
              <div className="bt">
              <Button
                  label="CANCELAR"
                  severity="warning"
                  raised
                  onClick={this.cancel}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
