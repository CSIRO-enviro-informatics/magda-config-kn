import React, { Component } from "react";
import {
    Nav,
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
    Image
} from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import Signout from "./user/Signout";
import API from "./config";
import "./NavBar.css";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
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

    resetUser = () => {
        this.setState({ user: "" });
    };

    render() {
        // console.log(this.state.user);
        return (
            <Navbar collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            {" "}
                            <img
                                alt="Knowledge Network"
                                src="/img/kn-logo.png"
                            />{" "}
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <IndexLinkContainer to="/">
                            <NavItem exact="true" eventKey={1}>
                                Home
                            </NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/about">
                            <NavItem eventKey={2}>About</NavItem>
                        </LinkContainer>

                        <NavDropdown title="Browse" id="browse-dropdown">
                            <LinkContainer to="/dataset">
                                <MenuItem>Dataset</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/datasource">
                                <MenuItem>Data Source</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/publisher">
                                <MenuItem>Publisher</MenuItem>
                            </LinkContainer>
                        </NavDropdown>
                        {this.state.user.id === "" ? (
                            <LinkContainer to="/signin">
                                <NavItem>Sign In</NavItem>
                            </LinkContainer>
                        ) : (
                            <NavDropdown
                                title={
                                    this.state.user.photoURL ===
                                    "none-photoURL" ? (
                                        <Image
                                            src="/img/default-user.png"
                                            circle
                                        />
                                    ) : (
                                        <Image
                                            src={this.state.user.photoURL}
                                            circle
                                        />
                                    )
                                }
                                id="profile-dropdown"
                                noCaret
                            >
                                <LinkContainer to="/profile">
                                    <MenuItem>Profile</MenuItem>
                                </LinkContainer>
                                <MenuItem divider />
                                <Signout resetUser={this.resetUser} />
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
