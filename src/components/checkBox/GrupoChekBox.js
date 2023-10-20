import React, { useState } from "react";
import "./GrupoCheckBox.css";
import { Checkbox } from "primereact/checkbox";

export default function GrupoChekBox() {
    const [filamentos, setfilamentos] = useState([this.filamentos]);

    const onFilamentosChange = (e) => {
        let _filamentos = [...filamentos];

        if (e.checked)
            _filamentos.push(e.value);
        else
            _filamentos.splice(_filamentos.indexOf(e.value), 1);

        setfilamentos(_filamentos);
    }

    return (
        <div className="conteinner">
            <div className="input-um">
                <label>Filamentos Suportados</label> 
            </div>
            <br/>
            <div className="input-texts">
                <div className="input-um">
                    <Checkbox inputId="filamento1" name="suporte" value="PLA" onChange={onFilamentosChange} checked={filamentos.includes('PLA')} />
                    <label htmlFor="filamento1" className="ml-2">PLA</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento2" name="suporte" value="ABS" onChange={onFilamentosChange} checked={filamentos.includes('ABS')} />
                    <label htmlFor="filamento2" className="ml-2">ABS</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento3" name="suporte" value="PET" onChange={onFilamentosChange} checked={filamentos.includes('PET')} />
                    <label htmlFor="filamento3" className="ml-2">PET</label>
                </div>
               
            </div>
           
            <div className="input-texts"> 
                <div className="input-um">
                    <Checkbox inputId="filamento5" name="suporte" value="TPU" onChange={onFilamentosChange} checked={filamentos.includes('TPU')} />
                    <label htmlFor="filamento5" className="ml-2">TPU</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento4" name="suporte" value="HIP" onChange={onFilamentosChange} checked={filamentos.includes('HIP')} />
                    <label htmlFor="filamento4" className="ml-2">HIP</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento6" name="suporte" value="ASA" onChange={onFilamentosChange} checked={filamentos.includes('ASA')} />
                    <label htmlFor="filamento6" className="ml-2">ASA</label>
                </div>

            </div>
        </div>
        
    )
}