import React from 'react';
import './App.scss';
import Library from "./views/Library";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Navigation/Header";
import About from "./components/About/About";
import Four0Four from "./components/Four0Four";
import Footer from "./components/Navigation/Footer";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Library/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<Four0Four/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
