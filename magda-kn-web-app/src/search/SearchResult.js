import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import SearchNavPills from './SearchNavPills'
import SearchForm from './SearchForm'
import './SearchResult.css'

export default class SearchResult extends Component {
    constructor(props){
        super(props)
        this.state = {searchText: '', info: ''};
      }
    
    componentWillMount(){
        if(this.props.match.params.text !== undefined){
            this.setState({searchText: this.props.match.params.text})
        }
    }

    updateSearchStatus = (text) => {
        this.setState({info:''})
        this.setState({searchText: text})
        this.refDisplay.updateSearchText(text)
        
    }

    render(){
        return (
            <Grid bsClass="searchResultContainer">
            <SearchForm searchText={this.state.searchText} updateSearchStatus={this.updateSearchStatus} {...this.props} />

            <Row>
            <Col xs={12}>
               <SearchNavPills ref={refDisplay => {this.refDisplay = refDisplay}} searchText={this.state.searchText} {...this.props} />
            </Col>
            </Row>
        </Grid>
        )
    }
}