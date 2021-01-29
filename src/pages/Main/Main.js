import React from 'react'
import { HashRouter as Router, Route} from "react-router-dom";
import Layout from "../../components/Layouts/Layouts";
import Home from "./Home/Home";
import Work from "./Work/Work";

const Main = (props) => {
    return (
        <Layout>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/folder/:id" component={Home} />
                <Route path="/work/:id" component={Work} />
            </Router>
        </Layout>
    );
}

export default Main;