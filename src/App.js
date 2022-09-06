import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import Graphoverview from './components/Graphoverview';
import Graphspecific from './components/Graphspecific';

class App extends Component {
  render () {
  return (
    <Provider store = {store}>
        <div className="App">
      <header className="App-header">
     
      </header>
      <Graphoverview />
    </div>
    </Provider>
)}}

export default App;
