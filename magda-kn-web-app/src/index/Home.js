import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import GraphStats from './GraphStats'
import SearchForm from '../search/SearchForm'
import './Home.css'

export default class Home extends Component {

  componentWillMount(props){
    this.setState({searchSubmit: false})
  }

  render() {
    return (
      <Grid bsClass="home">
      <br/>
      <br/>
      <br/>
        <SearchForm {...this.props} />
        <hr/>
        <Row>
          <Col xs={12}>
          <br/>
          <br/>
            <GraphStats />
          </Col>
        </Row>
      </Grid>
    )
  }
}
