/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { Icon } from "@material-ui/core";
import TextIcon from '@material-ui/icons/TextFields';
import AudioIcon from '@material-ui/icons/VolumeUp';
import ImageIcon from '@material-ui/icons/Image';
import VideoIcon from '@material-ui/icons/Movie';
import { BlockTitle } from "../Title";
import { BlockUpdateContext } from "../../../context/blockContext";
import classes from "./Block.module.scss";

export default function Block({ block, index, collectionId }) {
    const { deleteBlock } = useContext(BlockUpdateContext);

    const handleBlockChange = () => {
        deleteBlock(collectionId, block.id);
    };

    let typeIcon = null;

    switch(block.type){
        case "audio":
            typeIcon = <AudioIcon className={classes.TypeIcon}/>;
            break;
        case "image":
            typeIcon = <ImageIcon className={classes.TypeIcon}/>;
            break;
        case "video":
            typeIcon = <VideoIcon className={classes.TypeIcon}/>;
            break;
        default:
            typeIcon = <TextIcon className={classes.TypeIcon}/>;
            break;
    }

    return (
        <div className={classes.Block}>
            <div className={classes.BlockMain}>
                {typeIcon}
                <div className={classes.BlockContent}>
                    <BlockTitle title={block.title} collectionId={collectionId} index={index} />
                    <div>{block.description}</div>
                    <div className={classes.BlockTime}>
                        <Icon className={classes.Icon + " fas fa-clock"}></Icon>
                        {block.updatedAt}
                    </div>
                </div>
            </div>
            <div className={classes.BlockControls}>
                <Icon onClick={handleBlockChange} className={classes.DelIcon + " fas fa-times"} />
            </div>
        </div>
    );
}
