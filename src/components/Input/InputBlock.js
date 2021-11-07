/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { alpha, makeStyles } from "@material-ui/core";
import { StoreUpdateContext } from "../../context/homeContext";
import { BlockUpdateContext } from "../../context/blockContext";
import appRuntime from "../../appRuntime";

const useStyle = makeStyles((theme) => ({
    block: {
        paddingBottom: theme.spacing(4),
        margin: theme.spacing(0, 1, 1, 1),
    },
    input: {
        margin: theme.spacing(1),
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    },
    btnConfirm: {
        background: "#5AAC44",
        color: "#fff",
        "&:hover": {
            background: alpha("#5AAC44", 0.75),
        },
    },
}));

export default function InputBlock({ setOpen, collectionId, type }) {
    const classes = useStyle();
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const { addCollection } = useContext(StoreUpdateContext);
    const { addBlock } = useContext(BlockUpdateContext);
    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleBtnConfirm = () => {
        if (type === "block") {
            addBlock(title, "text", content, collectionId);
            setTitle("");
            setContent("");
            setOpen(false);
        } else {
            addCollection(title);
            setTitle("");
            setOpen(false);
            appRuntime.invoke("createFile", title);
        }
    };
    return (
        <div>
            <div>
                <Paper className={classes.block}>
                    <InputBase
                        onChange={handleOnChange}
                        fullWidth
                        value={title || ""}
                        inputProps={{ className: classes.input }}
                        placeholder={type === "block" ? "Enter block title.." : "Enter collection title.."}
                    />
                    {type === "block" ? (
                        <InputBase
                            onChange={handleContentChange}
                            multiline
                            fullWidth
                            inputProps={{ className: classes.input }}
                            value={content || ""}
                            placeholder="Enter the content"
                        />
                    ) : null}
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    {type === "block" ? "Add Block" : "+Add another collection"}
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    );
}
