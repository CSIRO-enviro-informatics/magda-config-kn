import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    Panel,
    Label,
    Table,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

import "./DataSet.css";
import API from "../config";

import DatasetPreview from "./DatasetPreview";
import { parseDataset } from "../helpers/record";

import { Helmet } from "react-helmet";

const tooltip = <Tooltip id="tooltip">Search with this label</Tooltip>;

export default class DataSetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            dataset: "",
            pub_id: "",
            perPage: 30,
            currentPage: 0
        };
    }

    componentWillMount(props) {
        this.setState({
            id: this.props.match.params.id,
            pub_id: this.props.match.params.pub_id
        });
    }

    componentDidMount() {
        this.getData();
    }

    updateCurrentPage = page => {
        this.setState({ currentPage: page });
    };

    getData() {
        fetch(API.dataSetDetail + this.state.id + API.dataSetDetail_allAspects)
            .then(response => {
                // console.log(response)
                if (response.status === 200) {
                    return response.json();
                } else console.log("Get data error ");
            })
            .then(json => {
                // console.log(json)
                this.setState({ dataset: json });
            })
            .catch(error => {
                console.log("error on .catch", error);
            });
    }

    render() {
        if (this.state.dataset === "") return <p />;
        const dataset = parseDataset(this.state.dataset);
        return (
            <div>
                <Helmet>
                    <script type="application/ld+json">{`
{
    "@context":"https://schema.org/",
    "@type":"Dataset",
    "name":"Test schema.org",
    "description":"schema.org goes here",
    "url":"https://knowledgenet.co",
    "sameAs":"https://www.csiro.au",
    "keywords":[
       "insert keywords" 
       ],
    "creator":{
       "@type":"Organization",
       "url": "https://www.csiro.au",
       "name":"CSIRO",
       "contactPoint":{
          "@type":"ContactPoint",
          "contactType": "CSIRO Enquiries",
          "email":"contact@csiro.au"
       }
    },
   
  }
      `}</script>
                </Helmet>

                <Grid bsClass="searchResultContainer">
                    <Row>
                        <h2>RESOURCE </h2>
                        <hr />
                        <Col md={10}>
                            <h4> Name: {this.state.dataset.name}</h4>
                            <code>KN ID: {this.state.dataset.id}</code>
                            <p />

                            <Table striped condensed hover>
                                <tbody>
                                    <tr>
                                        <td>Publisher:</td>
                                        <td>
                                            {this.state.dataset.aspects[
                                                "dataset-publisher"
                                            ]
                                                ? this.state.dataset.aspects[
                                                      "dataset-publisher"
                                                  ].publisher.name
                                                : ""}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Data Set Type:</td>
                                        <td>
                                            {
                                                this.state.dataset.aspects
                                                    .source.type
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Source:</td>
                                        <td>
                                            <a
                                                href={
                                                    this.state.dataset.aspects
                                                        .source.name
                                                }
                                            >
                                                {
                                                    this.state.dataset.aspects
                                                        .source.name
                                                }
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Canonical Link:</td>
                                        <td>
                                            <a
                                                href={
                                                    this.state.dataset.aspects[
                                                        "dcat-dataset-strings"
                                                    ].landingPage
                                                }
                                            >
                                                {" "}
                                                {
                                                    this.state.dataset.aspects[
                                                        "dcat-dataset-strings"
                                                    ].landingPage
                                                }{" "}
                                            </a>
                                        </td>
                                    </tr>
                                    {this.state.dataset.aspects[
                                        "dataset-linked-data-rating"
                                    ] ? (
                                        <tr>
                                            <td>Linked Data Rating: </td>
                                            <td>
                                                {" "}
                                                <Label bsStyle="info">
                                                    {" "}
                                                    {
                                                        this.state.dataset
                                                            .aspects[
                                                            "dataset-linked-data-rating"
                                                        ].stars
                                                    }{" "}
                                                </Label>{" "}
                                            </td>
                                        </tr>
                                    ) : null}
                                    {this.state.dataset.aspects[
                                        "dataset-quality-rating"
                                    ] ? (
                                        <tr>
                                            <td>Dataset Quality: </td>
                                            <td>
                                                <Label bsStyle="info">
                                                    {" "}
                                                    Score:{" "}
                                                    {
                                                        this.state.dataset
                                                            .aspects[
                                                            "dataset-quality-rating"
                                                        ][
                                                            "dataset-linked-data-rating"
                                                        ].score
                                                    }{" "}
                                                </Label>{" "}
                                                &nbsp; &nbsp;
                                                <Label bsStyle="info">
                                                    {" "}
                                                    Weighting:{" "}
                                                    {
                                                        this.state.dataset
                                                            .aspects[
                                                            "dataset-quality-rating"
                                                        ][
                                                            "dataset-linked-data-rating"
                                                        ].weighting
                                                    }
                                                </Label>
                                            </td>
                                        </tr>
                                    ) : null}

                                    <tr>
                                        <td>Tags/Keywords:</td>
                                        <td className="cw-table-list">
                                            {this.state.dataset.aspects[
                                                "dcat-dataset-strings"
                                            ].keywords
                                                ? this.state.dataset.aspects[
                                                      "dcat-dataset-strings"
                                                  ].keywords.map((ele, key) => {
                                                      return (
                                                          <OverlayTrigger
                                                              bsClass="label-wrap"
                                                              placement="top"
                                                              overlay={tooltip}
                                                              key={key}
                                                          >
                                                              <div className="cust-label">
                                                                  <Link
                                                                      to={`/search/${ele}`}
                                                                  >
                                                                      {" "}
                                                                      {ele}
                                                                  </Link>{" "}
                                                                  &nbsp;{" "}
                                                              </div>
                                                          </OverlayTrigger>
                                                      );
                                                  })
                                                : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tags/Keywords:</td>
                                        <td>
                                            {
                                                this.state.dataset.aspects[
                                                    "dcat-dataset-strings"
                                                ].description
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="dataset-preview">
                                <DatasetPreview dataset={dataset} />
                            </div>

                            <h4>RESOURCES</h4>
                            <ul>
                                {this.state.dataset.aspects[
                                    "dataset-distributions"
                                ]
                                    ? this.state.dataset.aspects[
                                          "dataset-distributions"
                                      ].distributions
                                          .filter(
                                              (value, index) =>
                                                  index >=
                                                      this.state.currentPage *
                                                          this.state.perPage &&
                                                  index <
                                                      this.state.currentPage *
                                                          this.state.perPage +
                                                          this.state.perPage
                                          )
                                          .map((ele, key) => {
                                              console.log(
                                                  ele.aspects[
                                                      "dcat-distribution-strings"
                                                  ].downloadURL &&
                                                      ele.aspects[
                                                          "dcat-distribution-strings"
                                                      ].accessURL
                                              );
                                              return ele.aspects[
                                                  "dcat-distribution-strings"
                                              ].downloadURL === undefined &&
                                                  ele.aspects[
                                                      "dcat-distribution-strings"
                                                  ].accessURL === undefined ? (
                                                  <li key={key}>
                                                      <span className="glyphicon glyphicon-link" />
                                                      Both download URL and
                                                      access URL unavilable, try
                                                      using{" "}
                                                      <a
                                                          href={
                                                              ele.aspects[
                                                                  "source"
                                                              ].url
                                                          }
                                                      >
                                                          Data source URL
                                                      </a>
                                                  </li>
                                              ) : ele.aspects[
                                                  "dcat-distribution-strings"
                                              ].downloadURL ? (
                                                  <li key={key}>
                                                      <span className="glyphicon glyphicon-link" />
                                                      <a
                                                          href={
                                                              ele.aspects[
                                                                  "dcat-distribution-strings"
                                                              ].downloadURL
                                                          }
                                                      >
                                                          {ele.name}{" "}
                                                      </a>
                                                      {ele.aspects[
                                                          "dcat-distribution-strings"
                                                      ].format
                                                          ? "(" +
                                                            ele.aspects[
                                                                "dcat-distribution-strings"
                                                            ].format +
                                                            ")"
                                                          : ""}
                                                      {ele.aspects[
                                                          "dcat-distribution-strings"
                                                      ].license ? (
                                                          <i>
                                                              &nbsp; &copy;{" "}
                                                              {
                                                                  ele.aspects[
                                                                      "dcat-distribution-strings"
                                                                  ].license
                                                              }{" "}
                                                          </i>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </li>
                                              ) : (
                                                  <li key={key}>
                                                      <span className="glyphicon glyphicon-link" />
                                                      {ele.name}{" "}
                                                      <i>
                                                          (Download unavailable,
                                                          try using{" "}
                                                          <a
                                                              href={
                                                                  ele.aspects[
                                                                      "dcat-distribution-strings"
                                                                  ].accessURL
                                                              }
                                                          >
                                                              {" "}
                                                              this URL{" "}
                                                          </a>for access)
                                                      </i>
                                                      {ele.aspects[
                                                          "dcat-distribution-strings"
                                                      ].format
                                                          ? "(" +
                                                            ele.aspects[
                                                                "dcat-distribution-strings"
                                                            ].format +
                                                            ")"
                                                          : ""}
                                                      {ele.aspects[
                                                          "dcat-distribution-strings"
                                                      ].license ? (
                                                          <i>
                                                              &nbsp; &copy;{" "}
                                                              {
                                                                  ele.aspects[
                                                                      "dcat-distribution-strings"
                                                                  ].license
                                                              }{" "}
                                                          </i>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </li>
                                              );
                                          })
                                    : "None"}
                                {console.log(
                                    this.state.dataset,
                                    this.state.dataset.catalog
                                )}
                                <br />
                                {this.state.dataset.aspects[
                                    "dataset-distributions"
                                ] &&
                                this.state.dataset.aspects[
                                    "dataset-distributions"
                                ].distributions.length >= 24 &&
                                this.state.dataset.aspects["source"].id ===
                                    "dap" ? (
                                    <a
                                        href={
                                            this.state.dataset.aspects[
                                                "dcat-dataset-strings"
                                            ].landingPage
                                        }
                                    >
                                        {" "}
                                        ... More resources (orginal datasource
                                        site) ...
                                    </a>
                                ) : (
                                    ""
                                )}
                            </ul>

                            <Pagination
                                perPage={this.state.perPage}
                                total={
                                    this.state.dataset.aspects[
                                        "dataset-distributions"
                                    ]
                                        ? this.state.dataset.aspects[
                                              "dataset-distributions"
                                          ].distributions.length
                                        : 0
                                }
                                updateCurrentPage={this.updateCurrentPage}
                            />
                        </Col>
                        <Col md={2}>
                            <div className="kn-stats">
                                {/* <h5>KN STATS</h5>
                        <ul>
                            <li><span className="glyphicon glyphicon-search"></span> 0 </li>
                            <li><span className="glyphicon glyphicon-heart-empty"></span> 0 </li>
                            <li><span className="glyphicon glyphicon-list"></span> 0 </li>
                            <li><span className="glyphicon glyphicon-comment"></span> 0 </li>
                            <li><span className="glyphicon glyphicon-bookmark"></span> 0 </li>
                        </ul> */}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={10}>
                            <hr />
                            <Panel id="dataset-detail" bsStyle="info">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Click to get More Detail
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <pre>
                                            {JSON.stringify(
                                                this.state.dataset,
                                                undefined,
                                                2
                                            )}
                                        </pre>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
