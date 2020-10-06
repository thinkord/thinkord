import React from 'react'
import { Link } from "react-router-dom";
export default function Folders({ data }) {
    const folderRender = () => {
        if (data.folders !== undefined) {
            return Object.values(data.folders).map((folder) => {
                return <Link to={`/folder/${folder.id}`} key={folder.id}>{folder.name}</Link>
            })
        }
    }
    return (
        <div className='note-cards' style={{ padding: "40px 0" }}>
            <h2>Folders</h2>
            <div className='card-deck' style={{ display: "flex" }}>
                {folderRender()}
            </div>
        </div>
    )
}
