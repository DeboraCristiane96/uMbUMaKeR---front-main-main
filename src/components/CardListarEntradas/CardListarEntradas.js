import React, { useState, useEffect } from 'react';
import { Card } from "primereact/card";
import "./CardListarEntradas.css";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';



// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const getSeverity = (props) => {
        if (props.EntradasEstoque.dataValidade < props.EntradasEstoque.dataEntrada) {
            return 'success';
        }
    };


    const rows = props.entradasEstoque.map((entradasEstoque) => {
        return (
            <div className="item"  >
                <Card>
                    <div className="colum1">
                        <div className="dataEntrada" >
                            {entradasEstoque.dataEntrada}</div>
                        <i className="pi-clock"></i>
                        <div className="dataValidade">{entradasEstoque.dataValidade}</div>
                    </div>
                    <div className="colum2">
                        <div className="quantidade">{entradasEstoque.quantidade}</div>
                    </div>
                </Card>
            </div>
        );
    });

    return <div>{rows}</div>;

};
