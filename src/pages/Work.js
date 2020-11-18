/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StoreUpdateContext } from "../context";
import Collection from "../components/Collection/Collection";
import { Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        //background: "grey",
    },
}));
const Work = ({ match }) => {
    const { getCollection, saveCollection } = useContext(StoreUpdateContext);

    const classes = useStyle();
    //const [collectionId] = useState(match.params.id);

    // const collection = getCollection(collectionId);
    const collection = getCollection(match.params.id);

    return (
        <div className={classes.root}>
            {/* <Link className="App-link" to="/">
                Link to Home
            </Link>
            <Collection collection={collection} key={collectionId} /> */}
            <Collection collection={collection} key={match.params.id} />
            <Button onClick={() => saveCollection()}>Save File</Button>
        </div>
    );
};

export default Work;
