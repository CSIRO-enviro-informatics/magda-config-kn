import React, {Component } from 'react'

import {Badge } from 'react-bootstrap'
import './SearchResult.css'

class Checkbox extends Component {
    state = {
      isChecked: false,
    }
  
    toggleCheckboxChange = () => {
      const { handleCheckboxChange, label } = this.props;
  
      this.setState(({ isChecked }) => (
        {
          isChecked: !isChecked,
        }
      ));
  
      handleCheckboxChange(label);
    }
    componentDidMount(){
      const { label, initChecked } = this.props;
      if(initChecked.has(label)){
        this.setState({isChecked: true })
      }
     
    }
  
    render() {
      const { label, hitCount } = this.props;
      let isChecked = this.state.isChecked
      return (
          <label>
            <input
                type="checkbox"
                value={label}
                checked={isChecked}
                onChange={this.toggleCheckboxChange}
            />
            {label}
            <Badge bsClass="badge-success" pullRight>{hitCount}</Badge>
          </label>
      );
    }
  }
  
  export default Checkbox;