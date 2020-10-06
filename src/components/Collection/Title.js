import React from 'react'
import withTitle from './withTitle'

function Title() {
    return (
        <div></div>
    )
} 

const CollectionTitle = withTitle(Title, "updateCollectionTitle")
const BlockTitle = withTitle(Title, "updateBlockTitle")

export { CollectionTitle, BlockTitle }

