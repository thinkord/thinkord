/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import appRuntime from "../appRuntime";

const ControlContext = React.createContext({
    mapCId: "",
});

class ControlProvider extends Component {
    async componentDidMount() {
        const data = await appRuntime.invoke("home-channel", "getCID");
        this.setState({
            mapCId: data,
        });
    }

    render() {
        return <ControlContext.Provider value={{ ...this.state }}>{this.props.children}</ControlContext.Provider>;
    }
}

export { ControlContext, ControlProvider };
