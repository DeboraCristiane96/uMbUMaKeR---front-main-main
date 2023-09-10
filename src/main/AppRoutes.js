import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "../screens/home/Home";
import Login from "../screens/login/Login";

import UpdateUser from "../screens/updateUser/UpdateUser";
import CreateUser from "../screens/createUser/CreateUser";
import ListUsers from "../screens/listUsers/ListUsers";
import CreateDevice from "../screens/CreateDevices/CreateDevice";
import ListDevice from "../screens/listDevices/ListDevice";

function AppRouts(){
    return(
        <Router>
           <Routes>
                <Route  path="/" element={<Home/>} exact ></Route>
                <Route  path="/login" element={<Login/>} exact ></Route>
                <Route element={<ListUsers/>} path="/associates"></Route>
                <Route element={<CreateUser/>} path="/createUser"></Route>
                <Route element={<UpdateUser/>} path="/updateUser/:id"></Route>
                <Route element={<CreateDevice/>} path="/createDevice"></Route>
                <Route element={<ListDevice/>} path="/devices"></Route>
                
           </Routes>
        </Router>
    )
}

export default AppRouts;