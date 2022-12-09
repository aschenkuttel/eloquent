import React from 'react'
import {Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Translate from "./components/Translate"
import Footer from "./components/Footer"
import './App.css'

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="flex-1 flex justify-center items-center">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/translate" element={<Translate/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default App
