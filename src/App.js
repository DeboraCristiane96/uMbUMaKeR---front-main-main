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

import ListAssociates from './screens/listAssociates/ListAssociates';
import ListManagers from './screens/listManagers/ListManagers';
import ListTutors from './screens/listTutors/ListTutors';


function App() {
  return (
      <div>
        <Routes>
                <Route  path="/" element={<Login/>} />
                <Route  path="/home" element={<Home/>} />
                <Route element={<ListAssociates/>} path="/associates"/>
                <Route element={<ListTutors/>} path="/tutors"/>
                <Route element={<ListManagers/>} path="/managers"/>
                <Route element={<CreateUser/>} path="/createUser"/>
                <Route element={<UpdateUser/>} path="/updateUser/:id"/>
           </Routes>
      </div>
    
  );
}

export default App;
