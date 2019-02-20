import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar";
import NavMainContent from "./NavMainContent";
import Footer from "./Footer";

import { Helmet } from "react-helmet";

const App = props => {
    return (
        <div className="">
            <Helmet>
                <title>CSIRO Knowledge Network</title>
                <meta
                    name="description"
                    content="The CSIRO Knowledge Network platform helps people to discover
           and access relevant data from Research, Scientific and Government data and research data repositories in the Australian 
           data ecosystem. The Knowledge Network platform, which is based on the MAGDA codebase, is being developed with an API-first emphasis 
           ensuring that relevant dataset search results are available directly via the Knowledge Network portal,
          as well as tailored search results through partner analytics platforms."
                />
                <meta name="author" content="CSIRO" />
                <link rel="author" href="https://www.csiro.au/" />
            </Helmet>
            <NavBar />
            <NavMainContent />
            <Footer />
        </div>
    );
};

export default App;
