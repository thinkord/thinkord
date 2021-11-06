import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { StoreProvider } from "./context/homeContext";
import TabsProvider from "./context/tabContext";
import { ControlProvider } from "./context/controlContext";
import Main from "./pages/Main/Main";
import ControlBar from "./pages/ControlBar/ControlBar";

ReactDOM.render(
    <Router>
        <StoreProvider>
            <Switch>
                <Route
                    path="/controlbar"
                    render={() => (
                        <ControlProvider>
                            <ControlBar />
                        </ControlProvider>
                    )}
                />
                <Route
                    path="/"
                    render={() => (
                        <TabsProvider>
                            <Main />
                        </TabsProvider>
                    )}
                />
            </Switch>
        </StoreProvider>
    </Router>,
    document.getElementById("root")
);
