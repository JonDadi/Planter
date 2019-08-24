import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'moment/locale/is';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import PlantPage from './components/plants/PlantPage';
import Routes from './routes'
import { colors } from './components/utils'
moment.locale('is');


function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <div className="App" style={{ backgroundColor: colors.lightBlue }} >
        <Routes />
    </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
