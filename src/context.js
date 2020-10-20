import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import appRuntime from './appRuntime'
const StoreContext = React.createContext(null)
const StoreUpdateContext = React.createContext(null)

/*
 * [Please notice]
 * update data without mutating state: "using spread operator"
 * if you don't follow this rule, TimLo will kill it!
 * if you don't know spread operator: check this out
 * https://codeburst.io/javascript-the-spread-operator-a867a71668ca
 */

class StoreProvider extends Component {

    // Load the user's content
    componentDidMount() {
        appRuntime.send('fileprocess', 'load', '')
        appRuntime.subscribe('loadComplete', (data) => {
            data = JSON.parse(data)
            this.setState({
                data
            })
        })

        /**Test Backend send whole data */
        appRuntime.send('homeprocess', 'getAllData', '')
        appRuntime.subscribe('loadData', (data) => {
            this.loadData(JSON.parse(data))
        })
    }

    loadData = (unprocessedData) => {
        const initState = {
            folders: [],
            folderIds: [],
            collections: [],
            collectionIds: []
        }
        unprocessedData.map((folder) => {
            initState.folderIds.push(folder.id)
            initState.folders.push(folder)
            folder.cs = []
            return folder.collections.map((collection) => {
                folder['cs'].push(collection.id)
                initState.collections.push(collection)
                delete folder.collections
                return initState.collectionIds.push(collection.id)
            })
        })
        initState.collections = this.convertArrayToObject(initState.collections, 'id')
        initState.folders = this.convertArrayToObject(initState.folders, 'id')

        let data = initState
        this.setState({
            data
        }, () => {
            console.log(this.state)
        })
    }

    /** Util */
    convertArrayToObject = (array, key) => {
        const initialValue = {}
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item,
            };
        }, initialValue);
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
        if (collectionIds) {
            collectionIds.forEach(collectionsId => {
                collections.push(data.collections[collectionsId])
            });
        }
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
        let folders = { ...data.folders }

        Object.values(folders).map((folder) => {

            if (folder.cs.includes(collectionId)) {
                let index = folder.cs.indexOf(collectionId)
                folder.cs.splice(index, 1)
            }
            return folders
        })


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


    addFolder = (folderName) => {
        const { data } = this.state
        const newFolderId = uuid()
        const newFolder = {
            id: newFolderId,
            name: folderName,
            blocks: []
        }

        const newState = {
            ...data,
            folderIds: [...data.folderIds, newFolderId],
            folders: {
                ...data.folders,
                [newFolderId]: newFolder
            }
        }
        this.setState({
            data: newState
        })

    }

    deleteFolder = () => {

    }

    render() {
        return (
            <>
                {this.state ?
                    <StoreContext.Provider value={{
                        ...this.state,
                        addBlock: this.addBlock,
                        deleteBlock: this.deleteBlock,
                        updateBlockTitle: this.updateBlockTitle,

                    }}>
                        <StoreUpdateContext.Provider value={{
                            addFolder: this.addFolder,
                            getFolder: this.getFolder,
                            addCollection: this.addCollection,
                            getCollection: this.getCollection,
                            getCollections: this.getCollections,
                            updateCollectionTitle: this.updateCollectionTitle,
                            deleteCollection: this.deleteCollection
                        }}>
                            {this.props.children}
                        </StoreUpdateContext.Provider>


                    </StoreContext.Provider> : "Loading"}

            </>
        )
    }
}

// const StoreConsumer = StoreContext.Consumer

export { StoreProvider, StoreUpdateContext, StoreContext }