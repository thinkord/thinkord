/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import Folder from './Folder/Folder'

export default function Folders({ data }) {
    const folderRender = () => {
        if (data.folders !== undefined) {
            return Object.values(data.folders).map((folder) => {
                return (
                    <Folder key={folder.id} id={folder.id} name={folder.name}/>
                );
            });
        }
    };
    return (
        <div className="folders">
            <h2>Workspaces</h2>
            <div className="card-deck" style={{ display: "flex" }}>
                {folderRender()}
            </div>
        </div>
    );
}
