import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Graphoverview from "./components/Graphoverview";
import Graphspecific from "./components/Graphspecific";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as V from 'victory';


class App extends Component {
  takeUrl = (user) => {
    this.props.navigate("/Graphspecific", { state: { user } });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header"></header>
          <Routes>
            <Route
              path="/"
              element={<Graphoverview handleClick={this.takeUrl} />}
            />
            <Route path="/Graphspecific" element={<Graphspecific />} />
            <Route path="/" />
          </Routes>
        </div>
        <nav>
          <Link to="/"><button className="menu_btn">Back to Graphoverview</button></Link>
        </nav>
      </Provider>
    );
  }
}
export function AppWithRouter(props) {
  const navigate = useNavigate();
  return <App navigate={navigate}></App>;
}

export default App;
