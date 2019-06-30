import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProduceForm from './ProduceForm';

export class CreateProduce extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className="card m-3 p-3">
        <div className="card-body">
          <h5 className="card-title mb-4">Ný uppskera</h5>
          <ProduceForm history={this.props.history}/>  
        </div>      
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduce)
