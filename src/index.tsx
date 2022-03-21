import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Library from "./views/Library";
import Header from "./components/Navigation/Header";
import Four0Four from "./components/Four0Four";
import Footer from "./components/Navigation/Footer";

ReactDOM.render(
   <Router>
       <Header />
       <Routes>
           <Route path="/" element={<Library />} />
           <Route path="/about" element={"About"} />
           <Route path="/contact" element={"Contact"} />
           <Route path="*" element={<Four0Four />} />
       </Routes>
       <Footer />
   </Router>,
    document.getElementById('root')
);
