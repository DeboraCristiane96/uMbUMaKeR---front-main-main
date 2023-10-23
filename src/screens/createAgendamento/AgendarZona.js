/* eslint-disable react/no-direct-mutation-state */

import React from "react"
import "./AgendarZona.css"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import ZonaService from "../../services/ZonaService";
import MenuLeft from "../../components/Menu/MenuLeft";
import { faClock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from 'primereact/calendar';

import { InputTextarea } from 'primereact/inputtextarea';
        

export default class AgendarZona extends React.Component {

    state = {
        items: [{ label: "Agendamento", url: "/zonaMM" }],

        home: { icon: "pi pi-home ", url: "/" },

       zona:[{
        zonaId:"",
        nome:"",
        qntPessoas: "",
        checked:true,
        dataInicio:"",
        dataTermino:""
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
            checked: this.state.checked,
            dataInicio:this.state.dataInicio,
            dataTermino: this.state.dataTermino,
            qntPessoas:this.state.qntPessoas,
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
                  <br/>
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
                          }}placeholder="TÍTULO DO AGENDAENTO"
                        />
                        {this.state.error && (
                          <span style={{ color: "red" }}>{this.state.error}</span>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="input-um">
                        <label htmlFor="dataUltManu" className="font-bold block mb-2">DATA E HORA DO INÍCIO </label>
                        <br />
                        <div className="flex-auto">
                            <Calendar value={this.state.dataInicio} onChange={(e) => this.setState({ dataInicio: e.target.value })}showTime hourFormat="24" />
                        </div>
                    </div>

                   
                    <div className="input-dois">
                        <br />
                        <div className="input-um">
                        <br />
                        <label htmlFor="dataUltManu" className="font-bold block mb-2">DATA E HORA DO TERMINO </label>
                        <div className="flex-auto">
                            <Calendar value={this.state.dataTermino} onChange={(e) => this.setState({ dataTermino: e.target.value })}showTime hourFormat="24" />
                        </div>
                    </div>
                    </div>
                    <br/> <br/>
                   <div>
                   <span className="p-float-label">
                        <InputTextarea id="username"  rows={5} cols={100} />
                        <label htmlFor="username">DESCRIÇÃO</label>
                    </span>
                   </div>  

                <div className="input-text"_>
               
                <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.target.value})} />
                <label htmlFor="username">POLÍTICA DE ACAITE</label>
                 
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
            

