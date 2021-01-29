/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React from "react";
import Collection from "../../../components/Collection/Collection";
import { BlockProvider } from "../../../context/blockContext";
// import { StoreUpdateContext } from "../context/homeContext";
import { withRouter } from "react-router-dom";

const Work = ({ match }) => {
    // const { saveCollection } = useContext(StoreUpdateContext);

    return (
        <div>
            <BlockProvider cId={match.params.id}>
                <Collection />
            </BlockProvider>
            {/* <button onClick={() => saveCollection()}>Save File</button> */}
        </div>
    );
};

export default withRouter(Work);
