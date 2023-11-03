/* eslint-disable react/no-direct-mutation-state */

import React from "react"
import "./AgendarDispositivo.css"
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { InputText } from "primereact/inputtext";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import DeviceService from "../../services/DeviceService";
import MenuLeft from "../../components/Menu/MenuLeft";

import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from 'primereact/calendar';

import { InputTextarea } from 'primereact/inputtextarea';
        

export default class AgendarDispositivo extends React.Component {

    state = {
        items: [{ label: "Agendamento", url: "/devices" }],

        home: { icon: "pi pi-home ", url: "/" },

        codigo:0,
        dataSolicitacao:"",
        email: "",
        statusObjeto:"",
        descricao:"",
        dataAgendada:"",
       
       toast: "",
       msgDeErro: "",
       error:""   
    }    

 

    constructor() {
        super();
        this.service = new DeviceService();
      }

      delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
    
      salvar = async () => {
        await this.service
          .create({
            dataSolicitacao: this.dataSolicitacao,
            email: this.email,
            statusObjeto: this.statusObjeto,
            descricao:this.descricao,
            dataAgendada:this.dataAgendada

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
    
      confirm = async (codigo) => {
        this.setState({ codigo:codigo});
        // eslint-disable-next-line no-unused-vars
        const a = document.getElementsByClassName(
          "p-button p-component p-confirm-dialog-reject p-button-text"
        );
        confirmDialog({
          message: "Deseja realizar esse Agendamento ?",
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
        if (this.state.email === "") {
          disparo++;
          let a = document.getElementById("email");
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
                        
                
                        <BreadCrumb
                            model={this.state.items}
                            home={this.state.home}
                        ></BreadCrumb>
                    </div>
                
                 
                  <div>
                  <h4 id="meuH3" htmlFor="dataUltManu" className="font-bold block mb-2">Data e hora da solicitação</h4>
                    <br/>
                  
                    <div className="input-um">
                        <Calendar value={this.state.dataSolicitacao} onChange={(e) => this.setState({ dataSolicitacao: e.target.value })}showTime hourFormat="24" />
                    </div>
                    <h4 id="meuH3">Email</h4>
                    <div className="input-texts">
                       
                      <div className="input-um">
                        <InputText
                          id=""
                          className="borderColorEdit"
                          type="text"
                          value={this.state.email}
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                        />
                        {this.state.error && (
                          <span style={{ color: "red" }}>{this.state.error}</span>
                        )}
                      </div>
                    </div>
                   
                    <div className="input-dois">
                        <div className="input-um">
                        <h4 id="meuH3" htmlFor="dataUltManu" className="font-bold block mb-2">Data e hora do termino </h4>
                        <br />
                        <div className="flex-auto">
                            <Calendar value={this.state.dataTermino} onChange={(e) => this.setState({ dataTermino: e.target.value })}showTime hourFormat="24" />
                        </div>
                    </div>
                    </div>
                  
                   <div>
               
                   <h4 id="meuH3" htmlFor="username">Descrição</h4>
                   <br />
                   <span className="p-float-label">
                        <InputTextarea id="username"  rows={5} cols={100} />
                        
                    </span>
                   </div>  

                <div className="input-text"_>
                <br/>
                <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.target.value})} /> 
                 <br/>
                <h4 id="meuH3A" htmlFor="username">Política de aceite</h4>
                

                <div className="input-um">
                    <br />
                    <h4 id="meuH3" htmlFor="dataUltManu" className="font-bold block mb-2">Data e hora agendada </h4>
                    <br />
                    <div className="flex-auto">
                    <Calendar value={this.state.dataAgendada} onChange={(e) => this.setState({ dataAgendada: e.target.value })}showTime hourFormat="24" />
                    </div>
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
                <a href="/devices">
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
            

