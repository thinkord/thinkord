/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreUpdateContext } from "../../context";
import appRuntime from "../../appRuntime";
import "./Folders.scss";
export default function Folders({ data }) {
    const context = useContext(StoreUpdateContext);

    const folderRender = () => {
        if (data.folders !== undefined) {
            return Object.values(data.folders).map((folder) => {
                return (
                    <div
                        key={folder.id}
                        onContextMenu={(e) => {
                            if (e.type === "contextmenu") {
                                appRuntime.send("systemprocess", "getHomeContextMenu", folder.id);
                                appRuntime.subscribe("contextUpdate", (d) => {
                                    context[d](folder.id);
                                });
                            }
                        }}
                    >
                        <Link to={`/folder/${folder.id}`} className="folder-block">
                            <i className="fas fa-folder"></i>
                            <h5>{folder.name}</h5>
                        </Link>
                    </div>
                );
            });
        }
    };
    return (
        <div className="note-cards" style={{ padding: "40px 0" }}>
            <h2>Folders</h2>
            <div className="card-deck" style={{ display: "flex" }}>
                {folderRender()}
            </div>
        </div>
    );
}
