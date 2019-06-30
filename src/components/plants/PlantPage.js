import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import moment from 'moment';

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
      <div className="container">
        <div className="row">
        { plants.map(p => 
          <div className="col" key={p.id}>
            <PlantCard plant={p} onClick={this.onPlantClick.bind(this)} />
          </div>
        )}
        </div>
      </div>
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