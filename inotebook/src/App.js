// import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notestate';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  return (
    <>
      <NoteState>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
