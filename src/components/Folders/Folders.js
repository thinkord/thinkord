/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./Folders.scss";
export default function Folders({ data }) {
    const folderRender = () => {
        if (data.folders !== undefined) {
            return Object.values(data.folders).map((folder) => {
                return (
                    <Link to={`/folder/${folder.id}`} key={folder.id} className="folder-block">
                        <i className="fas fa-folder"></i>
                        <h5>{folder.name}</h5>
                    </Link>
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
