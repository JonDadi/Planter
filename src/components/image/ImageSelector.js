import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ImageSelector extends Component {
  render() {
    return (
      <div>
        <input type="file" multiple="multiple" onChange={this.props.onChange} id="image" />
      </div>
    )
  }
}

export default ImageSelector
