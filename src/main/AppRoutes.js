import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "../screens/home/Home";
import Login from "../screens/login/Login";

import UpdateUser from "../screens/updateUser/UpdateUser";
import CreateUser from "../screens/createUser/CreateUser";
import ListUsers from "../screens/listUsers/ListUsers";
import CreateDevice from "../screens/CreateDevices/CreateDevice";
import ListDevice from "../screens/listDevices/ListDevice";
import ListInsumos from "../screens/listInsumos/ListInsumos";
import CreateInsumo from "../screens/createInsumo/CreateInsumos";
import UpdateInsumo from "../screens/updateInsumo/UpdateInsumo";
import EntradaSaidaInsumos from "../screens/entradaSaidaInsumos/EntradaSaidaInsumos";
import ListZonas from "../screens/listZonas/ListZonas";
import CreateZona from "../screens/createzonas/CreateZona";
import AgendarZona from "../screens/createAgendamento/AgendarZona";
import ListAgendamento from "../screens/listAgendamento/ListAgendamento";
import AgendarDispositivo from "../screens/createAgendamentoDevice/AgendarDispositivo";
import DashboardZonas from "../screens/dashboardZona/DashboardZonas";

function AppRouts(){
    return(
        <Router>
           <Routes>
                <Route  path="/" element={<Home/>} exact ></Route>
                <Route  path="/login" element={<Login/>} exact ></Route>
                <Route element={<DashboardZonas/>} path="/dashboardZonas"></Route>
                <Route element={<ListUsers/>} path="/associates"></Route>
                <Route element={<CreateUser/>} path="/createUser"></Route>
                <Route element={<UpdateUser/>} path="/updateUser/:id"></Route>
                <Route element={<CreateDevice/>} path="/createDevice"></Route>
                <Route element={<ListDevice/>} path="/devices"></Route>
                <Route element={<AgendarDispositivo/>} path="/agendarDispositivo"></Route>
                <Route element={<CreateInsumo/>} path="/criarInsumos"></Route>
                <Route element={<UpdateInsumo/>} path="/updateInsumo/:id"></Route>
                <Route element={<ListInsumos/>} path="/insumos"></Route>
                <Route element={<EntradaSaidaInsumos/>} path="/EntradaSaidaInsumo"></Route>
                <Route element={<ListZonas/>} path="/zonas"></Route>
                <Route element={<CreateZona/>} path="/criarZona"></Route>
                <Route element={<ListZonas/>}path="/zonas"></Route>
                <Route element={<AgendarZona/>} path="/agendarZona"></Route>
                <Route element={<ListAgendamento/>} path="/listAgendamento"></Route>
                
               
           </Routes>
        </Router>
    )
}

export default AppRouts;