import React from 'react';
import moment from 'moment';
import 'moment/locale/is';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Routes from './routes'
import { colors } from './components/utils'
moment.locale('is');


function App() {
  return (
    <div className="App" style={{ backgroundColor: colors.lightBlue }} >
        <Routes />
    </div>
  );
}

export default App;
