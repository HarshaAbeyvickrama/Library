import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Library from "./views/Library";

ReactDOM.render(
   <Router>
       <Routes>
           <Route path="/" element={<Library />} />
           <Route path="/about" element={"About"} />
           <Route path="/contact" element={"Contact"} />
           <Route path="*" element={"404"} />
       </Routes>
   </Router>,
    document.getElementById('root')
);
