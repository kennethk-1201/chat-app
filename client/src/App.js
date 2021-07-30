import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";

import {
    Join,
    Chat
} from "./components";

const App = props => {
    return (
        <Router>
            <div className="container">
                <Route path="/" exact component={Join}/>
                <Route path="/chat" exact component={Chat}/>
            </div>
        </Router>
    )
}

export default App;