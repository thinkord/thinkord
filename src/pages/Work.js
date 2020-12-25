/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { StoreUpdateContext } from "../context";
import Collection from "../components/Collection/Collection";
import InsertToolBar from "../components/InsertToolBar/InsertToolBar";
import { Button } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import appRuntime from "../appRuntime";

const Work = ({ match }) => {
    const { getCollection, saveCollection } = useContext(StoreUpdateContext);

    // const classes = useStyle();
    const collection = getCollection(match.params.id);

    return (
        <>
            {collection !== null ? (
                <div>
                    {/* <Link
                        className="App-link"
                        to="/"
                        onClick={() => {
                            appRuntime.send("windprocess", "close");
                        }}
                    >
                        Link to Home
                    </Link> */}

                    <Collection collection={collection} key={match.params.id} />
                    <Button onClick={() => saveCollection()}>Save File</Button>
                    <InsertToolBar/>
                </div>
            ) : (
                <h1>There is no collection</h1>
            )}
        </>
    );
};

export default Work;
