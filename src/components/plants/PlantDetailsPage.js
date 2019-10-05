import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { mdiWaterPump  } from '@mdi/js'; 
import Icon from '@mdi/react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getPlants } from '../../api/plants/actions';
import { getImage } from '../../api/images/actions';
import { selectPlantById } from '../../api/plants/selectors';
import mockplant from '../../img/plant1.png'
import backArrow from '../../img/backArrow.png'

import './styles.scss';
import { Paper } from '@material-ui/core';

class PlantDetailsPage extends Component {
  
  constructor(props){
    super(props);
    const { id } = this.props.match.params;
    this.state = { plant: this.props.plants.find(p => p.id == id), }
    this.btnBackClick = this.btnBackClick.bind(this);
    this.btnRegisterProduce = this.btnRegisterProduce.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  getImages() {
    const { images } = this.props;
  }

  componentDidMount() {
    const { images } = this.props;
    const { plant } = this.state;

    if (images) {
      for(let i = 0; i < plant.images.length; i++) {
        this.props.getImage(plant.images[i].item1);
      }
    }
  }

  btnBackClick() {
    this.props.history.goBack();
  }

  btnRegisterProduce() {
    this.props.history.push('/produce')
  }

  render () {
    const { plant } = this.state;
    if(!plant) return <h1>Loading...</h1>
    const { images } = plant;
    const thumbnail = images[Math.floor(Math.random()*images.length)].item1;
    const image = this.props.images[thumbnail];
    console.log(plant); 
    return (
      <div className="p-5">
        <Grid 
          container 
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item className="mb-5">
            <img src={image} alt='plant' className="img-fluid" style={{maxWidth: 300}}/> 
          </Grid>
          <Grid item>
            <Typography variant="h2" gutterBottom>
              {plant.name}  
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              <b>Gróðursett:</b> {moment(plant.datePlanted).format('LL')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Aldur:</b> 3 mánaða
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Tegund:</b> Basil
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Staðsetning:</b> Gluggi
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Lýsing:</b> {plant.description}
            </Typography>
          </Grid>
          <Grid
            container 
            direction="column"
            justify="flex-start"
            alignItems="center"
            className="mt-5"
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Vökvanir
              </Typography>
            </Grid>
            <Grid item style={{width: 300}}>
              <Paper className="p-2 m-2">
                test vökvun
              </Paper>
              <Paper className="p-2 m-2">
                <Icon path={mdiWaterPump } size={1.5} color="gray"/>test vökvun 2
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container 
            direction="column"
            justify="flex-start"
            alignItems="center"
            className="mt-5"
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Uppskerur
              </Typography>
            </Grid>
            <Grid item>
              <Paper className="p-2">
                <Grid container>
                  <Grid item>
                  <Typography variant="body1" gutterBottom>
                    8 dagar síðan
                  </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Paper className="p-2">
                test uppskera
              </Paper>
            </Grid>
          </Grid>
          {/* <Grid item>
            <button className="btn btn-primary mr-2" onClick={this.btnBackClick}>Til baka</button>
            <button className="btn btn-primary" onClick={this.btnRegisterProduce}>Skrá uppskeru</button>
          </Grid> */}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { plants } = state.plantStore;
  const selectedPlant = selectPlantById(state, 64);
  return {
    plants,
    plant: selectedPlant,
    images: state.imageStore.images,
    isLoading: state.imageStore.isLoading,
  }
};

export default connect(
  mapStateToProps, 
  {
    getPlants: getPlants.request,
    getImage: getImage.request,
  }
)(PlantDetailsPage)