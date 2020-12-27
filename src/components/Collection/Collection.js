/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Container } from "@material-ui/core";
import { CollectionTitle } from "./Title";
import Block from "./Block/Block";
import InputContainer from "../Elements/Input/InputContainer";
import classes from './Collections.module.scss';


export default function Collection({ collection }) {
    return (
        <>
            <div className={classes.Header}>
                <div className={classes.Info}>
                    <CollectionTitle title={collection.name} collectionId={collection.id} />
                    <i className={(collection.bookmarked ? "fas" : "far") + " fa-bookmark"}></i>
                </div>
                <div className={classes.Controls}>
                    <i id="clock" className="fas fa-clock"></i>
                    <i className="fas fa-ellipsis-h"></i>
                    <img className={classes.user} alt="user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU" />
                </div>
            </div>
            <div className={classes.Content}>
                <Container className={classes.BlockContainer} maxWidth="md">
                    {collection.blocks.map((block, index) => {
                        return <Block key={block.id} collectionId={collection.id} block={block} index={index} />;
                    })}

                    <InputContainer collectionId={collection.id} type="block" />
                </Container>
            </div>
        </>
    );
}
