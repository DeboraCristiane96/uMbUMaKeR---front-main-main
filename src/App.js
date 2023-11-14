import "./App.css";

//theme
import "../src/primereact-theme/themes.css";
//core
import "primereact/resources/primereact.min.css";
import { Route, Routes } from "react-router-dom";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";

import UpdateUser from "./screens/updateUser/UpdateUser";
import CreateUser from "./screens/createUser/CreateUser";
import ListUsers from "./screens/listUsers/ListUsers";
import CreateDevice from "./screens/CreateDevices/CreateDevice";
import ListDevice from "./screens/listDevices/ListDevice";
import CreateInsumos from "./screens/createInsumo/CreateInsumos";
import ListInsumos from "./screens/listInsumos/ListInsumos";
import UpdateInsumo from "./screens/updateInsumo/UpdateInsumo";
import CreateZona from "./screens/createzonas/CreateZona";
import ListZonas from "./screens/listZonas/ListZonas";
import CreateAgendamento from "./screens/createAgendamentozona/AgendarZona";
import ListAgendamento from "./screens/listAgendamento/ListAgendamento";
import ListTutores from "./screens/listTutor/ListTutores";
import ListManager from "./screens/listManager/ListManager";
import AgendarDispositivo from "./screens/createAgendamentoDevice/AgendarDispositivo";
import DashboardZonas from "./screens/dashboardZona/DashboardZonas";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route element={<DashboardZonas/>} path="/dashboardZonas" />
        <Route element={<ListUsers />} path="/associates" />
        <Route element={<ListTutores />} path="/tutores" />
        <Route element={<ListManager />} path="/gestores" />
        <Route element={<CreateUser />} path="/createUser" />
        <Route element={<UpdateUser />} path="/updateUser/:id"/>
        <Route element={<CreateDevice />} path="/createDevice"/>
        <Route element={<ListDevice/>} path="/devices"/>
        <Route element={<AgendarDispositivo/>} path="/agendarDispositivo"></Route>
        <Route element={<CreateInsumos/>} path="/criarInsumos"/>
        <Route element={<ListInsumos/>} path="/insumos" />
        <Route element={<UpdateInsumo/>} path="/updateInsumo/:id"/>
        <Route element={<CreateZona/>} path="/criarZona"/>
        <Route element={<ListZonas/>} path="/zonas"></Route>
        <Route element={<CreateAgendamento/>} path="/agendarZona"></Route>
        <Route element={<ListAgendamento/>} path="/listAgendamento"></Route>
        
      </Routes>
    </div>
  );
}

export default App;
