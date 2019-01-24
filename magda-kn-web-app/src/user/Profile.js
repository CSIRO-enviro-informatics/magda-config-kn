import React, { Component } from "react";
import { Row, Col, Table, Image } from "react-bootstrap";
import API from "../config";
import "./User.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { user: "" };
    }

    componentDidMount() {
        fetch(API.authApiUrl + "users/whoami", { credentials: "include" })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error(
                        `Failed to request whoami API, status code: ${
                            res.status
                        }`
                    );
                }
            })
            .then(json => {
                if (json) {
                    if (json.isError) {
                        console.log("User is unauthorized");
                        console.log(json);
                        return;
                    } else {
                        this.setState({ user: json });
                    }
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        console.log(this.state.user);
        if (this.state.user === "") return <p />;
        if (this.state.user === undefined) return <p />;

        return (
            <div className="padding-top">
                <Row>
                    <h2>USER PROFILE </h2>
                    <Col xs={6}>
                        <div className="profile">
                            {this.state.user.photoURL === "none-photoURL" ? (
                                <Image src="/img/default-user.png" circle />
                            ) : (
                                <Image src={this.state.user.photoURL} circle />
                            )}
                        </div>
                        <div className="detail">
                            <Table striped condensed hover>
                                <tbody>
                                    <tr>
                                        <td>User Name:</td>
                                        <td>{this.state.user.displayName}</td>
                                    </tr>

                                    <tr>
                                        <td>Email:</td>
                                        <td>{this.state.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Auth Source:</td>
                                        <td>{this.state.user.source}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <h4>
                            <span className="glyphicon glyphicon-link" /> My
                            Bookmark
                        </h4>
                        <h4>
                            <span className="glyphicon glyphicon-link" /> My
                            Favorite{" "}
                        </h4>
                        <h4>
                            <span className="glyphicon glyphicon-link" /> My
                            Searched{" "}
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <h4>
                        <span className="glyphicon glyphicon-link" /> API TOKENS{" "}
                    </h4>
                    <button className="btn btn-primary"> Generate </button>
                </Row>
            </div>
        );
    }
}
