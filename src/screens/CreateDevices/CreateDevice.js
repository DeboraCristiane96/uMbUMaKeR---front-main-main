import React from "react";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Toast } from 'primereact/toast';

import { Checkbox } from "primereact/checkbox";

import { Dropdown } from 'primereact/dropdown';

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import MenuLeft from "../../components/Menu/MenuLeft";


export default class CreateDevice extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items:[{ label: 'Dispositivos', url:"/devices" }, { label: 'Cadastrar'}],
    
            home: {icon: 'pi pi-home ', url: '/' },
    
            devices:[{
                tipoSelecionado:'',
                dataDeManu:'',
                codigo:'',
                modelo:'',
                tempMax:'',
                eixoX:'',
                eixoY:'',
                eixoZ:'',
                filamentosSelecionados:[],
            }
        ],

        tipos: [
            { label: 'SLA', value: 'SLA' },
            { label: 'SCANNER', value: 'SCANNER' },
            { label: 'FDM', value: 'FDM' },
            { label: 'DLP', value: 'DLP' },
            { label: 'CANETA 3D', value: 'CANETA 3D' }
             ],
            toast:'',
    
            msgDeErro:'',
            errorData:'',
            errorCod:'',
            errorMod:'',
            errorTemp:'',
            errorEX:'',
            errorEY:'',
            errorEZ:'',
            errorTipo:''
        }
       
    }
    checkFilamento(e){
        let _filamentos =[document.getElementsByName(e)] ;
        if (e.checked)
            _filamentos.push(e.value);
        else
            _filamentos.splice(_filamentos.indexOf(e.value), 1);

         console.log(this.filamentosSelecionados);
    }
    
    checkFilamentos(e) {
        let filamentos = document.getElementsByName(e);
        for(var i=0; i<filamentos.length;i++){
            if(filamentos[i].checked){
                console.log("filamentos selecionados"+filamentos[i].value );
                this.filamentosSelecionados.push(filamentos[i].value);
            }

        }
        console.log(this.filamentosSelecionados);
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    // Validar se os campos estão preenchidos corretamente
    validar = () =>{
        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Campos não podem ser nulos' };
        let frasePadrao = 'Esse Campo é Obrigatorio';
        let disparo = 0;

        this.setState({errorMod: ''})
        this.setState({errorCod: ''})
        this.setState({errorTemp: ''})
        this.setState({errorEX: ''})
        this.setState({errorEY: ''})
        this.setState({errorEZ: ''})
        this.setState({errorTipo: ''})
        this.setState({errorData: ''})

         //Pre Validação do codigo
         if(this.state.codigo === ''){
            disparo ++;
            let a = document.getElementById('cod')
            a.classList.add('p-invalid')
            this.setState({errorCod: frasePadrao})
        }
       
        if(this.state.modelo === ''){
            disparo ++;
            let a = document.getElementById('modelo');
            a.classList.add('p-invalid');
            this.setState({errorMod: frasePadrao})
            
        }
        
        if(this.state.tempMax === ''){
            disparo ++;
            let a = document.getElementById('temp')
            a.classList.add('p-invalid')
            this.setState({errorTemp:frasePadrao})
          
        }

        //Pre Validação do eixo X
        if(this.state.eixoX === ''){
            disparo ++;
            let a = document.getElementById('eX')
            a.classList.add('p-invalid')
            this.setState({errorEX: frasePadrao})
        }
        
         //Pre Validação do eixo Y
        if(this.state.eixoY === ''){
            disparo ++;
            let a = document.getElementById('eY')
            a.classList.add('p-invalid')
            this.setState({errorEY: frasePadrao})
        }

         //Pre Validação de eixo Z
        if(this.state.eixoZ === ''){
            disparo ++;
            let a = document.getElementById('eZ')
            a.classList.add('p-invalid')
            this.setState({errorEZ: frasePadrao})
        }
        //Pre Validação de Data de Manutenção
        if(this.state.dataDeManu === ''){
            disparo ++;
            let a = document.getElementById('dataM')
            a.classList.add('p-invalid')
            this.setState({errorData: frasePadrao})
        }
        const data = new Date(this.state.dataDeNascimento);
        const dataAtual = new Date();
        const diferensaEmMS = dataAtual - data;
        // eslint-disable-next-line no-unused-vars
        const anos = diferensaEmMS / (1000 * 60 * 60 * 24 * 365.25); 
        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }
    }
    // Po up para velidar se realmente deseja 
    confirm = async () => {
        confirmDialog({

            message: 'Você Realmente quer Cadastrar?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',

            accept:this.accept,
            reject:this.reject,

        });
        await this.delay(10);
    };
//Po up de confirmação de cadastro
    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Cadastro Confirmado', life: 3000 });
        this.salvar();
    };
    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Cadastro não Aceito', life: 3000 });
    };

    salvar = () =>{
        const dataOriginal = this.state.dataDeManu;
        const data = new Date(dataOriginal);

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        //Formata o mes antes de mandar para o back
        console.log("tamanho do mes", mes.size )
        const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString().padStart(2, '0')}`;
        this.service.creat(
             {
                dataDeManu: dataFormatada,
                codigo: this.state.codigo,
                modelo:this.state.modelo,
                tempMax:this.state.tempMax,
                eixoX:this.state.email,
                eixoY:this.state.eixoY,
                eixoZ:this.state.eixoZ,
                tipoSelecionado: this.state.tipoSelecionado
        }
        ).then (async (response) =>{

            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado Com Sucesso' });
            await this.delay(2000);
            window.location.href = `/devices`;
        }).catch(error =>{
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Cadastrar' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
            console.log(error.response.data)
        })
    }

    render(){
        return(
            <>
            <MenuLeft/>
            <div className="container">
                <div className="header">
                    {/* Toast: Usado para mostrar mensagem de alerta  */}
                    <Toast ref={(el) => (this.state.toast = el)} />

                    {/* BreadCrumb: Usado para o menu de navegaçao que fica ao lado do bt de salvar */}
                    <div className="header">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                </div>
                <div className="bt-salvar">

                    {/* Campo de dialogo que aparece para confirmar se deseja salvar  */}
                    {/* Ele chama a função de validar, caso a validação der ok,apresenta o campo para confirmação e caso confirmado, chama a função de salva */}
                    <ConfirmDialog
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                    acceptLabel="Sim"
                    rejectLabel="Não"/>
                </div>
                    {/* Começas os Campos  */}

                    <div className="input-um">
                        <br/>
                        <label  htmlFor="dataM">Data de Manutenção</label>
                        <br/>
                        <InputText id="dataM" className="borderColorEdit input-cidade" type="date"
                        value= {this.state.dataDeManu}
                        onChange={(e) => { this.setState({dataDeManu: e.target.value }) }}/>

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorData && <span style={{ color: 'red' }}>{this.state.errorData}</span>}
                    </div>

                    <div className="input-texts">
                        <div className="input-um">
                        <label htmlFor="cod">Código</label>
                        <br/>
                        <InputText id="cod" className="borderColorEdit" type="text"
                         value={this.state.codigo}
                        onChange={(e) => { this.setState({codigo: e.target.value }) }} />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorNome && <span style={{ color: 'red' }}>{this.state.errorNome}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="modelo">Modelo</label>

                        <InputText id="modelo" className="borderColorEdit" type="text" value=
                        {this.state.modelo}
                        onChange={(e) => { this.setState({modelo: e.target.value }) }}/>

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorMod && <span style={{ color: 'red' }}>{this.state.errorMod}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label  htmlFor="temp">Temperatura Máxima</label>

                        <InputText id="temp" className="borderColorEdit" type="text"
                        value= {this.state.tempMax}
                        onChange={(e) => { this.setState({tempMax: e.target.value })}} />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorTemp && <span style={{ color: 'red' }}>{this.state.errorTemp}</span>}
                    </div>
                </div>
                <div className="input-um">Eixos: </div>
                <br/>
                <div className="input-texts">
                        <label  htmlFor="eX"> X</label>
                        <InputText id="eX" className="borderColorEdit" type="text"
                        value= {this.state.eixoX}
                        onChange={(e) => { this.setState({eixoX: e.target.value }) }} />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorEX && <span style={{ color: 'red' }}>{this.state.errorEX}</span>}
                  
                
                        <label  htmlFor="eY"> Y</label>
                        <InputText id="eY" className="borderColorEdit" type="text"
                        value= {this.state.eixoY}
                        onChange={(e) => { this.setState({eixoY: e.target.value }) }} />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorEY && <span style={{ color: 'red' }}>{this.state.errorEY}</span>}

                        <label  htmlFor="eZ"> Z</label>
                            <InputText id="eZ" className="borderColorEdit" type="text"
                            value= {this.state.eixoZ}
                            onChange={(e) => { this.setState({eixoZ: e.target.value }) }} />
                            {/* usado para mostrar a msg de erro, caso tenha */}
                            {this.state.errorEZ && <span style={{ color: 'red' }}>{this.state.errorEZ}</span>}
                    
                </div>  
                <br/>
                <div>FILAMENTOS SUPORTADOS</div>
                    <br/>
                    <div className="input-texts">
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient1" name="filamentos" value="PLA" onChange={this.checkFilamento('PLA')} />
                            <label htmlFor="ingredient1" className="ml-2">PLA</label>
                        </div>
                        <div className="flex align-items-center">
                             <Checkbox inputId="ingredient2" name="filamentos" value="ABS" onChange={this.checkFilamento('ABS')} />
                            <label htmlFor="ingredient2" className="ml-2">ABS</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient3" name="filamentos" value="PET" onChange={this.checkFilamento('PET')}/>
                            <label htmlFor="ingredient3" className="ml-2">PET</label>
                        </div>
                    </div>
                    <br/>
                    <div className="input-texts">
                        <div className="flex align-items-center">
                                <Checkbox inputId="ingredient4" name="filamentos" value="HIP" onChange={this.checkFilamento('HIP')}/>
                                <label htmlFor="ingredient4" className="ml-2">HIP</label>
                        </div>
                            <div className="flex align-items-center">
                            <Checkbox inputId="ingredient4" name="filamentos" value="TPU" onChange={this.checkFilamento('TPU')}/>
                            <label htmlFor="ingredient4" className="ml-2">TPU</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient4" name="filamentos" value="ASA" onChange={this.checkFilamento('ASA')}/>
                            <label htmlFor="ingredient4" className="ml-2">ASA</label>
                        </div>
                    </div>

                    <br/>
                    <br/>
                    <div className="input-texts">
                        <Dropdown id="seletor-tipo"
                        value={this.state.tipoSelecionado} 
                        options={this.state.tipos}
                        onChange={(e) => this.setState({tipoSelecionado: e.value})}
                        placeholder="TIPO" />
                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>}
                </div>
                </div>
                <br/>    
    
                <div className="bts">
                    <div className="bt">
                        <Button label="SALVAR" severity="warning" raised onClick={this.validar} />
                    </div>

                    <div className="bt">
                    <a href="/devices"><Button label="CANCELAR" ></Button></a>
                    </div>
                </div>
            </>

        )
    }
}