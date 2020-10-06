import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import appRuntime from './appRuntime'
const StoreContext = React.createContext(null)


/*
 * [Please notice]
 * update data without mutating state: "using spread operator"
 * if you don't follow this rule, TimLo will kill it!
 * if you don't know spread operator: check this out
 * https://codeburst.io/javascript-the-spread-operator-a867a71668ca
 */

class StoreProvider extends Component {
    // state = {
    //     data: {
    //         collections: {
    //             'new-1': {
    //                 id: 'new-1',
    //                 title: 'create your note',
    //                 blocks: [
    //                     {
    //                         id: 'block-1',
    //                         title: 'create block',
    //                         content: 'please enter some content'
    //                     }
    //                 ]
    //             }
    //         },
    //         folders: {
    //             'folder-1': {
    //                 id: "folder-1",
    //                 name: "f-1",
    //                 collections: [
    //                     "collection-1",
    //                     "collection-2"
    //                 ]
    //             }
    //         },
    //         collectionIds: ['new-1'],
    //         folderIds: ['folder-1']
    //     }
    // }

    // Load the user's content
    componentDidMount() {
        appRuntime.send('fileprocess', 'load', '')
        appRuntime.subscribe('loadComplete', (data) => {
            data = JSON.parse(data)
            this.setState({
                data
            })
        })
    }

    getFolder = (id) => {
        const { data } = this.state
        return data.folders[id]
    }

    /**
     * 
     * @param {string} id 
     */
    getCollection = (id) => {
        const { data } = this.state
        return data.collections[id];
    }

    getCollections = (collectionIds) => {
        const { data } = this.state
        const collections = []
        collectionIds.forEach(collectionsId => {
            collections.push(data.collections[collectionsId])
        });
        return collections
    }

    /**
     * 
     * @param {string} title 
     * @param {string} content 
     * @param {number} collectionId 
     */
    addBlock = (title, content, collectionId) => {
        const { data } = this.state
        const newBlockId = uuid()
        const newBlock = {
            id: newBlockId,
            title,
            content
        }
        const collection = data.collections[collectionId]
        collection.blocks = [...collection.blocks, newBlock]
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }
        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {string} title 
     */
    addCollection = (title) => {
        const { data } = this.state
        const newCollectionId = uuid()
        const newCollection = {
            id: newCollectionId,
            title,
            blocks: []
        }

        const newState = {
            collectionIds: [...data.collectionIds, newCollectionId],
            collections: {
                ...data.collections,
                [newCollectionId]: newCollection
            }
        }

        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {number} collectionId 
     * @param {number} index 
     */
    deleteBlock = (collectionId, index) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        collection.blocks = [...collection.blocks.slice(0, index), ...collection.blocks.slice(index + 1)]
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }
        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {string} title
     * @param {number} collectionId 
     */
    updateCollectionTitle = (title, collectionId) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        collection.title = title
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }

        this.setState({
            data: newState
        })
    }


    deleteCollection = (collectionId) => {

        const { data } = this.state
        let collections = { ...data.collections }
        let collectionIds = [...data.collectionIds]

        Object.keys(collections).map((cId) => {
            if (cId === collectionId) {
                delete collections[collectionId]
            }
            return collections
        })
        collectionIds.map((cId, index) => {
            if (cId === collectionId) {
                collectionIds.splice(index, 1)
            }
            return collectionIds
        })
        const newState = { ...data, collections, collectionIds }
        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {string} title 
     * @param {number} collectionId 
     * @param {number} index 
     */
    updateBlockTitle = (title, collectionId, index) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        const blocks = collection.blocks
        const block = blocks[index]
        block.title = title
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: {
                    ...collection,
                    blocks
                }
            }
        }
        this.setState({
            data: newState
        })
    }


    addFolder() {

    }

    deleteFolder() {

    }

    render() {
        return (
            <>
                {this.state ? <StoreContext.Provider value={{
                    ...this.state,
                    addBlock: this.addBlock,
                    deleteBlock: this.deleteBlock,
                    updateCollectionTitle: this.updateCollectionTitle,
                    updateBlockTitle: this.updateBlockTitle,
                    addCollection: this.addCollection,
                    getCollection: this.getCollection,
                    getCollections: this.getCollections,
                    deleteCollection: this.deleteCollection,
                    getFolder: this.getFolder
                }}>

                    {this.props.children}
                </StoreContext.Provider> : "Loading"}

            </>
        )
    }
}

const StoreConsumer = StoreContext.Consumer

export { StoreProvider, StoreConsumer, StoreContext }