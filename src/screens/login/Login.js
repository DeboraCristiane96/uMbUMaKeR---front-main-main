
import React from "react";
import { Button } from 'primereact/button';
import './Login.css'

export default function Login() {

    return (
        <div className="container-login">
            <div className="left-login">
                
                <div className="imagem">
                    <img src="logo.png" alt="Logo-UmBuMaKeR" />
                </div>
                <a href="http://localhost:3000/home" >
                     <Button className="bt-login" label="Login Google">
                     </Button>               
                </a>
            </div>
             
        </div>
        

    )
}
