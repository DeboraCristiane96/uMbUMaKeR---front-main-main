
// eslint-disable-next-line no-unused-vars
import MenuLeft from '../Menu/MenuLeft';

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';


//Componentisar os graficos!!!

export default function Graficos(props) {
    
    const [insumo, setInsumo] = useState({});
    const [entradasEstoque, setEntradasEstoque] = useState({});
    const [saidasEstoque, setSaidasEstoque] = useState({});
   
    const [chartOptions, setChartOptions] = useState({});

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        // eslint-disable-next-line no-unused-vars

        const dataInsumos = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
                {
                    nome: 'Filamento ASA',
                    data: [300,200],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4,
                },
                {
                    label: 'Filamento ABS',
                    data:  [100,200],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4,
                },
                {
                    label: 'Filamento APL',
                    data:  [200,100],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pi-500'),
                    tension: 0.4,
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        setInsumo(dataInsumos);
        setChartOptions(options);
    }, );

    return (
        <>
            <div className="card01">
                <Chart type="line" data={insumo} options={chartOptions} />
            </div>
        </>
    )
}
