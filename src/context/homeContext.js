/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import appRuntime from "../appRuntime";
const StoreContext = React.createContext(null);
const StoreUpdateContext = React.createContext(null);

class StoreProvider extends Component {
    state = {
        data: {
            folders: [],
            folderIds: [],
            collections: [],
            recentUpdated: [],
        },
        changed: false,
    };

    // Load the user's content
    async componentDidMount() {
        const data = await appRuntime.invoke("home-channel", "getHomeData");
        const receiveData = {};
        receiveData.folders = JSON.parse(data.data);
        receiveData.orderCollections = JSON.parse(data.data2);
        this.loadData(receiveData);
    }

    async componentDidUpdate() {
        if (this.state.changed) {
            const data = await appRuntime.invoke("home-channel", "getHomeData", "");
            const receiveData = {};
            receiveData.folders = JSON.parse(data.data);
            receiveData.orderCollections = JSON.parse(data.data2);
            this.loadData(receiveData);
            this.setState({ changed: false });
        }
    }

    loadData = (unprocessedData) => {
        const initState = {
            folders: [],
            folderIds: [],
            collections: [],
            recentUpdated: [],
        };

        const { folders, orderCollections } = unprocessedData;
        folders.map((folder) => {
            initState.folderIds.push(folder.id);
            initState.folders.push(folder);
            folder.cs = [];
            return folder.collections.map((collection) => {
                folder["cs"].push(collection.id);
                initState.collections.push(collection);
                delete folder.collections;
                return folder;
            });
        });
        initState.recentUpdated = this.limitQueue(orderCollections);
        initState.collections = this.convertArrayToObject(initState.collections, "id");
        initState.folders = this.convertArrayToObject(initState.folders, "id");
        let data = initState;
        this.setState({ data });
    };

    /** Util */
    convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item,
            };
        }, initialValue);
    };

    limitQueue = (collections) => {
        let queue = [];
        // If limitedQueue size exceeds 4, limitedQueue should remove the first item;
        queue.push = function () {
            if (this.length >= 8) {
                this.shift();
            }
            return Array.prototype.push.apply(this, arguments);
        };
        collections.map((c) => {
            queue.push(c);
            return c;
        });
        return queue;
    };

    /** Operation */
    getFolder = (id) => {
        const { data } = this.state;
        return data.folders[id];
    };

    /**
     *
     * @param {string} id
     */
    getCollection = (id) => {
        const { data } = this.state;
        return data.collections[id];
    };

    getCollections = (collectionIds) => {
        const { data } = this.state;
        const collections = [];
        if (collectionIds) {
            collectionIds.forEach((collectionsId) => {
                collections.push(data.collections[collectionsId]);
            });
        }
        return collections;
    };

    /**
     *
     * @param {string} title
     */
    addCollection = async (title, id) => {
        // const { data } = this.state;
        const folderId = parseInt(id);
        const newCollection = {
            title,
            folderId,
        };

        appRuntime.invoke("home-channel", "addCollection", newCollection);
        this.setState({ changed: true });
    };

    /**
     *
     * @param {string} title
     * @param {number} collectionId
     */
    updateCollectionTitle = (title, collectionId) => {
        appRuntime.invoke("home-channel", "updateCollection", { title, collectionId });
        this.setState({ changed: true });
    };

    deleteCollection = (collectionId) => {
        appRuntime.invoke("home-channel", "deleteCollection", collectionId);
        this.setState({ changed: true });
    };

    /**
     *
     * @param {string} title
     * @param {number} collectionId
     * @param {number} index
     */
    updateBlockTitle = (title, collectionId, index) => {
        const { data } = this.state;
        const collection = data.collections[collectionId];
        const blocks = collection.blocks;
        const block = blocks[index];
        block.title = title;
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: {
                    ...collection,
                    blocks,
                },
            },
        };
        this.setState({
            data: newState,
        });
    };

    addFolder = async (folderName) => {
        // const { data } = this.state;
        const newFolder = {
            name: folderName,
            cs: [],
        };

        appRuntime.invoke("home-channel", "addFolder", newFolder);
        this.setState({ changed: true });
    };

    deletFolder = (folderId) => {
        const { data } = this.state;
        const newState = {
            collections: { ...data.collections },
            folderIds: [...data.folderIds],
            folders: { ...data.folders },
        };
        newState.folderIds.map((id, index) => {
            if (id === folderId) {
                newState.folderIds.splice(index, 1);
            }
            return newState;
        });
        Object.values(newState.folders).map((folder) => {
            if (folder.id === folderId) {
                delete newState.folders[folderId];
                folder.cs.map((collection) => {
                    delete newState.collections[collection];
                    return folder;
                });
            }
            return newState;
        });

        this.setState({
            data: newState,
        });
    };

    render() {
        return (
            <>
                {this.state ? (
                    <StoreContext.Provider
                        value={{
                            ...this.state,
                        }}
                    >
                        <StoreUpdateContext.Provider
                            value={{
                                updateBlockTitle: this.updateBlockTitle,
                                addFolder: this.addFolder,
                                getFolder: this.getFolder,
                                deleteFolder: this.deletFolder,
                                addCollection: this.addCollection,
                                getCollection: this.getCollection,
                                getCollections: this.getCollections,
                                updateCollectionTitle: this.updateCollectionTitle,
                                deleteCollection: this.deleteCollection,
                            }}
                        >
                            {this.props.children}
                        </StoreUpdateContext.Provider>
                    </StoreContext.Provider>
                ) : (
                        <h1>Loading</h1>
                    )}
            </>
        );
    }
}

export { StoreProvider, StoreUpdateContext, StoreContext };
