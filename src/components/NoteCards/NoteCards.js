/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import NoteCard from "./NoteCard/NoteCard";

// const noteCards = ({ data }) => (
//     <div className="note-cards">
//         <h2>Files</h2>
//         <div className="card-deck" style={{ display: "flex" }}>
//             {Object.keys(data.collections) &&
//                 Object.keys(data.collections).map((collectionId) => {
//                     return (
//                         <NoteCard
//                             key={collectionId}
//                             id={parseInt(collectionId)}
//                             title={data.collections[collectionId].name}
//                             // bookmark={data.collections[collectionId].bookmarked}
//                         ></NoteCard>
//                     );
//                 })}
export default function NoteCards({ data }) {
    const { recentUpdated } = data;
    return (
        <div className="note-cards">
            <h2>Recent Files</h2>
            <div className="card-deck" style={{ display: "flex" }}>
                {recentUpdated && recentUpdated.length > 0 &&
                    recentUpdated.map((collection) => {
                        return <NoteCard key={collection.id} collection={collection}></NoteCard>;
                    })}
            </div>
        </div>
    );
}
