import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddWord from "./components/AddContent";
import EditContent from "./components/EdiContent/index";
import Home from "./components/Home/index";
import Navbar from "./components/Navbar";
import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Route exact path="/" component={() => <Home/>} />
      <Route exact path="/add" component={() => <AddWord />} />
      <Route exact path="/edit/:id" component={() => <EditContent />} />
    </div>
  );
};
export default App;
