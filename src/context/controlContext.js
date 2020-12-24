/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import appRuntime from "../appRuntime";

const ControlContext = React.createContext({
    mapCId: "",
});

class ControlProvider extends Component {
    componentDidMount() {
        appRuntime.send("home-channel", "getCID");
        appRuntime.subscribe("getCID", (data) => {
            this.setState({
                mapCId: data,
            });
        });
    }

    render() {
        return <ControlContext.Provider value={{ ...this.state }}>{this.props.children}</ControlContext.Provider>;
    }
}

export { ControlContext, ControlProvider };
