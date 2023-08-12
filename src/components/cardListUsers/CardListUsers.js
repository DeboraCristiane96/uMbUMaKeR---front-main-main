/* eslint-disable no-undef */
import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './CardListUsers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons'; 

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{

    const rows = props.user.map(user =>{
        if(user.contaAcesso.id === ''){
            <Card>
                <div id="status" className="center">
                        <p>
                            SEM INFORMAÇÃO
                        </p>
                </div>
            </Card>
        }
        return(
            
            <div className="card">  

                <div className="divCreat">
                    <a href="/createUser">
                         <Button className="btCreat" 
                         severity="warning" 
                         raised>
                            <FontAwesomeIcon icon={faPlus}
                          style={{color: "#0b6429",}} /></Button>
                    </a>
                </div>  
                
            </div>
        )
    })

    return(
        <div>
            {rows}
        </div>
    )
}