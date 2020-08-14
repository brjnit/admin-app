import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './Redux/store/configStore';
import { Provider, useSelector } from "react-redux";
import Loader from './Component/loader';

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
  );
}

export default App;
