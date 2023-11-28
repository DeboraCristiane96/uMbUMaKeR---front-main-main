import '../home/Home.css';

import MenuLeft from '../../components/Menu/MenuLeft';

import { Button } from "primereact/button";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';


export default class DashboardInsumos extends React.Component {

/*
 * 
const [chartData, setChartData] = useState({});
const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'PLA',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'yPla',
                    tension: 0.4,
                    data: [28, 18, 10, 10, 16, 27, 10]
                },
                {
                    label: 'ABS',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'yAbs',
                    tension: 0.4,
                    data: [18, 8, 4, 1, 8, 2, 9]

                },

                {
                    label: 'PETG',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--black-500'),
                    yAxisID: 'yPetg',
                    tension: 0.4,
                    data: [2, 8, 4, 9, 8, 7, 10]
                },
                {
                    label: 'HIPS',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    yAxisID: 'yHips',
                    tension: 0.4,
                    data: [8, 8, 4, 9, 6, 8, 9]
                },
            ]
        };
        const options = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                yPla: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                yAbs: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                },
                yPetg: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                },
                yHips: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    
return (
    <><MenuLeft />
        <div className="menu-zonas">
            <Button
                onClick={() => 0}
                className="p-button-outlined mb-5"
                label="M"
            />
            <Button
                onClick={() => 0}
                className="p-button-outlined mb-5"
                label="RA"
            />
            <Button
                onClick={() => 0}
                className="p-button-outlined mb-5"
                label="FD-CNC"
            />
            <Button
                onClick={() => 0}
                className="p-button-outlined mb-5"
                label="FD-3D"
            />
            <hr />
        </div>
        <br />
        <div className='container'>
            <div className="mostragem1">
                <h2>Saída de Filamentos</h2>
                <Chart id='grafico1' type="line" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>
        </div>
    </>
)
*/ 

}



