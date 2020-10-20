/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import WindowTitlebar from '../components/WindowTitlebar/WindowTitlebar';
import NoteCard from "../components/NoteCards/NoteCard/NoteCard";
// import SearchButton from '../components/SearchButton/SearchButton';
import { StoreUpdateContext } from "../context";
import Container from "react-bootstrap/Container";

export default function Workspace({ match }) {
    const { getFolder, getCollections } = useContext(StoreUpdateContext);

    const [folderId] = useState(match.params.id);

    const folder = getFolder(folderId);
    const collections = getCollections(folder.cs);

    return (
        <React.Fragment>
            <header className="home-header">
                <h1 className="title">Home</h1>
                <div className="controls">
                    {/* <SearchButton collections={data} onSearchChange={handleSearchClick} /> */}
                    <i className="fas fa-plus-circle fa-lg"></i>
                    <img
                        className="user"
                        alt="user"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU"
                    />
                </div>
            </header>
            <main>
                <Container>
                    <Link to="/">Back to Home</Link>
                    {collections &&
                        collections.map((collection) => {
                            return <NoteCard key={collection.id} id={collection.id} title={collection.title} />;
                        })}
                </Container>
            </main>
        </React.Fragment>
    );
}
