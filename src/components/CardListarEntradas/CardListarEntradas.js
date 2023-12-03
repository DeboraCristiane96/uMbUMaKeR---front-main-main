import React from 'react';
import { Card } from "primereact/card";
import "./CardListarEntradas.css";
import 'primeicons/primeicons.css';



// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    // eslint-disable-next-line no-unused-vars
    const getSeverity = (props) => {
        if (props.EntradasEstoque.dataValidade < props.EntradasEstoque.dataEntrada) {
            return 'success';
        }
    };


    const rows = props.entradasEstoque.map((entradasEstoque) => {
        return (
            <Card>
                <div className="item"  >
                    <div className="colum1">
                        <div className="dataEntrada" >
                            <span className="pi pi-arrow-down" style={{ fontSize: '1.50rem', color: 'green' }}></span>
                             2023/03/01
                            {" "+entradasEstoque.dataEntrada}</div>
                        <div className="dataValidade">
                            <i className="pi pi-chevron-circle-right" style={{ fontSize: '1.50rem', color: 'green' }}></i>
                             2023/08/01
                            {" "+entradasEstoque.dataValidade}</div>
                    </div>
                    <div className="colum2">
                        <div className="quantidade">7{entradasEstoque.quantidade}Kg</div>
                    </div>
                </div>
            </Card>
        );
    });

    return <div>{rows}</div>;

};
