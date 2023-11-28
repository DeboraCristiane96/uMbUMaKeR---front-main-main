/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import "./ListDevices.css";
import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { BreadCrumb } from "primereact/breadcrumb";

import { Button } from "primereact/button";
import MenuLeft from "../../components/Menu/MenuLeft";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardListDevices from "../../components/cardListDevices/CardListDevices";
import DeviceService from "../../services/DeviceService";
import { Dialog } from 'primereact/dialog';

export default class ListDevice extends React.Component {
  
  state = {
    items: [{ label: "Dispositivos", url: "/devices" }],
    home: { icon: "pi pi-home ", url: "/" },

    deviceId: "",

    devices: [{

      id:"",
      ultimaManutencao: "",
      modelo: "",
      temperaturaMaxima: "",
      eixoX: "",
      eixoY: "",
      eixoZ: "",
      tipoDispositivo: "",
      filamentosSelecionados: [],
      visible:false
      },
    ],
    token: "",
    toast: "",
  };

  constructor() {
    super();
    this.service = new DeviceService();
  }
 

    async componentDidMount() {
      await this.service.findAll("")
          .then(response => {
              const devices = response.data;
              
              this.setState({ devices });
              console.log(response);
          }
          ).catch(error => {
              console.log('falhou!');
              console.log(error.response);
          }
      );
  }

  setActiveIndex = () => {};

  detalhes = async () => {
    <div className="card flex justify-content-center">
    <Dialog header="Header"  style={{ width: '50vw' }} onHide={() => this.state.visible(true)}>
        <p className="m-0">
           ulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Dialog>
</div>
    await this.delay(10);
  };

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  delete = (deviceId) => {
    this.service.delete(deviceId)
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Cadastro Excluido Com Sucesso",
        });
        await this.delay(2000);
        window.location.reload();
      })
      .catch((error) => {
        this.state.toast.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao Excluir",
        });
      });
  };

  editar = (deviceId) => {
    window.location.href = `/updateDevice/${deviceId}`;
  };

  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Cadastro Excluido",
      life: 3000,
    });
    this.delete(this.state.devices.deviceId);
  };

  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Regeitado",
      detail: " Não Deletado",
      life: 3000,
    });
  };

  confirm = async (deviceId) => {
    this.setState({ deviceId: deviceId });
    // eslint-disable-next-line no-unused-vars
    const a = document.getElementsByClassName(
      "p-button p-component p-confirm-dialog-reject p-button-text"
    );
    confirmDialog({
      message: "Você Realmente quer Deletar esse Cadastro?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

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
            rejectLabel="Não"
          />

          <div className="header">
            <div>
              <BreadCrumb model={this.state.items} home={this.state.home} />
              <br />
              <div className="divCreat">
                <a href="/createDevice">
                  <Button className="btCreat">
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#0b6429" }}
                    />
                  </Button>
                </a>
              </div>
              <br />
              <br />
              <div>
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="M"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="RA"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="FD-CNC"
                />
                <Button
                  onClick={() => 0}
                  className="p-button-outlined mb-5"
                  label="FD-3D"
                />
                <hr />
              </div>
              <br />
              <br />
            </div>
          </div>

          <div className="devices">
            <CardListDevices
              devices={this.state.devices}
              delete={this.confirm}
              editar={this.editar}
              detalhes={this.detalhes}
            />
          </div>
        </div>
      </>
    );
  }
}
