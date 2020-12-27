/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { StoreUpdateContext } from "../context";
import Collection from "../components/Collection/Collection";
import InsertToolBar from "../components/InsertToolBar/InsertToolBar";

const Work = ({ match }) => {
    const { getCollection, saveCollection } = useContext(StoreUpdateContext);
    const collection = getCollection(match.params.id);

    return (
        <div>
            <Collection collection={collection} key={match.params.id} />
            <button onClick={() => saveCollection()}>Save File</button>
            <InsertToolBar />
        </div>
    );
};

export default Work;
