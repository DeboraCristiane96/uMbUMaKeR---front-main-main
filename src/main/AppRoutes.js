import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "../screens/Home";
import Login from "../screens/Login";

import UpdateUser from "../screens/updateUser/UpdateUser";
import CreateUser from "../screens/createUser/CreateUser";
import ListAssociate from "../screens/listAssociates/ListAssociates";
import ListManagers from "../screens/listManagers/ListManagers";
import ListTutors from "../screens/listTutors/ListTutors";

function AppRouts(){
    return(
        <Router>
           <Routes>
                <Route  path="/" element={<Home/>} exact ></Route>
                <Route  path="/login" element={<Login/>} exact ></Route>
                <Route element={<ListAssociate/>} path="/associates"></Route>
                <Route element={<ListManagers/>} path="/managers"></Route>
                <Route element={<ListTutors/>} path="/tutors"></Route>
                <Route element={<CreateUser/>} path="/createUser"></Route>
                <Route element={<UpdateUser/>} path="/updateUser/:id"></Route>
                
           </Routes>
        </Router>
    )
}

export default AppRouts;