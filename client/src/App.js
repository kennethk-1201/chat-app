import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";

import {
    Join,
    Chat
} from "./components";

const App = props => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    return (
        <Router>
            <div className="container" id="main-container">
                <Route path="/" exact component={Join}/>
                <Route path="/chat" exact component={Chat}/>
            </div>
        </Router>
    )
}

export default App;