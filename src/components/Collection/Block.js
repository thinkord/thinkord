import React,{useContext} from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BlockTitle } from './Title'
// import storeAPI from '../../data/storeAPI';
import { StoreContext } from '../../context'

const useStyles = makeStyles((theme) => ({
    block: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        backgroundColor: 'white'
    }
}))
export default function Block({ block, index, collectionId}) {
    const classes = useStyles()
    const {deleteBlock} = useContext(StoreContext)
    const handleBlockChange = () =>{
        deleteBlock(collectionId,index)
    } 

    return (
        <div className={classes.block}>
            <BlockTitle
                title={block.title}
                collectionId={collectionId}
                index={index} />
            <Paper elevation={0}>{block.content}</Paper>
            <MoreHorizIcon onClick={handleBlockChange}/>
        </div>
    )
}
