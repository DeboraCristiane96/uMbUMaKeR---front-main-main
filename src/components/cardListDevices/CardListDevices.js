/* eslint-disable no-undef */
import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './CardListDevices.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faPenToSquare, faChevronRight} from '@fortawesome/free-solid-svg-icons'; 
// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{

    const rows = props.devices.map(device =>{
 
        return(
            
            <div className="card">  
                <Card>
                    <div className="left">
                    <div classImg='divImg'>
                        <label className="lb">img</label>
                            <br/>
                        <p>img</p>
                    </div>

                    <div className='divModelo'>
                        <p > {device.modelo}</p>
                    </div>
                        
                    </div>
                    <div className="card-butons">

                        <Button className="bt" onClick={e => props.device.editar(device.id)}
                        title="Editar" severity="warning" aria-label="Editar">
                           <FontAwesomeIcon icon={faPenToSquare} style={{color: "#0b6429",}} />
                        </Button>

                        <Button className="bt" onClick={e => props.device.delete(device.id)} style={{color: "#0b6429",}} 
                        title="Deletar" severity="warning" aria-label="Deletar">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>

                        <Button className="bt" onClick={e => props.device.delete(device.id)} style={{color: "#0b6429",}} 
                        title="Detalhes" severity="warning" aria-label="Detalhes">
                           <FontAwesomeIcon icon={faChevronRight} style={{color: "#1d8729",}} />
                        </Button>
                      
                    </div>
                </Card>
            </div>
        )
    })

    return(
        <div>
            {rows}
        </div>
    )
}