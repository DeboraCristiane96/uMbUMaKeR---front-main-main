/* eslint-disable react/no-direct-mutation-state */

import React from "react";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import MenuLeft from "../../components/Menu/MenuLeft";
import CardLocalStorage from "../../components/cardLocalStorage/CardLocalStorage";
import LocalStorageService from "../../services/LocalStorageService";
import { Button } from "primereact/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadCrumb } from "primereact/breadcrumb";
export default class LocalStorage extends React.Component {
  state = {
    items: [{ label: "Armazenamento", url: "/Armazenamento" }],
    home: { icon: "pi pi-home ", url: "/" },

    local: [
      {
        codigo: 0,
        codigoArmario: 0,
        codigoNicho: 0
      },
    ]
  };

  constructor() {
    super();
    this.service = new LocalStorageService();
  }

  async componentDidMount() {
    await this.service.findAll("")
      .then((response) => {
        const local = response.data;
        this.setState({ local });
        console.log(response);
      })

      .catch((error) => {
        console.log("erro!");
        console.log(error.response);
      });
  }
  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  delete = (codigoArmario) => {
    this.service.delete(codigoArmario)
      .then(async (response) => {
        this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Excluido Com Sucesso' });
        await this.delay(2000);
        window.location.reload();
      }).catch(error => {
        this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Cadastro' });
      })
  }
  editar = (codigoArmario) => {
    window.location.href = `/updateLocal/${codigoArmario}`;

  }
  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Cadastro Excluido",
      life: 3000,
    });
    this.delete(this.state.codigoArmario);
  };

  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Regeitado",
      detail: " Não Deletado",
      life: 3000,
    });
  };

  confirm = async (codigoArmario) => {
    this.setState({ codigoArmario: codigoArmario })
    confirmDialog({
      message: "Você Realmente quer Deletar esse Cadastro ?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-success",

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
          <confirmDialog
            acceptClassName="p-button-success"
            rejectClassName="p-button-danger"
            acceptLabel="Sim"
            rejectLabel="Não"
          />
          <div>
            <BreadCrumb model={this.state.items} home={this.state.home} />

          </div>
          <div className="divCreat">
            <a href="/createLocalStorage">
              <Button className="btCreat" >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: "#0b6429" }}
                />
              </Button>
            </a>
          </div>
          <div className="local">
            <CardLocalStorage
              local={this.state.local}
              delete={this.confirm}
              editar={this.editar}
            />
          </div>
        </div>
      </>
    );
  }
}
