import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import { getPlants } from '../../api/plants/actions';
import { getImage } from '../../api/images/actions';
import { selectPlantById } from '../../api/plants/selectors';
import mockplant from '../../img/plant1.png'
import backArrow from '../../img/backArrow.png'

import './styles.scss';

class PlantDetailsPage extends Component {
  
  constructor(props){
    super(props);
    const { id } = this.props.match.params;
    this.state = { plant: this.props.plants.find(p => p.id == id), }
    this.btnBackClick = this.btnBackClick.bind(this);
    this.btnRegisterProduce = this.btnRegisterProduce.bind(this);
  }

  componentDidMount() {

  }

  btnBackClick() {
    this.props.history.goBack();
  }

  btnRegisterProduce() {
    this.props.history.push('/produce')
  }

  render () {
    console.log(this.state);
    const { plant } = this.state;
    const image = this.props.images.get(plant.imageId);
    return (
      <div className="rounded box-shadow my-3 p-3 container bg-white">

        <img src={image} alt='plant' className="card-img-top" /> 

        <button className="btn btn-primary mr-2" onClick={this.btnBackClick}>Til baka</button>
        <button className="btn btn-primary" onClick={this.btnRegisterProduce}>Skrá uppskeru</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { plants } = state.plantStore;
  const selectedPlant = selectPlantById(state, 1);
  return {
    plants,
    plant: selectedPlant,
    images: state.imageStore.images,
  }
};

export default connect(
  mapStateToProps, 
  {
    getPlants: getPlants.request,
    getImage: getImage.request,
  }
)(PlantDetailsPage)