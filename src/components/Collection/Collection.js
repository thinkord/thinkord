/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { CollectionTitle } from "./Title";
import { useHistory } from "react-router-dom";

import classes from "./Collections.module.scss";
import { BlockContext, BlockUpdateContext } from "../../context/blockContext";
import { withRouter } from "react-router-dom";
import EditorIcon from "@material-ui/icons/Subject";
import ListIcon from "@material-ui/icons/FormatListBulleted";
import Edit from "./Edit";
import Overview from "./Overview";
import appRuntime from "../../appRuntime";

function Collection(props) {
    const history = useHistory();
    const { collectionInfo } = useContext(BlockContext);
    const { updatePage } = useContext(BlockUpdateContext);
    const [editorView, setEditorView] = useState(false);

    useEffect(() => {
        appRuntime.subscribe("jump", (data) => {
            history.push(data);
        });
    });
    return (
        <>
            {collectionInfo !== undefined ? (
                <>
                    <div className={classes.Header}>
                        <div className={classes.Info}>
                            <CollectionTitle title={collectionInfo.name} collectionId={collectionInfo.id} />
                        </div>
                        <div className={classes.Controls}>
                            {editorView ? (
                                <ListIcon
                                    className={classes.EditorSwitch}
                                    onClick={() => {
                                        updatePage();
                                        setEditorView(!editorView);
                                    }}
                                />
                            ) : (
                                <EditorIcon
                                    className={classes.EditorSwitch}
                                    onClick={() => {
                                        setEditorView(!editorView);
                                    }}
                                />
                            )}
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    <div className={classes.Content}>
                        <Container className={classes.BlockContainer} maxWidth="md">
                            {editorView ? <Edit /> : <Overview />}
                        </Container>
                    </div>
                </>
            ) : (
                <h1>Loading</h1>
            )}
        </>
    );
}

export default withRouter(Collection);
