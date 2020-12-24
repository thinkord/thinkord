/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { CollectionTitle } from "./Title";
import Block from "./Block/Block";
import InputContainer from "../Elements/Input/InputContainer";
import classes from "./Collections.module.scss";
import { BlockContext } from "../../context/blockContext";

export default function Collection() {
    const { collectionInfo } = useContext(BlockContext);
    return (
        <>
            {collectionInfo !== undefined ? (
                <>
                    <div className={classes.Header}>
                        <div className={classes.Info}>
                            <CollectionTitle title={collectionInfo.name} collectionId={collectionInfo.id} />
                            <i className={(collectionInfo.bookmarked ? "fas" : "far") + " fa-bookmark"}></i>
                        </div>
                        <div className={classes.Controls}>
                            <i id="clock" className="fas fa-clock"></i>
                            <i className="fas fa-ellipsis-h"></i>
                            <img
                                className={classes.user}
                                alt="user"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU"
                            />
                        </div>
                    </div>
                    <div className={classes.Content}>
                        <Container className={classes.BlockContainer} maxWidth="md">
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

                            <InputContainer collectionId={collectionInfo.id} type="block" />
                        </Container>
                    </div>
                </>
            ) : (
                <h1>Loading</h1>
            )}
        </>
    );
}

// import React, { useContext } from "react";
// import { Paper, CssBaseline } from "@material-ui/core";
// import { CollectionTitle } from "./Title";
// import Block from "./Block";
// import InputContainer from "../Input/InputContainer";
// import { BlockContext } from "../../context/blockContext";

// export default function Collection({ collection }) {
//     const { collectionInfo } = useContext(BlockContext);
//     return (
//         <>
//             {collectionInfo !== undefined ? (
//                 <div>
//                     <Paper>
//                         <CssBaseline />
//                         <CollectionTitle title={collectionInfo.name} collectionId={collectionInfo.id} />
//                         <div>
//                             {collectionInfo.blocks.map((block, index) => {
//                                 return (
//                                     <Block
//                                         key={block.id}
//                                         collectionId={collectionInfo.id}
//                                         block={block}
//                                         index={index}
//                                     />
//                                 );
//                             })}
//                         </div>

//                         <InputContainer collectionId={collectionInfo.id} type="block" />
//                     </Paper>
//                 </div>
//             ) : (
//                 <h1>Loading</h1>
//             )}
