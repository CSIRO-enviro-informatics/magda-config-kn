import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";

import API from "../config";
import PublisherViews from "./PublisherViews";
import "./DataSet.css";

export default class AllPublishers extends Component {
    constructor(props) {
        super(props);
        this.state = { datasetInfo: [], totalCount: 0, viewType: "line" };
        //view type: line, grid
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        fetch(API.dataSetOrg)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else console.log("Get data error ");
            })
            .then(json => {
                // console.log(json)
                // this.setState({datasetInfo: json.records, totalCount: json.totalCount})
                this.organizeDataSource(json);
            })
            .catch(error => {
                console.log("error on .catch", error);
            });
    }

    organizeDataSource(data) {
        //Source map id as key, souce object as value
        let sourceMap = new Map();
        let sourcePublisherMap = new Map();
        data.records.map(record => {
            if (!sourceMap.has(record.aspects.source.id))
                sourceMap.set(record.aspects.source.id, record.aspects.source);
            let publisherArray =
                sourcePublisherMap.get(record.aspects.source.id) || [];
            publisherArray.push(record);
            sourcePublisherMap.set(record.aspects.source.id, publisherArray);
            return null;
        });
        this.setState({
            datasource: sourceMap,
            sourcePublisherMap: sourcePublisherMap
        });
    }

    render() {
        return (
            <Grid bsClass="padding-top">
                <Row>
                    <h2>Publishers</h2>
                </Row>
                <PublisherViews
                    publisherMap={this.state.sourcePublisherMap}
                    datasource={this.state.datasource}
                    default="All"
                />
            </Grid>
        );
    }
}
