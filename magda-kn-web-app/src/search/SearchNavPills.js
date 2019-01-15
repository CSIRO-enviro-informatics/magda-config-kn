import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import Slider from "rc-slider";
import { OrderedSet } from "immutable";
import SearchResultView from "./SearchResultView";
import Checkbox from "./Checkbox";
import Pagination from "../dataset/Pagination";
import BubbleChart from "../dataset/BubbleChart";
import API from "../config";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./SearchResult.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);

export default class SearchNavPills extends Component {
    constructor(props) {
        super(props);
        let d = new Date();
        const pastYear = d.getFullYear() - 1;
        this.min = 0;
        this.max = 40000;
        this.state = {
            searchText: "",
            searchResult: "",
            total: 0,
            perPage: 10,
            currentPage: 0,
            defaultSearchText: "+from+" + pastYear,
            min: this.min,
            max: this.max,
            facetPublisherCollapse: false,
            facetFormatCollapse: false,
            keywords: []
        };
    }

    componentWillMount() {
        this.selectedPublisherCheckboxes = new Set();
        this.selectedFormatCheckboxes = new Set();
        this.dateRange = new OrderedSet();

        // console.log(this.props.match.params.searchText)
        if (this.props.match.params.searchText) {
            this.setState({ searchText: this.props.match.params.searchText });
        } else {
            this.setState({ searchText: this.props.searchText });
        }
    }
    componentDidMount() {
        this.getData(this.state.searchText, 0, this.state.perPage);
    }

    updateSearchText = text => {
        this.setState({ searchText: text });
        this.getData(text, 0, 10);
    };
    updateCurrentPage = page => {
        this.setState({ currentPage: page });
        this.getData(this.preparSearchText(), page * this.state.perPage, 10);
    };
    preparSearchText() {
        let byPublisher = "";
        let byFormat = "";
        let fromto = "";
        for (const checkbox of this.selectedPublisherCheckboxes) {
            byPublisher =
                byPublisher + "&publisher=" + encodeURIComponent(checkbox);
        }
        for (const checkbox of this.selectedFormatCheckboxes) {
            byFormat = byFormat + "&format=" + encodeURIComponent(checkbox);
        }
        if (this.state.min !== 0) {
            fromto = fromto + "&dateFrom=" + this.min;
        }
        if (this.state.max !== 40000) {
            fromto = fromto + "&dateTo=" + this.max;
        }
        return this.state.searchText + byPublisher + byFormat + fromto;
    }

    getData(query, start, limit) {
        // console.log(API.search + 'datasets?query=' + query + '&start='+start + '&limit='+limit+'&facetSize=99999')
        fetch(
            API.search +
                "datasets?query=" +
                query +
                "&start=" +
                start +
                "&limit=" +
                limit +
                "&facetSize=99999"
        )
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else console.log("Get data error ");
            })
            .then(json => {
                // console.log(json)
                this.setState({ searchResult: json, total: json.hitCount });
                let newFormats = new Set();
                for (let ele of json.facets[1].options) {
                    if (this.selectedFormatCheckboxes.has(ele.value)) {
                        newFormats.add(ele.value);
                    }
                }
                this.selectedFormatCheckboxes = new Set([...newFormats.keys()]);
                let newPublishers = new Set();
                for (let ele of json.facets[0].options) {
                    if (this.selectedPublisherCheckboxes.has(ele.value)) {
                        newPublishers.add(ele.value);
                    }
                }
                this.selectedPublisherCheckboxes = new Set([
                    ...newPublishers.keys()
                ]);
                // this.getKeywords()
                // Calculate date range
                // const year = json.facets[1].options
                // for(let key in year){
                //     this.dateRange = this.dateRange.add(year[key].lowerBound)
                //     this.dateRange = this.dateRange.add(year[key].upperBound)
                // }
                // this.setState({
                //     min: this.dateRange.min(),
                //     max: this.dateRange.max()
                // })
            })
            .catch(error => {
                console.log("error on .catch", error);
            });
    }
    getKeywords() {
        let query = (this.query = {
            size: 0,
            aggs: {
                formats: {
                    terms: {
                        field: "keywords.keyword",
                        size: 100
                    }
                }
            }
        });
        let queryUrl = this.state.searchText
            ? API.elasticSearch + "?q=" + this.state.searchText
            : API.elasticSearch;
        fetch(queryUrl, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(query)
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                let keywords = json.aggregations.formats.buckets.map(keys => {
                    return { label: keys.key, value: keys.doc_count };
                });
                this.setState({
                    keywords: keywords
                });
            })
            .catch(error => console.log(error));
    }
    keywordClick = keyword => {
        this.props.history.push("/search/" + keyword);
    };

    togglePublisherCheckbox = label => {
        if (this.selectedPublisherCheckboxes.has(label)) {
            this.selectedPublisherCheckboxes.delete(label);
        } else {
            this.selectedPublisherCheckboxes.add(label);
        }
        console.log(this.selectedPublisherCheckboxes);
    };
    toggleFormatCheckbox = label => {
        if (this.selectedFormatCheckboxes.has(label)) {
            this.selectedFormatCheckboxes.delete(label);
        } else {
            this.selectedFormatCheckboxes.add(label);
        }
        console.log(this.selectedFormatCheckboxes);
    };
    togglePublisherCollapse = e => {
        e.preventDefault();
        this.setState({
            facetPublisherCollapse: !this.state.facetPublisherCollapse
        });
    };
    toggleFormatCollapse = e => {
        e.preventDefault();
        this.setState({ facetFormatCollapse: !this.state.facetFormatCollapse });
    };
    createPublisherCheckbox(label, hitCount) {
        return (
            <Checkbox
                label={label}
                handleCheckboxChange={this.togglePublisherCheckbox}
                key={label}
                initChecked={this.selectedPublisherCheckboxes}
                hitCount={hitCount}
            />
        );
    }
    createFormatCheckbox(label, hitCount) {
        return (
            <Checkbox
                label={label}
                handleCheckboxChange={this.toggleFormatCheckbox}
                key={label}
                initChecked={this.selectedFormatCheckboxes}
                hitCount={hitCount}
            />
        );
    }
    filterButtonSubmit = () => {
        console.log(this.preparSearchText());
        this.getData(this.preparSearchText(), 0, 10);
    };

    onAfterChange = value => {
        // console.log(value)
        this.min = value[0];
        this.max = value[1];
    };
    render() {
        if (this.state.searchResult === "") return <p />;

        return (
            <div className="paddomg-top">
                <i>
                    {" "}
                    {this.state.searchResult.hitCount} datasets found
                    {this.state.searchResult.query.dateFrom
                        ? " from date " +
                          this.state.searchResult.query.dateFrom.substring(
                              0,
                              10
                          )
                        : ""}
                    {this.state.searchResult.query.dateTo
                        ? " from date " +
                          this.state.searchResult.query.dateTo.substring(0, 10)
                        : ""}
                </i>
                <hr />

                {console.log(this.state.searchResult)}
                <Grid>
                    <Row>
                        <Col md={8}>
                            <SearchResultView
                                result={this.state.searchResult}
                            />
                        </Col>
                        <Col md={4}>
                            {/* <BubbleChart
                                graph= {{
                                    zoom: 0.5,
                                    offsetX: -0.00,
                                    offsetY: -0.00,
                                }}
                                showLegend={false} // optional value, pass false to disable the legend.
                                weight={300}
                                height={400}
                                valueFont={{
                                        family: 'Arial',
                                        size: 12,
                                        color: '#fff',
                                        weight: 'bold',
                                    }}
                                labelFont={{
                                        family: 'Arial',
                                        size: 16,
                                        color: '#fff',
                                        weight: 'normal',
                                    }}
                                data={this.state.keywords}
                                onclick={this.keywordClick}
                            />
                            <hr /> */}
                            <div className="right-filter">
                                <Row>
                                    <h3 className="col-xs-8">
                                        <a
                                            href="#"
                                            onClick={
                                                this.togglePublisherCollapse
                                            }
                                        >
                                            {
                                                this.state.searchResult
                                                    .facets[0].id
                                            }
                                            &nbsp;
                                            {this.state
                                                .facetPublisherCollapse ? (
                                                <i className="fas fa-angle-double-up" />
                                            ) : (
                                                <i className="fas fa-angle-double-down" />
                                            )}
                                        </a>
                                    </h3>
                                    <span className="col-xs-4 pull-right">
                                        <Button
                                            bsStyle="info"
                                            onClick={this.filterButtonSubmit}
                                        >
                                            {" "}
                                            Refine Result{" "}
                                        </Button>
                                    </span>
                                </Row>
                                <hr />
                                <ul className="cust-list">
                                    {this.state.facetPublisherCollapse
                                        ? this.state.searchResult.facets[0].options.map(
                                              (value, key) => {
                                                  return (
                                                      <li
                                                          className="checkbox"
                                                          key={key}
                                                      >
                                                          {this.createPublisherCheckbox(
                                                              value.value,
                                                              value.hitCount
                                                          )}
                                                      </li>
                                                  );
                                              }
                                          )
                                        : this.state.searchResult.facets[0].options
                                              .slice(0, 15)
                                              .map((value, key) => {
                                                  return (
                                                      <li
                                                          className="checkbox"
                                                          key={key}
                                                      >
                                                          {this.createPublisherCheckbox(
                                                              value.value,
                                                              value.hitCount
                                                          )}
                                                      </li>
                                                  );
                                              })}
                                </ul>
                                <br />
                                <Row>
                                    <h3 className="col-xs-8">
                                        <a
                                            href="#"
                                            onClick={this.toggleFormatCollapse}
                                        >
                                            {
                                                this.state.searchResult
                                                    .facets[1].id
                                            }
                                            &nbsp;
                                            {this.state.facetFormatCollapse ? (
                                                <i className="fa fa-angle-double-up" />
                                            ) : (
                                                <i className="fa fa-angle-double-down" />
                                            )}
                                        </a>
                                    </h3>
                                </Row>
                                <hr />

                                <ul className="cust-list">
                                    {this.state.facetFormatCollapse
                                        ? this.state.searchResult.facets[1].options.map(
                                              (value, key) => {
                                                  return (
                                                      <li
                                                          className="checkbox"
                                                          key={key}
                                                      >
                                                          {this.createFormatCheckbox(
                                                              value.value,
                                                              value.hitCount
                                                          )}
                                                      </li>
                                                  );
                                              }
                                          )
                                        : this.state.searchResult.facets[1].options
                                              .slice(0, 15)
                                              .map((value, key) => {
                                                  return (
                                                      <li
                                                          className="checkbox"
                                                          key={key}
                                                      >
                                                          {this.createFormatCheckbox(
                                                              value.value,
                                                              value.hitCount
                                                          )}
                                                      </li>
                                                  );
                                              })}
                                </ul>
                                <br />

                                {/* <h4>Date Range</h4>
                                <div className="slider">
                                <i>The Data Range is retrieved from datasets</i>
                                    <Range step={1} 
                                        defaultValue={[this.min, this.max]} 
                                        min={this.state.min} 
                                        max={this.state.max}
                                        onAfterChange={this.onAfterChange}
                                        dots={false}
                                        tipFormatter={value => `${value}`}
                                        allowCross={false}  />
                                    <i>{this.state.min}</i><i className="pull-right">{this.state.max} </i>
                                </div> */}
                                <hr />
                                <Button
                                    bsStyle="info"
                                    className="pull-right"
                                    onClick={this.filterButtonSubmit}
                                >
                                    {" "}
                                    Refine Result{" "}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <Pagination
                    perPage={this.state.perPage}
                    total={this.state.total}
                    updateCurrentPage={this.updateCurrentPage}
                />
                <br />
            </div>
        );
    }
}
