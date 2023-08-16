import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "../screens/Home";
import Login from "../screens/Login";

import UpdateUser from "../screens/updateUser/UpdateUser";
import CreateUser from "../screens/createUser/CreateUser";
import ListUsers from "../screens/listUsers/ListUsers";

function AppRouts(){
    return(
        <Router>
           <Routes>
                <Route  path="/" element={<Home/>} exact ></Route>
                <Route  path="/login" element={<Login/>} exact ></Route>
                <Route element={<ListUsers/>} path="/tutors"></Route>
                <Route element={<CreateUser/>} path="/createUser"></Route>
                <Route element={<UpdateUser/>} path="/updateUser/:id"></Route>
                
           </Routes>
        </Router>
    )
}

export default AppRouts;