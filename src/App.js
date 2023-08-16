import './App.css';

//theme  
import '../src/primereact-theme/themes.css'    
//core
import "primereact/resources/primereact.min.css"; 
import { Route, Routes } from 'react-router-dom';

import  Login from "./screens/Login";
import Home from './screens/Home';

import UpdateUser from "./screens/updateUser/UpdateUser";
import CreateUser from "./screens/createUser/CreateUser";
import ListUsers from './screens/listUsers/ListUsers';



function App() {
  return (
      <div>
        <Routes>
                <Route  path="/" element={<Login/>} />
                <Route  path="/home" element={<Home/>} />
                <Route element={<ListUsers/>} path="/associates"/>
                <Route element={<CreateUser/>} path="/createUser"/>
                <Route element={<UpdateUser/>} path="/updateUser/:id"/>
           </Routes>
      </div>
    
  );
}

export default App;
