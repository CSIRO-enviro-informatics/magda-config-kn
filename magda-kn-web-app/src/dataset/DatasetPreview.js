import React, { Component } from "react";
import DataPreviewVis from "./previewCSV/DataPreviewVis";
import DataPreviewMap from "./previewMap/DataPreviewMap";
import PropTypes from "prop-types";
import "./DatasetPreview.css";

export default class DatasetPreview extends Component {
    getDistributionForVis(distributions) {
        if (!distributions || distributions.length === 0) {
            return null;
        }
        return distributions.find(
            d =>
                d.linkStatusAvailable &&
                d.linkActive &&
                /(^|\W+)csv(\W+|$)/i.test(d.format)
        );
    }

    render() {
        const distributions = this.props.dataset.distributions;
        return (
            <div className="dataset-preview">
                <DataPreviewVis
                    dataset={this.props.dataset}
                    distribution={this.getDistributionForVis(distributions)}
                />
                <DataPreviewMap distributions={distributions} />
            </div>
        );
    }
}

DatasetPreview.propTypes = {
    dataset: PropTypes.object
};
