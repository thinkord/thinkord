/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Typography } from "@material-ui/core";
import { StoreContext } from "../../context/homeContext";

/**
 * If you don't know hoc, check this out:
 * https://zh-hant.reactjs.org/docs/higher-order-components.html
 */

const useStyles = makeStyles(() => ({
    editableTitle: {
        flexGrow: 1,
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
    editableTitleContainer: {
        display: "flex",
    },
    input: {
        "&:focus": {
            background: "#ddd",
        },
    },
}));
export default function withTitle(WrappedComponent, update) {
    return function (props) {
        const classes = useStyles();
        const [open, setOpen] = useState(false);
        const [newTitle, setNewTitle] = useState("");
        const { title, collectionId, index } = props;
        const context = useContext(StoreContext);
        const handleOnChange = (e) => {
            setNewTitle(e.target.value);
        };

        const handleOnBlur = () => {
            context[update](newTitle, collectionId, index);
            setOpen(false);
        };

        return (
            <div>
                {open ? (
                    <div>
                        <InputBase
                            onChange={handleOnChange}
                            value={newTitle}
                            inputProps={{ className: classes.input }}
                            fullWidth
                            onBlur={handleOnBlur}
                            placeholder="Please fill the title"
                        />
                    </div>
                ) : (
                    <div className={classes.editableTitleContainer}>
                        <Typography onClick={() => setOpen(!open)} className={classes.editableTitle}>
                            {title}
                        </Typography>
                    </div>
                )}
                <WrappedComponent {...props} />
            </div>
        );
    };
}
