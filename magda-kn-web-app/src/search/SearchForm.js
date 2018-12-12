import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import "./SearchResult.css";

export default class SearchFrom extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: "" };
        this.searchTextChange = this.searchTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (this.props.match.params.text) {
            this.setState({ searchText: this.props.match.params.text });
        }
        if (this.props.searchText) {
            this.setState({ searchText: this.props.searchText });
        }
    }

    searchTextChange(e) {
        this.setState({ searchText: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.updateSearchStatus) {
            this.props.updateSearchStatus(this.state.searchText);
        }
        this.props.history.push("/search/" + this.state.searchText);
    }

    render() {
        return (
            <Row>
                <Col md={3}>
                    <img
                        className="img-responsive img-rounded"
                        src="/img/knowledge_graph1.png"
                        width="200px"
                        alt=""
                    />
                </Col>
                <Col md={9}>
                    <form role="search" onSubmit={this.handleSubmit}>
                        <div className="search-bar input-group">
                            <input
                                type="search"
                                autoComplete="off"
                                className="search-query form-control"
                                placeholder="Search for data ... e.g. water"
                                name="q"
                                value={this.state.searchText}
                                onChange={this.searchTextChange}
                            />
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-danger"
                                    type="submit"
                                    onClick={this.handleSubmit}
                                >
                                    <span className=" glyphicon glyphicon-search" />
                                </button>
                            </span>
                        </div>
                    </form>
                </Col>
            </Row>
        );
    }
}
