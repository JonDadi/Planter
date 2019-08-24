import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import { getPlants } from '../../api/plants/actions';
import PlantCard from './PlantCard';

class PlantPage extends Component {
  componentDidMount() {
    this.props.getPlants();
  }

  onPlantClick(id) {
    this.props.history.push(`/plant/${id}`)
  }

  render () {
    const { plants } = this.props;

    return (
      <Grid container justify="center" spacing={6} style={{marginTop: 20}}> 
        { plants.map(p => 
          <Grid item key={p.id}>
            <PlantCard plant={p} onClick={this.onPlantClick.bind(this)} />
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
  }
)(PlantPage)