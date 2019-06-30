import React, { Component } from 'react'
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Form, Button } from 'react-bootstrap';
import { postProduce } from '../../api/produce/actions'

class ProduceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      imageId: null,
      imagePreview: null,
    };

    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  changeImage(evt) {
    const { id, files } = evt.target;
    const { values } = this.state;
    const image = files[0];
    
    const imageType = image.name.substring(image.name.indexOf('.'));
    values[id] = image;
    
    this.setState({
      values,
      imageId: uuid() + imageType,
      imagePreview: URL.createObjectURL(image), 
    })
  }

  handleSubmit(e) {
    console.log(this.state);
    const id = uuid.v4();
    this.props.postProduce({
      ...this.state.values,
      imageId: this.state.imageId,
    });

    this.props.history.push('/');
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
    console.log(this.state);
    return (
      <Form>
        <Form.Group controlId="description">
          <Form.Label> Lýsing </Form.Label>
          <Form.Control onChange={this.changeValue} type="text"></Form.Control>
        </Form.Group>
        <Form.Group controlId="weight">
          <Form.Label> Þyngd </Form.Label>
          <Form.Control onChange={this.changeValue} type="number"></Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label> Dagsetning </Form.Label>
          <Form.Control onChange={this.changeValue} type="date"></Form.Control>
        </Form.Group>
        <Form.Group controlId="plantId">
        <Form.Label>Planta</Form.Label>
        <Form.Control as="select" onChange={this.changeValue}>
          <option value="1">Planta 1</option>
          <option value="2">Planta 2</option>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Mynd</Form.Label>
          <Form.Control type="file" onChange={this.changeImage}></Form.Control>
        </Form.Group>
        {this.state.imagePreview &&
          <img className="img-fluid mb-4" src={this.state.imagePreview} />
        }
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
  const { produce } = state.produceStore;
  return {
    produce,
  }
};

export default connect(
  mapStateToProps, 
  {
    getProduce: null,
    postProduce: postProduce.request,
  },
)(ProduceForm)