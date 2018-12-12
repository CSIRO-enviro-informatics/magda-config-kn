import React, { Component } from "react";

import "./DataSet.css";

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pageOffset: 0, defaultPages: 10, currentPage: 0 };
        this.handlePageOffsetBack = this.handlePageOffsetBack.bind(this);
        this.handlePageOffsetForward = this.handlePageOffsetForward.bind(this);
    }

    //Backward slide navigation buttons
    handlePageOffsetBack() {
        var temp =
            this.state.pageOffset -
            this.props.perPage * this.state.defaultPages;
        this.setState({ pageOffset: temp });
    }
    //Forward slide navigation buttons
    handlePageOffsetForward() {
        var temp =
            this.state.pageOffset +
            this.props.perPage * this.state.defaultPages;
        this.setState({ pageOffset: temp });
    }
    //Navigation buttion click and retrieve new data
    handlePageNavClick(datasetIndex) {
        this.setState({ currentPage: datasetIndex / this.props.perPage });
        this.props.updateCurrentPage(datasetIndex / this.props.perPage);
    }

    render() {
        // console.log(this.props, this.state)
        if (this.props.total > this.props.perPage) {
            return (
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {this.state.pageOffset > 0 ? (
                            <li onClick={this.handlePageOffsetBack}>
                                <a>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                        ) : (
                            <li className="disabled">
                                <a aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                        )}
                        {Array(this.props.total)
                            .fill()
                            .map((_, i) => {
                                // Display two button for navigation by default
                                if (
                                    i >= this.state.pageOffset &&
                                    i <=
                                        this.state.pageOffset +
                                            this.props.perPage *
                                                this.state.defaultPages &&
                                    i % this.props.perPage === 0
                                ) {
                                    if (
                                        i / this.props.perPage ===
                                        this.state.currentPage
                                    )
                                        return (
                                            <li className="active" key={i}>
                                                {" "}
                                                <a>
                                                    {i / this.props.perPage + 1}{" "}
                                                </a>
                                            </li>
                                        );
                                    else
                                        return (
                                            <li
                                                onClick={() =>
                                                    this.handlePageNavClick(i)
                                                }
                                                key={i}
                                            >
                                                {" "}
                                                <a>
                                                    {i / this.props.perPage + 1}{" "}
                                                </a>
                                            </li>
                                        );
                                } else return "";
                            })}
                        {this.state.pageOffset +
                            this.props.perPage * this.state.defaultPages <
                        this.props.total ? (
                            <li onClick={this.handlePageOffsetForward}>
                                <a>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        ) : (
                            <li className="disabled">
                                <a>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
            );
        } else {
            return <nav />;
        }
    }
}
