import React, { useState, useEffect } from 'react';
import { Card } from "primereact/card";
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const getSeverity = (props) => {
        if (props.saidasEstoque.dataValidade < props.saidasEstoque.dataSaida) {
            return 'success';
        }
    };


    const rows = props.saidasEstoque.map((saidasEstoque) => {
        return (
            <div className="col-12">
                <Card>
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{saidasEstoque.dataEntrada}</div>
                                <div className="text-2xl font-bold text-900">{saidasEstoque.dataValidade}</div>

                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">{saidasEstoque.quantidade}</span>

                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    });

    return <div>{rows}</div>;

};
