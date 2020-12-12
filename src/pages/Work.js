/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { StoreUpdateContext } from "../context/homeContext";
import Collection from "../components/Collection/Collection";
import { Link } from "react-router-dom";
import appRuntime from "../appRuntime";
import { BlockProvider } from "../context/blockContext";

const Work = ({ match }) => {
    const { getCollection } = useContext(StoreUpdateContext);

    const collection = getCollection(match.params.id);

    return (
        <>
            {collection !== null ? (
                <div>
                    <Link
                        className="App-link"
                        to="/"
                        onClick={() => {
                            appRuntime.send("window-channel", "close");
                        }}
                    >
                        Link to Home
                    </Link>

                    <BlockProvider>
                        <Collection collection={collection} key={match.params.id} />
                    </BlockProvider>
                </div>
            ) : (
                <h1>There is no collection</h1>
            )}
        </>
    );
};

export default Work;
