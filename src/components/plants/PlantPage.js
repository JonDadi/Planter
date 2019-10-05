import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';

import { getPlants } from '../../api/plants/actions';
import { postWatering } from '../../api/waterings/actions';
import PlantCard from './PlantCard';

class PlantPage extends Component {
  componentDidMount() {
    this.props.getPlants();
  }

  onPlantClick(id) {
    this.props.history.push(`/plant/${id}`)
  }

  onWateringClick(id) {
    console.log("Vökva", id);
    this.props.postWatering({
      date: moment().toISOString(),
      amount: 1,
      plantId: id,
    });
  }

  render () {
    const { plants } = this.props;

    return (
      <Grid container justify="center" spacing={6} style={{marginTop: 20}}> 
        { plants.map(p => 
          <Grid item key={p.id}>
            <PlantCard plant={p} onClick={this.onPlantClick.bind(this)} onWateringClick={this.onWateringClick.bind(this)} />
          </Grid>
        )}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { plants } = state.plantStore;
  return {
    plants,
  }
};

export default connect(
  mapStateToProps, 
  {
    getPlants: getPlants.request,
    postWatering: postWatering.request,
  }
)(PlantPage)