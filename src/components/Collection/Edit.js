/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useState, useEffect } from "react";

import { BlockContext } from "../../context/blockContext";
import { BlockUpdateContext } from "../../context/blockContext";
import EditorJs from "react-editor-js";
// import Image from "@editorjs/image";
import Attaches from '@editorjs/attaches';
import './Block/SimpleImage/simple-image.css';
import './Block/Audio/Audio.css';
import './Block/Video/Video.css';
import SimpleImage from './Block/SimpleImage/simple-image';
import Audio from './Block/Audio/Audio';
import Video from './Block/Video/Video';

export default function Edit() {
    const { collectionInfo } = useContext(BlockContext);
    const { updateBlock } = useContext(BlockUpdateContext);
    const [editor, setEditor] = useState(null);

    //editorjs 需要的資料格式
    const data = {
        blocks: [],
    };

    async function handleEditorChange() {
        if (editor) {
            let savedData = await editor.save();
            console.log(savedData)
            // console.log("Editor blocks:", savedData.blocks[editor.blocks.getCurrentBlockIndex()]);
            if (savedData.blocks[editor.blocks.getCurrentBlockIndex()])
                updateBlock(
                    savedData.blocks[editor.blocks.getCurrentBlockIndex()],
                    editor.blocks.getCurrentBlockIndex()
                );
        }
    }

    async function handleEditorRender(data) {
        if (editor) {
            try {
                await editor.isReady;
                editor.render(data);
            } catch (reason) {
                // eslint-disable-next-line no-console
                console.log(`Editor.js initialization failed because of ${reason}`);
            }
        }
    }

    useEffect(() => {
        // data.blocks = [];
        if (collectionInfo !== undefined) {
            collectionInfo.blocks.map((block, index) => {
                let blockData = null;
                switch (block.type) {
                    case "image":
                        blockData = {
                            type: "image",
                            data: {
                                // url: `${process.env.HOME}//AppData//Roaming//thinkord//blob_storage//${block.title}`
                                url: `http://localhost:3000/media/image/${block.title}`,
                                id: block.id,
                                caption: block.description ? block.description : "",
                                withBorder: false,
                                stretched: false,
                                withBackground: false,
                            },
                        };
                        break;
                    case "audio":
                        blockData = {
                            type: "audio",
                            data: {
                                url: `http://localhost:3000/media/audio/${block.title}`
                            }
                        }
                        break;
                    case "video":
                        blockData = {
                            type: "video",
                            data: {
                                url: `http://localhost:3000/media/video/${block.title}`
                            }
                        }
                        break;
                    default:
                        blockData = {
                            type: "paragraph",
                            data: {
                                id: block.id,
                                text: block.description,
                            },
                        };
                        break;
                }
                // console.log("fucking block data: ",blockData);
                data.blocks.push(blockData);
                return 0;
            });

            handleEditorRender(data);
        }
    });
    return (
        <>
            <EditorJs
                data={data}
                tools={{ 
                    image: {
                        class: SimpleImage,
                        inlineToolbar: true,
                        config: {
                            placeholder: 'Paste image URL'
                        }
                    },
                    audio: {
                        class: Audio
                    },
                    video: {
                        class: Video
                    },
                    attaches: {
                        class: Attaches,
                        config: {
                            endpoint: 'http://localhost:8008/uploadFile'
                        }
                    }
                }}
                instanceRef={(instance) => setEditor(instance)}
                onChange={handleEditorChange}
            />
        </>
    );
}
