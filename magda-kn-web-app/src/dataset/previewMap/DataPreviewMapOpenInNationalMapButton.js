import React, { Component } from "react";
import PropTypes from "prop-types";
import browser from "browser-detect";
import API from "../../config";
import "./DataPreviewMapOpenInNationalMapButton.css";

const config = API;

class DataPreviewMapOpenInNationalMapButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onPopUpMessageReceived = this.onPopUpMessageReceived.bind(this);
        this.winRef = null;
        this.browser = browser();
    }

    componentDidMount() {
        if (this.browser.name === "ie" && this.browser.versionNumber < 12)
            return;
        window.addEventListener("message", this.onPopUpMessageReceived);
    }

    componentWillUnmount() {
        if (this.browser.name === "ie" && this.browser.versionNumber < 12)
            return;
        window.removeEventListener("message", this.onPopUpMessageReceived);
    }

    createCatalogItemFromDistribution(withoutBaseMap = false) {
        const catConfig = {
            initSources: [
                {
                    catalog: [
                        {
                            name: this.props.distribution.title,
                            type: "magda-item",
                            distributionId: this.props.distribution.identifier,
                            url: config.baseExternalUrl,
                            isEnabled: true,
                            zoomOnEnable: true
                        }
                    ]
                }
            ]
        };
        if (!withoutBaseMap) {
            //--- will not set baseMap if pass config by URL
            catConfig.initSources[0].baseMapName = "Positron (Light)";
        }
        return catConfig;
    }

    onButtonClick() {
        if (this.browser.name === "ie" && this.browser.versionNumber < 12) {
            window.open(
                "https://nationalmap.gov.au/#start=" +
                    encodeURIComponent(
                        JSON.stringify(
                            this.createCatalogItemFromDistribution(true)
                        )
                    ),
                "_blank"
            );
            return;
        }
        const newWinRef = window.open("https://nationalmap.gov.au", "_blank");
        if (!newWinRef) {
            this.winRef = null;
            alert(
                "Unable to open on National Map as it was blocked by a popup blocker. Please allow this site to open popups in your browser and try again."
            );
            return;
        }
        this.winRef = newWinRef;
    }

    onPopUpMessageReceived(e) {
        if (this.winRef !== e.source || e.data !== "ready") return;
        this.winRef.postMessage(this.createCatalogItemFromDistribution(), "*");
    }

    render() {
        return (
            <div style={this.props.style}>
                <button
                    className="open-in-national-map-button au-btn au-btn--secondary"
                    onClick={() => this.onButtonClick()}
                >
                    <div className="rectangle-2" />
                    <div className="rectangle-1" />
                    <div className="open-national-map-button-text">
                        {this.props.buttonText}
                    </div>
                </button>
            </div>
        );
    }
}

DataPreviewMapOpenInNationalMapButton.propTypes = {
    distribution: PropTypes.object.isRequired
};

DataPreviewMapOpenInNationalMapButton.defaultProps = {
    distribution: null
};

export default DataPreviewMapOpenInNationalMapButton;
