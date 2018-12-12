import React from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

export default function signInRedirect(props) {
    const params = queryString.parse(window.location.search, {
        ignoreQueryPrefix: true
    });
    if (params.result === "success") {
        return <Redirect to={params.redirectTo || "/"} />;
    }
    return (
        <Redirect
            to={{
                pathname: "/signin",
                state: { signInError: params.errorMessage }
            }}
        />
    );
}