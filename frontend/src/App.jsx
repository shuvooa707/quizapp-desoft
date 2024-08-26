import {useState} from 'react'
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import './index.css';
import LoginPage from "./pages/LoginPage.jsx";




function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}></Route>
                <Route path={"/profile"} element={<ProfilePage />}></Route>
                <Route path={"/login"} element={<LoginPage />}></Route>
            </Routes>
        </>
    )
}

export default App
