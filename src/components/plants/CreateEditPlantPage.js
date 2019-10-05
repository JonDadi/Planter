import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PlantForm from './PlantForm';

export class CreateEditPlantPage extends Component {
  render() {
    return (
      <div className="px-auto">
        <div className="row ">
          <div className="col-md-6 col-s-12 mx-auto">
            <div className="card p-3 m-3">
              <div className="card-body text-center">
                <h5 className="card-title mb-2 "> Ný planta </h5>
                <PlantForm history={this.props.history} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPlantPage)
