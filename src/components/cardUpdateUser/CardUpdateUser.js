import React from "react";
import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";
import './cardUpdateUser.css'
// eslint-disable-next-line import/no-anonymous-default-export
export default props=>{
        
        return(
            <div>                
                
                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text"
                        placeholder= {props.associates.nome}  />
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" value= 
                        {props.associates.email} />
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit " type="text" value= {props.associates.senha}  />
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" 
                        value= {props.associates.linkWhatsapp} />
                    </div>
                    
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" value= {props.associates.telefone} />
                    </div>
                </div>


                <div className="input-um">
                        <Dropdown id="seletor" 
                        value={props.associates.ativoSelectItems} 
                        options={props.associates.ativo} 
                        placeholder="STATUS" />
                 
                </div>

            </div>
        
        )
    }
    