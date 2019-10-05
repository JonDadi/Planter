import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
import { maxWidth } from '@material-ui/system';

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
    for (const imageId in images) {
      if (!isLoaded) this.props.getImage(images[imageId].item1);
    }

    const thumbnail = images[Math.floor(Math.random()*images.length)] ?
                      images[Math.floor(Math.random()*images.length)].item1 : null;

    this.setState({
      thumbnail,
    })

  }

  render() {
    const { plant, onClick, onWateringClick, images, isLoading } = this.props;
    const { thumbnail } = this.state;
    const image = thumbnail ? images[thumbnail]: sproutSpinner;
    return (
      <Card style={{maxWidth: 330}}>
        <CardActionArea onClick={() => onClick(plant.id)}>
          {image && (
            <CardMedia
              image={image}
              component="img"
              className="img-fluid"
              style={{maxHeight: 300, objectFit: 'fill'}} 
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {plant.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {moment(plant.datePlanted).format('LL')}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {plant.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button color="primary" onClick={evt => onWateringClick(plant.id)}>
            Vökva
          </Button>
          <Button color="primary" onClick={evt => console.log("vökva, TODO")}>
            Ný mynd
          </Button>
          <Button color="primary" onClick={evt => console.log("vökva, TODO")}>
            Skrá uppskeru
          </Button>
        </CardActions>
      </Card>
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
