import React from 'react';

import "./Menu.css";
import { Button } from 'primereact/button';
import MenuItem from './MenuItem';
export default function Menu(){
    
    return(
        <div className="menu">
           <div className="logo">
                <a href='/'>
                    <img src="logo.png" alt="Logo-Umbumaker" />
                </a>
           </div>
           <div className="butoes">
                <Button id='bt' label="DASHBOARDS" severity="secondary" text />
                <MenuItem href='/insumos' label='INSUMOS'></MenuItem>
                <MenuItem href='/zonas' label='ZONAS'></MenuItem>
                <MenuItem href='/devices' label='DISPOSITIVOS'></MenuItem>
                <MenuItem href='/associates' label='ASSOCIADOS'></MenuItem>

                
           </div>
        </div>
    )
}