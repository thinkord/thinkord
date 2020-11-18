/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import NoteCard from "./NoteCard/NoteCard";

const noteCards = ({ data }) => (
    <div className="note-cards">
        <h2>Files</h2>
        <div className="card-deck" style={{ display: "flex" }}>
            {Object.keys(data.collections) &&
                Object.keys(data.collections).map((collectionId) => {
                    return (
                        <NoteCard
                            key={collectionId}
                            id={collectionId}
                            title={data.collections[collectionId].name}
                            // bookmark={data.collections[collectionId].bookmarked}
                        ></NoteCard>
                    );
                })}
        </div>
    </div>
);

export default noteCards;
