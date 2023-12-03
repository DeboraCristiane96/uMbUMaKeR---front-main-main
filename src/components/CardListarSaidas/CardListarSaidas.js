import React from 'react';
import { Card } from "primereact/card";
import 'primeflex/primeflex.css';
import "./CardListarSaidas.css";



// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    // eslint-disable-next-line no-unused-vars
    const getSeverity = (props) => {
        if (props.saidasEstoque.dataValidade < props.saidasEstoque.dataSaida) {
            return 'success';
        }
    };


    const rows = props.saidasEstoque.map((saidasEstoque) => {
        return (
            <Card>
                <div className="item">
                    <div className="colum1">
                        <div className="dataEntrada" >
                            <span className="pi pi-arrow-up" style={{ fontSize: '1.50rem', color: 'green' }}></span>
                             2023/03/01
                            {" "+saidasEstoque.dataSaida}</div>
                    </div>
                    <div className="colum2">
                        <div className="quantidade">7{saidasEstoque.quantidade}Kg</div>
                    </div>
                </div>
               
            </Card>
        );
    });

    return <div>{rows}</div>;

};
