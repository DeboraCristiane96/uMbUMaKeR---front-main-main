/* eslint-disable react/no-direct-mutation-state */
import React from "react"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import ZonaService from "../../services/ZonaService";
import MenuLeft from "../../components/Menu/MenuLeft";

import "./CreateZona.css";

export default class CreateZona extends React.Component {

    state = {
        items: [{ label: "Zonas", url: "/zonas" }, { label: "Cadastrar" }],

        home: { icon: "pi pi-home ", url: "/" },

       zonas:[{
        codigo:"",
        nome:"",
        qtdPessoas: ""
       }],
       
       toast: "",
       msgDeErro: "",
       error:""   
    }    
        
    

    constructor() {
        super();
        this.service = new ZonaService();
      }

      delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
    
      salvar = async () => {
        await this.service
          .create({
            nome: this.state.nome,
            qtdPessoas:this.state.qtdPessoas,
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
        this.setState({ zonaId: zonaId});
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
                        <InputText
                          id="nome"
                          className="borderColorEdit"
                          type="text"
                          value={this.state.nome}
                          onChange={(e) => {
                            this.setState({ nome: e.target.value });
                          }}placeholder="NOME DA ZONA"
                        />
                        {this.state.error && (
                          <span style={{ color: "red" }}>{this.state.error}</span>
                        )}
                      </div>
                    </div>

                    <br/>
                    <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="qntTotal"></label>
                        <InputNumber value={this.state.qtdPessoas} onValueChange={(e) => 
                        this.setState({qtdPessoas: e.target.value})}placeholder="QUANTIDADE DE PESSOAS" mode="decimal" showButtons min={0} max={10000} />
                    </div>
                    </div>
            
            <div className="bts">
              <div className="bt">
                <Button
                  label="Salvar"
                  severity="warning"
                  raised
                  onClick={this.validar}
                />
              </div>

              <div className="bt">
                <a href="/zonas">
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
            

