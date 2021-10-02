/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useState, useEffect } from "react";

import { BlockContext } from "../../context/blockContext";
import { BlockUpdateContext } from "../../context/blockContext";
import EditorJs from "react-editor-js";
// import Image from "@editorjs/image";
import Attaches from "@editorjs/attaches";
import "./Block/SimpleImage/simple-image.css";
import "./Block/Audio/Audio.css";
import "./Block/Video/Video.css";
import SimpleImage from "./Block/SimpleImage/simple-image";
import Audio from "./Block/Audio/Audio";
import Video from "./Block/Video/Video";

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
        if (collectionInfo !== undefined) {
            collectionInfo.blocks.map((block, index) => {
                const path = block.files !== undefined && block.files.length > 0 ? block.files[0].path : null;
                let blockData = null;
                switch (block.type) {
                    case "image":
                        blockData = {
                            type: "image",
                            data: {
                                url:
                                    process.env.NODE_ENV === "development"
                                        ? `http://localhost:3000/${path}`
                                        : `${path}`,
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
                                url:
                                    process.env.NODE_ENV === "development"
                                        ? `http://localhost:3000/${path}`
                                        : `${path}`,
                            },
                        };
                        break;
                    case "video":
                        blockData = {
                            type: "video",
                            data: {
                                url:
                                    process.env.NODE_ENV === "development"
                                        ? `http://localhost:3000/${path}`
                                        : `${path}`,
                            },
                        };
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
                data.blocks.push(blockData);
                return 0;
            });

            handleEditorRender(data);
        }
    }, [data]);
    return (
        <>
            <EditorJs
                data={data}
                tools={{
                    image: {
                        class: SimpleImage,
                        inlineToolbar: true,
                        config: {
                            placeholder: "Paste image URL",
                        },
                    },
                    audio: {
                        class: Audio,
                    },
                    video: {
                        class: Video,
                    },
                    attaches: {
                        class: Attaches,
                        config: {
                            endpoint: "http://localhost:8008/uploadFile",
                        },
                    },
                }}
                instanceRef={(instance) => setEditor(instance)}
                onChange={handleEditorChange}
            />
        </>
    );
}
