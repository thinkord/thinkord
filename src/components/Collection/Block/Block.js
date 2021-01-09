/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { Icon } from "@material-ui/core";
//import { BlockTitle } from "../Title";
import { BlockUpdateContext } from "../../../context/blockContext";
import classes from "./Block.module.scss";

export default function Block({ block, index, collectionId }) {
    const { deleteBlock } = useContext(BlockUpdateContext);

    const handleBlockChange = () => {
        deleteBlock(collectionId, block.id);
    };
    return (
        <div className={classes.Block}>
            <div className={classes.BlockMain}>
                <Icon className={classes.Icon + " fas fa-quote-right"} />
                <div className={classes.BlockContent}>
                    {/* <BlockTitle title={block.title} collectionId={collectionId} index={index} /> */}
                    <div>{block.title}</div>
                    <div>{block.description}</div>
                    <div className={classes.BlockTime}>
                        <Icon className={classes.Icon + " fas fa-clock"}></Icon>
                        {block.updatedAt}
                    </div>
                </div>
            </div>
            <div className={block.BlockControls}>
                <Icon onClick={handleBlockChange} className="fas fa-ellipsis-h" />
            </div>
        </div>
    );
}
