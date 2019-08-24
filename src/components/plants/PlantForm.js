import React, { Component } from 'react'
import { connect } from 'react-redux';
import uuid from 'uuid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { postPlant } from '../../api/plants/actions'
import ImageSelector from '../image/ImageSelector';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

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
    this.changeDate = this.changeDate.bind(this);
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
  }

  handleCancel(e) {
    this.props.history.goBack();
  }

  changeDate(date) {
    console.log(date);
    const { values } = this.state;
    values['date'] = date.toISOString();
    this.setState({
      ...this.state,
      values,
    })
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
    const imageArray = [...this.state.images.values()];
    const pickedDate = this.state.values['date'];
    const pickedType = this.state.values['type'];
    console.log(this.state);
    return (
      <form autoComplete="off">
        <TextField
          id="name"
          label="Nafn"
          onChange={this.changeValue}
          margin="normal"
        />
        <br />
        <TextField
          id="description"
          label="Lýsing"
          onChange={this.changeValue}
          margin="normal"
        />
        <br />
        <TextField
          id="location"
          label="Staðsetning"
          onChange={this.changeValue}
          margin="normal"
        />
        <br />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/mm/yyyy"
          margin="normal"
          id="datePlanted"
          label="Dagsetning"
          onChange={this.changeDate}
          value={pickedDate}
          KeyboardButtonProps={{
            'aria-label': 'Plöntunar dagsetning',
          }}
        />
        <br />
      <FormControl style={{width: 250}}>
        <InputLabel htmlFor="type">Tegund</InputLabel>
        <Select
          value={1}
          onChange={this.handleChange}
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <MenuItem value={10}>Tómatar</MenuItem>
          <MenuItem value={20}>Jarðaber</MenuItem>
          <MenuItem value={30}>Basil</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <Typography>Myndir</Typography>
      <ImageSelector onChange={this.changeImage} name="image"></ImageSelector>
      <div className="row">
        {
          // TODO: Vantar að búa til component fyrir þetta drasl
          imageArray.map(i => {
          return (
            <div className="col-sm-12 col-md-6 col-lg-4" key={i.url}>
              <img src={i.url} className={"img-fluid mb-1"}/>
            </div>
            )
          })
        }
      </div>
      <br />
      <Button variant="contained" color="secondary" onClick={this.handleCancel} style={{marginRight: 10}}>
        Hætta við
      </Button>
      <Button variant="contained" color="primary" onClick={this.handleSubmit}>
        Vista
      </Button>
    </form>
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