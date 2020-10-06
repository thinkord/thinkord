import React, { useState } from 'react'
import { Collapse, Paper, Typography } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import InputBlock from './InputBlock'

const useStyle = makeStyles((theme) => ({
    root: {
        width: '350px',
        marginTop: theme.spacing(1)
    },
    addBlock: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: "#EBECF0",
        "&:hover": {
            backgroundColor: fade('#000', 0.25)
        }
    }
}))

export default function InputContainer({ collectionId, type }) {
    const classes = useStyle()
    const [open, setOpen] = useState(false)
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputBlock
                    setOpen={setOpen}
                    collectionId={collectionId}
                    type={type} />
            </Collapse>
            <Collapse in={!open}>
                <Paper
                    className={classes.addBlock}
                    elevation={0}
                    onClick={() => setOpen(!open)}>
                    <Typography>
                        {type === 'block' ? "Add Block" : "+Add another collection"}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}
