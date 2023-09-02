import './App.css';

//theme  
import '../src/primereact-theme/themes.css'    
//core
import "primereact/resources/primereact.min.css"; 
import { Route, Routes } from 'react-router-dom';

import  Login from "./screens/login/Login";
import Home from './screens/home/Home';

import UpdateUser from "./screens/updateUser/UpdateUser";
import CreateUser from "./screens/createUser/CreateUser";
import ListUsers from './screens/listUsers/ListUsers';
import CreateDevice from './screens/CreateDevices/CreateDevice';
import ListDevices from './screens/listDevices/ListDevices';



function App() {
  return (
      <div>
        <Routes>
                <Route  path="/" element={<Login/>} />
                <Route  path="/home" element={<Home/>} />
                <Route element={<ListUsers/>} path="/associates"/>
                <Route element={<CreateUser/>} path="/createUser"/>
                <Route element={<UpdateUser/>} path="/updateUser/:id"/>
                <Route element={<CreateDevice/>} path="/createDevice"/>
                <Route element={<ListDevices/>} path="/devices"/>
           </Routes>
      </div>
    
  );
}

export default App;
