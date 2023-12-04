import React from 'react';

class Filamentos extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}


import MenuLeft from '../Menu/MenuLeft';

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

//Componentisar os graficos!!!

export default function Graficos(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
                {
                    label: 'Filamento ASA',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4,
                },
                {
                    label: 'Filamento ABS',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4,
                },
                {
                    label: 'Filamento APL',
                    data: [30, 40, 40, 20, 45, 30, 50],
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

        setChartData(data);
        setChartOptions(options);
    }, []);

    const rows = props.saidasEstoque.map((saidasEstoque) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        return (
            <div className='data'>
                <label></label>

            </div>
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
                {
                    label: 'Filamento ASA',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4,
                },
                {
                    label: 'Filamento ABS',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4,
                },
                {
                    label: 'Filamento APL',
                    data: [30, 40, 40, 20, 45, 30, 50],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pi-500'),
                    tension: 0.4,
                },
            ]
        },

        );
    });

    return (
        <>
            <div className="card01">
                <Chart type="line" data={chartData} options={chartOptions} />
            </div>
        </>
    )
}
