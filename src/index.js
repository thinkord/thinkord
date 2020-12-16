import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import { StoreProvider } from "./context";
import TabsProvider from "./tabContext";
import Layout from "./components/Layouts/Layouts";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ControlBar from "./pages/ControlBar";

ReactDOM.render(
    <Router>
        <TabsProvider>
            <StoreProvider>
                <Layout>
                    <Route path="/controlbar" component={ControlBar} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/folder/:id" component={Home} />
                    <Route path="/work/:id" component={Work} />
                </Layout>
            </StoreProvider>
        </TabsProvider>
    </Router>,
    document.getElementById("root")
);
