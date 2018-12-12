import React, {Component} from 'react'

import './User.css'

export default class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pub_id: '',
            name: '',
            datasetNum: 0
        }
    }
    render() {
        const baseRedirectUrl = `${window.location.protocol}//${window.location.host}`;
        // console.log(this.props)
        return (
            <div className="row padding-top">
                <div className="col-md-6 col-md-offset-3">
                    <div className="at-form">
                        <div className="at-title">
                            <h3>Sign In</h3>
                        </div>
                        {this.props.location.state && (
                            <div className="col-md-6 col-md-offset-3">
                                <div className="alert alert-danger">
                                    <strong>Sign In Failed!</strong> {this.props.location.state.signInError}
                                </div>
                            </div>
                        )}
                        <div className="at-oauth">
                            <a href={"/auth/login/aaf?redirect=" + encodeURIComponent(baseRedirectUrl+'/sign-in-redirect?redirectTo=/')}>
                            <button className="btn at-social-btn" id="at-aaf" name="aaf">
                                <i className="fa-aaf"></i>
                                Sign In with AAF
                            </button>
                            </a>

                        </div>
                        <div className="at-oauth">
                            <a href={ "/auth/login/google?redirect=" + encodeURIComponent(baseRedirectUrl+'/sign-in-redirect?redirectTo=/')}>
                            <button className="btn at-social-btn" id="at-google" name="google">
                                <i className="fa fa-google"></i>
                                Sign In with Google
                            </button>
                            </a>

                        </div>
                        {/* <div className="at-oauth">
                            <a href={"/auth/login/facebook?redirect=" + encodeURIComponent(baseRedirectUrl+'/sign-in-redirect?redirectTo=/')}>
                            <button className="btn at-social-btn" id="at-facebook" name="facebook">
                                <i className="fa fa-facebook"></i>
                                Sign In with Facebook
                            </button>
                            </a>

                        </div> */}
                        <br/>
                        <div className="at-sep">
                       
                            <strong>OR</strong>
                        </div>
<div className="disable">
                        <div className="at-pwd-form ">
                            <form role="form" id="at-pwd-form" noValidate="" action="#" method="POST">
                                <fieldset>

                                    <div className="at-input form-group has-feedback">
                                        <label className="control-label" htmlFor="at-field-email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="at-field-email"
                                            name="at-field-email"
                                            placeholder="Email"
                                            autoCapitalize="none"
                                            autoCorrect="off" />

                                            <span className="help-block hide"></span>
                                        </div>

                                        <div className="at-input form-group has-feedback">
                                            <label className="control-label" htmlFor="at-field-password">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="at-field-password"
                                                name="at-field-password"
                                                placeholder="Password"
                                                autoCapitalize="none"
                                                autoCorrect="off" />

                                                <span className="help-block hide"></span>
                                            </div>

                                            <button
                                                type="submit"
                                                className="at-btn submit btn btn-lg btn-block btn-default"
                                                id="at-btn">
                                                Sign In
                                            </button>
                                        </fieldset>
                                    </form>
                                </div>

                                <div className="at-signup-link">
                                    <p>
                                        Don't have an account?
                                        <a href="/sign-up" id="at-signUp" className="at-link at-signup">Register</a>

                                    </p>
                                </div> 
</div>
                                <div className="alert alert-info">
                                    <p>
                                        Knowledge network local register and sign in will be provided later
                                        {/* <a href="/sign-up" id="at-signUp" className="at-link at-signup">Register</a> */}

                                    </p>
                                </div> 

                            </div>

                        </div>
                    </div>

        )}
    }