import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Well } from "react-bootstrap";
import API from "../config";
import "./Home.css";

export default class GraphStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: 0,
            organisations: 0,
            thematicAreas: 0,
            datasource: new Map()
        };
    }

    componentWillMount(props) {
        this.setState({ dataSet: "" });
    }

    componentDidMount() {
        this.getData();
        this.getDataSource();
    }
    getData() {
        fetch(API.datasetCount)
            .then(response => {
                // console.log(response)
                if (response.status === 200) {
                    return response.json();
                } else console.log("Get data error ");
            })
            .then(json => {
                this.setState({ dataSet: json.count });
            })
            .catch(error => {
                console.log("error on .catch", error);
            });
        fetch(API.organisationsCount)
            .then(response => {
                // console.log(response)
                if (response.status === 200) {
                    return response.json();
                } else console.log("Get data error ");
            })
            .then(json => {
                this.setState({ organisations: json.count });
            })
            .catch(error => {
                console.log("error on .catch", error);
            });
    }

    async getDataSource() {
        let allDataSources = [];
        let pageToken = 0;
        while (pageToken >= 0) {
            const response = await fetch(
                API.dataSetOrg + "&pageToken=" + pageToken
            );
            let responseJson = await response.json();
            pageToken = responseJson.nextPageToken
                ? responseJson.nextPageToken
                : -1;
            allDataSources = allDataSources.concat(responseJson.records);
        }
        this.organizeDataSource(allDataSources);
    }

    organizeDataSource(data) {
        let sourceMap = new Map();
        data.map(record => {
            if (!sourceMap.has(record.aspects.source.name))
                sourceMap.set(
                    record.aspects.source.name,
                    record.aspects.source
                );
            return null;
        });
        this.setState({ datasource: sourceMap });
    }

    render() {
        return (
            <div className="graph-stats-container">
                <div className="graph-stats datasets  text-left">
                    <Well>
                        <span className="graph-stats-number">
                            <Link to="/dataset">{this.state.dataSet}</Link>
                        </span>
                        <br />
                        <span> discoverable datasets </span>
                    </Well>
                </div>
                <div className="graph-stats datasets text-left">
                    <Well>
                        <span className="graph-stats-number">
                            <Link to="/datasource">
                                {this.state.datasource.size}
                            </Link>
                        </span>
                        <br />
                        <span> data sources </span>
                    </Well>
                </div>

                <div className="graph-stats organisations datasets text-left">
                    <Well>
                        <span className="graph-stats-number">
                            <Link to="/publisher">
                                {this.state.organisations}
                            </Link>
                        </span>
                        <br />
                        <span> publishers </span>
                    </Well>
                </div>

                {/* 
            <div className="graph-stats datasets text-left">
                <Well>
                    <span className="graph-stats-number">
                        <Link to='/thematic'>number</Link>
                    </span>
                    <br />
                    <span> thematic areas </span>
                </Well>
            </div> */}
            </div>
        );
    }
}
