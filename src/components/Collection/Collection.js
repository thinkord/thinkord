/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { CollectionTitle } from "./Title";
import Block from "./Block";
import InputContainer from "../Input/InputContainer";
import { BlockContext } from "../../context/blockContext";

export default function Collection({ collection }) {
    const { collectionInfo } = useContext(BlockContext);
    return (
        <>
            {collectionInfo !== undefined ? (
                <div>
                    <Paper>
                        <CssBaseline />
                        <CollectionTitle title={collectionInfo.name} collectionId={collectionInfo.id} />
                        <div>
                            {collectionInfo.blocks.map((block, index) => {
                                return (
                                    <Block
                                        key={block.id}
                                        collectionId={collectionInfo.id}
                                        block={block}
                                        index={index}
                                    />
                                );
                            })}
                        </div>

                        <InputContainer collectionId={collectionInfo.id} type="block" />
                    </Paper>
                </div>
            ) : (
                <h1>Loading</h1>
            )}
        </>
    );
}
