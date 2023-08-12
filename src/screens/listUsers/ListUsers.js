/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import './ListUsers.css';


import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';


export default class ListarUsers extends React.Component{
    state = {
        items:[{ label: 'Associados', url:"/users" }],

        home: {icon: 'pi pi-home ', url: '/' },

        usersId:'',
        users:[
            {
                id:'',
                nome:'',
                tipo:'',
                
            }
        ],
        token:"",
        toast:'',
        nomeParaFiltro:'',

        usersFiltro:[
            {
                id:'',
                nome:'',
                tipo:''
                
                
            }
        ]
        
    }


    componentDidMount(){           
        this.findAll();
    }


    filtro = () =>{
        let lista = []
        this.state.users.forEach(element => {
            if(element.nome === this.state.nomeParaFiltro){
                lista.push(element);
            }
           
        });

        this.setState({users:lista})
    }


    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
        this.findAll();
    }

   

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

    findAll = (token) => {
        const headers = { 'Authorization':` Bearer ${token}` };
        console.log("bbbbbbbbbb",headers)
        this.service.get('/all', {headers})
            .then(response => {
                const users = response.data;
                
                this.setState({users})

                console.log(this.state.users);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    render(){
        return(

            <div className="container">

                <div className="header">
                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                    
                        <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="Procurar"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => { this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos " severity="warning" raised />
                        </div>
                       
                    </div>
                </div>

            </div>
        )
    }

}