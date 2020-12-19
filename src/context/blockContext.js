/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import appRuntime from "../appRuntime";
const BlockContext = React.createContext(null);
const BlockUpdateContext = React.createContext(null);

class BlockProvider extends Component {
    state = {
        changed: false,
    };
    componentDidMount() {
        appRuntime.send("home-channel", "getCollection", this.props.children.props.collection);
        appRuntime.subscribeOnce("loadData", (data) => {
            this.setState({
                collectionInfo: JSON.parse(data),
            });
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.children.props.collection !== this.props.children.props.collection) {
            this.setState({
                collectionInfo: this.props.children.props.collection,
            });
        }
        if (this.state.changed) {
            appRuntime.send("home-channel", "getCollection", this.props.children.props.collection);
            appRuntime.subscribeOnce("loadData", (data) => {
                this.setState({
                    collectionInfo: JSON.parse(data),
                });
                this.setState({ changed: false });
            });
        }
    }

    addBlock = (title, type, description, id) => {
        const newBlock = {
            title,
            type,
            description,
            id,
        };

        appRuntime.send("home-channel", "addBlock", newBlock);
        appRuntime.subscribeOnce("updateData");
        this.setState({ changed: true });
    };

    deleteBlock = (collectionId, blockId) => {
        const block = {
            collectionId,
            blockId,
        };

        appRuntime.send("home-channel", "deleteBlock", block);
        appRuntime.subscribeOnce("updateData");
        this.setState({ changed: true });
    };

    render() {
        return (
            <>
                <BlockContext.Provider value={{ ...this.state }}>
                    <BlockUpdateContext.Provider
                        value={{
                            addBlock: this.addBlock,
                            deleteBlock: this.deleteBlock,
                        }}
                    >
                        {this.props.children}
                    </BlockUpdateContext.Provider>
                </BlockContext.Provider>
            </>
        );
    }
}

export { BlockContext, BlockProvider, BlockUpdateContext };
