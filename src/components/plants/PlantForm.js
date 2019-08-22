import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import uuid from 'uuid';
import { postPlant } from '../../api/plants/actions'
import ImageSelector from '../image/ImageSelector';

class PlantForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      imageId: null,
      imagePreview: null,
      images: new Map(), // Id => img, url
    };

    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  handleSubmit(e) {
    // Sækja öll gildi úr mappi 

    this.props.postPlant({
      ...this.state.values,
      images: this.state.images,
    });

    this.props.history.push('/');
  }

  changeImage(evt) {
    const { id, files } = evt.target;
    const { values, images } = this.state;
    const newImages = files;
    const copy = new Map(images);

    for(var i = 0; i < newImages.length; i++) {
      const imageType = newImages[i].name.substring(newImages[i].name.indexOf('.'));
      const id = uuid() + imageType;
      const url = URL.createObjectURL(newImages[i])
      copy.set(id, { image: newImages[i], url } ); 
    }

    this.setState({
      ...this.state,
      images: copy,
    })

    return null;
    const image = files[0];
    
    const imageType = image.name.substring(image.name.indexOf('.'));
    values[id] = image;
    

  }

  handleCancel(e) {
    this.props.history.goBack();
  }

  changeValue(evt) {
    const { id, value } = evt.target;
    const { values } = this.state;
    values[id] = value;

    this.setState({
      ...this.state,
      values,
    })
  }

  render() {
    console.log(this.state.images.entries());
    const imageArray = [...this.state.images.values()];
    return (
      <Form>
        <Form.Group controlId="name">
          <Form.Label> Nafn </Form.Label>
          <Form.Control onChange={this.changeValue} type="text"></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label> Lýsing </Form.Label>
          <Form.Control onChange={this.changeValue} type="text"></Form.Control>
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label> Staðsetning </Form.Label>
          <Form.Control onChange={this.changeValue} type="text"></Form.Control>
        </Form.Group>
        <Form.Group controlId="datePlanted">
          <Form.Label> Dagsetning </Form.Label>
          <Form.Control onChange={this.changeValue} type="date"></Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1" hidden={true}>
        <Form.Label>Tegund</Form.Label>
        <Form.Control as="select" onChange={this.changeValue}>
          <option>Basil</option>
          <option>Tómatur</option>
          <option>Jarðaber</option>
          <option>Oregano</option>
          <option>Timian</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="images">
        <Form.Label>Mynd</Form.Label>
        <ImageSelector onChange={this.changeImage}></ImageSelector>
        </Form.Group>
        <div className="col-6"></div>
        <div className="row">
          {
            // Vantar að búa til component fyrir þetta drasl
            imageArray.map(i => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-4" key={i.url}>
                <img src={i.url} className={"img-fluid mb-1"}/>
              </div>
              )
            })
          }
        </div>
        <Button className="px-4 m-1" variant="danger" onClick={this.handleCancel}>
          Hætta við
        </Button>
        <Button className="px-4 m-1" variant="primary" onClick={this.handleSubmit}>
          Geyma
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  const { plants } = state;
  return {
    plants,
  }
};

export default connect(
  mapStateToProps, 
  {
    getPlants: null,
    postPlant: postPlant.request,
  },
)(PlantForm)