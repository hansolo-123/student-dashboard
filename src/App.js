import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Graphoverview from "./components/Graphoverview";
import Graphspecific from "./components/Graphspecific";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Link to="Graphspecific">Graphspecific</Link>
          <br></br>
          <Link to="/">Graphoverview</Link>
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
