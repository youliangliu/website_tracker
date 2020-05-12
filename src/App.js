import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import CreateJoinTeam from "./components/CreateJoinTeam";
import SideBar from "./components/SideBar";
import Timeline from "./components/Timeline";
import NavBar from "./components/NavBar";
import TL from "./components/TL";

function App() {
  return (
    <div>
      <Router>
        {/* <TL></TL> */}
        {/* <SideBar></SideBar> */}
        <Timeline></Timeline>
        {/* <NavBar></NavBar> */}
        <div className="component">
          {/* <Switch>
            <Route exact path="/" component={Timeline}></Route>
            <Route path="/createjoin" component={CreateJoinTeam}></Route>
          </Switch> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
