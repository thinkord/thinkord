/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { StoreUpdateContext } from "../context";
import Collection from "../components/Collection/Collection";
import InsertToolBar from "../components/InsertToolBar/InsertToolBar";

const Work = ({ match }) => {
    const { getCollection, saveCollection } = useContext(StoreUpdateContext);

    //const [collectionId] = useState(match.params.id);

    // const collection = getCollection(collectionId);
    const collection = getCollection(match.params.id);

    return (
        <div>
            {/* <Link className="App-link" to="/">
                Link to Home
            </Link>
            <Collection collection={collection} key={collectionId} /> */}
            <Collection collection={collection} key={match.params.id} />
            <button onClick={() => saveCollection()}>Save File</button>
            <InsertToolBar/>
        </div>
    );
};

export default Work;
