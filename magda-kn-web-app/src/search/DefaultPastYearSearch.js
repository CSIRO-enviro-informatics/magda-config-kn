import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import SearchNavPills from './SearchNavPills'
import SearchForm from './SearchForm'
import './SearchResult.css'

export default class DefaultPastYearSearch extends Component {
    constructor(props){
        super(props)
        // this.state = {searchText: '+from+2018'};
        this.state = {searchText: ''};
      }

    // updateSearchStatus = (text) => {
    //     let text_time_tag = text + '+from+2018'
    //     this.setState({searchText: text_time_tag})
    //     this.refDisplay.updateSearchText(text_time_tag)
    // }

    render(){
        return (
            <Grid bsClass="searchResultContainer">
            <SearchForm searchText={this.state.searchText}  {...this.props} />
            <Row>
            <Col xs={12}>
               <SearchNavPills ref={refDisplay => {this.refDisplay = refDisplay}} searchText={this.state.searchText} {...this.props} />
            </Col>
            </Row>
        </Grid>
        )
    }
}