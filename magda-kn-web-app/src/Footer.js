import React from "react";
import "./App.css";

const year = new Date().getFullYear();
const Footer = () => (
    <footer className="footer">
        <a href="http://www.csiro.au/en/About/Footer/Copyright">
            ©2017-{year} CSIRO
        </a>. | v.2.1.0-alpha. Connecting people with networks of knowledge |
        <a href="/terms">Terms &amp; Conditions</a> |
        <a href="https://research.csiro.au/oznome/contact/">Contact us</a> |
        <a href="http://www.csiro.au/en/About/Footer/Legal-notice">
            Disclaimer
        </a>
    </footer>
);
export default Footer;
