import React, { useContext } from "react";
import { Container } from "@material-ui/core";

import Block from "./Block/Block";
import InputContainer from "../Input/InputContainer";
import classes from "./Collections.module.scss";
import { BlockContext } from "../../context/blockContext";

export default function Overview() {
    const { collectionInfo } = useContext(BlockContext);
    return (
        <>
            <div className={classes.Content}>
                <Container className={classes.BlockContainer} maxWidth="md">
                    <>
                        {collectionInfo.blocks.map((block, index) => {
                            return (
                                <Block key={block.id} collectionId={collectionInfo.id} block={block} index={index} />
                            );
                        })}
                        <InputContainer collectionId={collectionInfo.id} type="block" />
                    </>
                </Container>
            </div>
        </>
    );
}
