import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import { connect } from 'react-redux'
import cactusSpinner from '../../img/cactusSpinner.svg';
import plantSpinner from '../../img/plantSpinner.svg';
import wheatSpinner from '../../img/wheatSpinner.svg';
import flowerSpinner from '../../img/flowerSpinner.svg';
import sproutSpinner from '../../img/sproutSpinner.svg';
import pottingSpinner from '../../img/pottingSpinner.svg';
import leafSpinner from '../../img/leafSpinner.svg';
import { getImage } from '../../api/images/actions';
import './styles.scss';

const spinners = [
  cactusSpinner,
  plantSpinner,
  wheatSpinner,
  flowerSpinner,
  sproutSpinner,
  pottingSpinner,
  leafSpinner,
]

export class PlantCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      thumbnail: null,
    }
  }


  componentDidMount() {
    const { images } = this.props.plant;
    const allImages = this.props.images;
    let isLoaded = false;

    for (const imageId in images){   
      console.log("í for", images[imageId].item1)
      

      isLoaded = allImages.has(images[imageId].item1);
      if (!isLoaded) this.props.getImage(images[imageId].item1);
    }

    const thumbnail = images[Math.floor(Math.random()*images.length)].item1;

    this.setState({
      thumbnail,
    })

  }

  render() {
    const { plant, onClick, images, isLoading } = this.props;
    const { thumbnail } = this.state;
    const image = images.get(thumbnail);
    return (
      
      <div className='card mt-5 shadow' style={ {width: '22rem'} }>
        <div className="card-body">
          { image ? 
            <img src={image} alt='plant' className="card-img-top" /> : 
            <img src={spinners[Math.floor(Math.random()*spinners.length)]} className="card-img-top"/>
          }
          <h5 className="card-title">{plant.name}</h5>
          <p>{plant.description}</p>
          <p>{moment(plant.datePlanted).format('LL')}</p>
          
          <button className="btn btn-primary" onClick={evt => onClick(plant.id)}>Nánar</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    const { images, isLoading } = state.imageStore;

    return {
      images,
      isLoading,
    }
}

const mapDispatchToProps = {
  getImage: getImage.request,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlantCard)
