import React from 'react'
import { Paper, CssBaseline } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import {CollectionTitle} from './Title'
import Block from './Block';
import InputContainer from '../Input/InputContainer';

const useStyle = makeStyles((theme) => ({
    root: {
        
        width: '500px',
        backgroundColor: '#EBECF0',
        margin: theme.spacing(1),
        padding: theme.spacing(0, 0, 1, 0)
    },
    blockContainer: {
        marginTop: theme.spacing(4)
    }
}))


export default function Collection({collection}) {
    const classes = useStyle()
    console.log(collection)
    return (
        <div>
             <Paper className={classes.root}>
                <CssBaseline />
                <CollectionTitle title={collection.title} collectionId={collection.id}/>
                <div className={classes.blockContainer}>
                    {collection.blocks.map((block, index) => {
                        return <Block key={block.id} collectionId={collection.id} block={block} index={index} />
                    })}
                </div>
                
                <InputContainer collectionId={collection.id} type="block"/>
            
            </Paper>

        </div>
    )
}
