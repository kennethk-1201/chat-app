import React from "react";
import { BrowserRouter as Router, Router, Route } from "react-router-dom";

import {
    Join,
    Chat
} from "./components";

const App = props => {
    return (
        <Router>
            <Route path="/" exact component={Join}/>
            <Route path="/chat" exact component={Chat}/>
        </Router>
    )
}

export default App;