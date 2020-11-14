/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { StoreUpdateContext } from "../context";
import Collection from "../components/Collection/Collection";
import { Button } from "@material-ui/core";

const useStyle = makeStyles(() => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        background: "grey",
    },
}));
const Work = ({ match }) => {
    const { getCollection, saveCollection } = useContext(StoreUpdateContext);

    const classes = useStyle();
    const [collectionId] = useState(match.params.id);

    const collection = getCollection(collectionId);

    return (
        <div className={classes.root}>
            <Link className="App-link" to="/">
                Link to Home
            </Link>
            <Collection collection={collection} key={collectionId} />
            <Button onClick={() => saveCollection()}>Save File</Button>
        </div>
    );
};

export default Work;
