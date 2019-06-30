import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom'
import PlantPage from '../components/plants/PlantPage';
import PlantDetailsPage from '../components/plants/PlantDetailsPage';
import NotFound from '../components/NotFound';
import PlantNavBar from '../components/navbar/PlantNavBar';
import CreateEditPlantPage from '../components/plants/CreateEditPlantPage';
import CreateProducePage from '../components/produce/CreateProduce';

export default class Routes extends Component {
  render() {
    return (
        <BrowserRouter>
            <PlantNavBar />
            <Switch>
              <Route exact path="/" component={PlantPage} />
              <Route path="/plants/createEdit" component={CreateEditPlantPage} />
              <Route exact path="/plants" component={PlantPage} />
              <Route path="/plant/:id" component={PlantDetailsPage} />
              <Route path="/produce" component={CreateProducePage} />
              <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
  }
}
