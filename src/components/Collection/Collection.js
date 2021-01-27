/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { CollectionTitle } from "./Title";
import Block from "./Block/Block";
import InputContainer from "../Elements/Input/InputContainer";
import classes from "./Collections.module.scss";
import { BlockContext } from "../../context/blockContext";
import { withRouter } from "react-router-dom";
import EditorJs from 'react-editor-js';
import Image from '@editorjs/image'
function Collection(props) {
    const { collectionInfo } = useContext(BlockContext);
    const [editorView, setEditorView] = useState(false);
    const [editor, setEditor] = useState(null);

    //editorjs 需要的資料格式
    const data = {
        blocks: []
    }

    async function handleEditorChange() {
        if(editor){
            let savedData = await editor.save();
            console.log(savedData);
        }
    }

    async function handleEditorRender(data) {
        if(editor){
            await editor.isReady
            console.log(editor)
            editor.render(data)
        }
    }

    useEffect(() =>{
        data.blocks = []
        if(collectionInfo !== undefined){
            console.log(collectionInfo.blocks)
            collectionInfo.blocks.map((block, index) => {
                let blockData = null
                switch(block.type){
                    case "image":
                        blockData = {
                            type: "image",
                            data: {
                                file : {
                                    url: `${process.env.HOME}//AppData//Roaming//thinkord//blob_storage//${block.title}`
                                },
                                caption: block.description ? block.description : "",
                                withBorder: "",
                                stretched: false,
                                withBackground: false
                            }
                        }
                        break;
                    default:
                        blockData = {
                            type: "paragraph",
                            data: {
                                text: block.description
                            }
                        }
                        break;
                }
                data.blocks.push(blockData)
                return 0;
            })
            handleEditorRender(data)
        }
    })

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
                            <i id="clock" className="fas fa-clock" onClick={() => setEditorView(!editorView)}></i>
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
                            {editorView ? (
                                <EditorJs
                                    data={data}
                                    tools={{image: Image}}
                                    instanceRef={instance => setEditor(instance)} 
                                    onChange={handleEditorChange}
                                />
                            ) : (
                                <>
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
                                </>
                            )}
                        </Container>
                    </div>
                </>
            ) : (
                <h1>Loading</h1>
            )}
        </>
    );
}

export default withRouter(Collection);
