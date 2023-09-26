/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import ZonaService from "../../services/ZonaService";

import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { BreadCrumb } from "primereact/breadcrumb";

import { Button } from "primereact/button";

import MenuLeft from "../../components/Menu/MenuLeft";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardListZonaMM from "../../components/cardListZonas/CardListZonaMM";

export default class ListZonas extends React.Component {

    state = {
        items: [{ label: "Zonas", url: "/zonas" }, { label: "Cadastar" }],

        home: { icon: "pi pi-home ", url: "/" },

       zonaId:"",
       zonas:[{
          id:"",
          nome:"",
          qntPessoas: "",
          status:""
       }],
       
       toast: "",
       msgDeErro: "",
       error:""   
    }    

    constructor() {
        super();
        this.service = new ZonaService();
    }

      async componentDidMount() {
        await this.service.findAll("")
          .then((response) => {
            const zona = response.data;
    
            this.setState({ zona });
            console.log(response);
          })
          .catch((error) => {
            console.log("errrrrror");
            console.log(error.response);
          });
        }
        delay = (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
          };
        
          delete = (deviceId) => {
            this.service
              .delete(deviceId)
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
        
          editar = (zonaId) => {
            window.location.href = `/updateZona/${zonaId}`;
          };
        
          accept = () => {
            this.state.toast.show({
              severity: "info",
              summary: "Confirmado",
              detail: "Cadastro Excluido",
              life: 3000,
            });
            this.delete(this.state.zonaId);
          };
        
          reject = () => {
            this.state.toast.show({
              severity: "warn",
              summary: "Regeitado",
              detail: " Não Deletado",
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
                <a href="/createZona">
                  <Button className="btCreat" severity="warning" raised>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#0b6429" }}
                    />
                  </Button>
                </a>
              </div>
              <br />

              <br />
            </div>
          </div>

          <div className="zonas">
            <CardListZonaMM
              zonas={this.state.zonas}
              delete={this.confirm}
              editar={this.editar}
            />
          </div>
        </div>
      </>
    );
  }
}
