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
        appRuntime.subscribe("capture", (data) => {
            this.setState({ changed: true });
        });
        this.loadingData();
    }
    componentDidUpdate(prevState) {
        /** When changing tab, the content of the blocks change */
        if (prevState.cId !== this.props.cId) {
            this.loadingData();
        }
        if (this.state.changed) {
            this.loadingData();
            this.setState({ changed: false });
        }
    }

    updatePage = () => {
        this.setState({ changed: !this.state.changed });
    };

    loadingData = async () => {
        const data = await appRuntime.invoke("home-channel", "getBlocks", { id: this.props.cId });
        this.setState({
            collectionInfo: JSON.parse(data),
        });
    };

    addBlock = (title, type, description, id) => {
        const newBlock = {
            title,
            type,
            description,
            id,
        };
        appRuntime.invoke("home-channel", "addBlock", newBlock);
        this.setState({ changed: true });
    };

    updateBlock = (blocks, index) => {
        // console.log("Editor blocks: ", blocks.data.text);
        // console.log("maping index: ", index)
        // console.log("Collection Info: ", this.state.collectionInfo.blocks);
        const changedBlock = {
            title: "",
            type: "text",
            description: blocks.data.text,
            id: this.state.collectionInfo.id,
        };
        if (index > this.state.collectionInfo.blocks.length - 1) {
            // Add the new block
            appRuntime.invoke("home-channel", "addBlock", changedBlock);
            // this.setState({ changed: true });
        } else {
            // Update the new block
        }
    };

    deleteBlock = (collectionId, blockId) => {
        const block = {
            collectionId,
            blockId,
        };

        appRuntime.invoke("home-channel", "deleteBlock", block);
        this.setState({ changed: true });
    };

    render() {
        return (
            <>
                <BlockContext.Provider value={{ ...this.state }}>
                    <BlockUpdateContext.Provider
                        value={{
                            getBlocks: this.getBlocks,
                            addBlock: this.addBlock,
                            deleteBlock: this.deleteBlock,
                            updateBlock: this.updateBlock,
                            updatePage: this.updatePage,
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
