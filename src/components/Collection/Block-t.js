/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BlockTitle } from "./Title";
import { BlockUpdateContext } from "../../context/blockContext";

const useStyles = makeStyles((theme) => ({
    block: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        backgroundColor: "white",
    },
}));

export default function Block({ block, index, collectionId }) {
    const classes = useStyles();
    const { deleteBlock } = useContext(BlockUpdateContext);

    const handleBlockChange = () => {
        deleteBlock(collectionId, block.id);
    };

    const typeRender = () => {
        let content;
        if (block.type === "text") {
            content = <Paper elevation={0}>{block.description}</Paper>;
        } else if (block.type === "image") {
            content = (
                <img
                    src={`C:\\Users\\User\\AppData\\Roaming\\thinkord\\blob_storage\\${block.title}`}
                    width="400"
                    height="300"
                    alt={block.title}
                />
            );
        }
        return content;
    };
    return (
        <div className={classes.block}>
            <BlockTitle title={block.title} collectionId={collectionId} index={index} />
            {typeRender()}
            <MoreHorizIcon onClick={handleBlockChange} />
        </div>
    );
}
