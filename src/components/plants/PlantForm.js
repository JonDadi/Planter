import React, { Component } from 'react'
import { connect } from 'react-redux';
import uuid from 'uuid';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { postPlant } from '../../api/plants/actions'
import ImageSelector from '../image/ImageSelector';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  subContainer: {
    textAlign: 'center',
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  imageContainer: {
    marginTop: 30,
    width: '100%',
  },
  datePicker: {
    width: '100%',
  },
  typesSelect: {
    width: '100%',
  },
  submitButton: {
    marginLeft: 10,
  }
};

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

    for (var i = 0; i < newImages.length; i++) {
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
    console.log(MomentUtils);
    const { classes } = this.props;
    const imageArray = [...this.state.images.values()];
    const pickedDate = this.state.values['date'] || moment();
    const pickedType = this.state.values['type'];
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>    
          <TextField
            id="name"
            label="Nafn"
            onChange={this.changeValue}
            margin="normal"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Lýsing"
            onChange={this.changeValue}
            margin="normal"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="location"
            label="Staðsetning"
            onChange={this.changeValue}
            margin="normal"
            className={classes.textField}
          />  
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                margin="normal"
                id="datePlanted"
                label="Dagsetning"
                onChange={this.changeDate}
                value={pickedDate}
                className={classes.datePicker}
                KeyboardButtonProps={{
                  'aria-label': 'Plöntunar dagsetning',
                }}
              />
            </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="type" className="float-left">Tegund</InputLabel>
          <Select
            value={1}
            className={classes.typesSelect}
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
        </Grid>
        <Grid item xs={12}>
          <Typography>Myndir</Typography>
          <ImageSelector onChange={this.changeImage} name="image"></ImageSelector>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
              {
                // TODO: Vantar að búa til component fyrir þetta drasl
                imageArray.map(i => {
                return (
                  <Grid item xs={12} md={6} xl={3} key={i.id}>
                    <img src={i.url} className={"img-fluid mb-1 p-2"} style={{maxHeight: 400}}/>
                  </Grid>
                  )
                })
              }
            </Grid>
      </Grid>
      <Grid container justify="center">
          <Button variant="contained" color="secondary" onClick={this.handleCancel}>
            Hætta við
          </Button>

          <Button variant="contained" color="primary" className={classes.submitButton} onClick={this.handleSubmit}>
            Vista
          </Button>
      </Grid>
    </Grid>
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
)(withStyles(styles)(PlantForm))