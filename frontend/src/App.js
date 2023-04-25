import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import Clubs from "./pages/Clubs";
import Manage_Clubs from "./pages/Manage_Clubs";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Search_Events from "./pages/Search_Events";
import Manage_Events from "./pages/Manage_Events";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Organizations from './pages/Organizations';
import Manage_Organizations from './pages/Manage_Organizations';
import ClubPersonal from './pages/ClubPersonal';
import OrganizationsPersonal from './pages/OrganizationsPersonal';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import { UserProvider } from './components/UserContext';


function App() {

  return (
    <UserProvider>
      <BrowserRouter>{/*Route (Link) tool that will spread through out to our websites*/}
        <Navbar />{/* Navigation Bar will always on top of every page. */}
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Clubs" element={<Clubs />}/>
            <Route path="/Manage_Clubs" element={<Manage_Clubs />}/>
            <Route path="/Organizations" element={<Organizations />}/>
            <Route path="/Manage_Organizations" element={<Manage_Organizations />}/>
            <Route path="/Events" element={<Events />}/>
            <Route path="/Search_Events" element={<Search_Events />}/>
            <Route path="/Manage_Events" element={<Manage_Events />}/>
            <Route path="/Calendar" element={<Calendar />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/clubpage/:name" element={<ClubPersonal />}/>
            <Route path="/orgspage/:name" element={<OrganizationsPersonal />}/>
          </Routes>
        <Navbar />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
