/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NoteCards from "../components/NoteCards/NoteCards";
import Folders from "../components/Folders/Folders";
import CModal from "../components/Modal/CModal";
import NoteCard from "../components/NoteCards/NoteCard/NoteCard";
import { StoreContext, StoreUpdateContext } from "../context";

// import SearchButton from "../components/SearchButton/SearchButton";
import "./Home.scss";

function App({ match }) {
    const { data } = useContext(StoreContext);
    const { getFolder, getCollections } = useContext(StoreUpdateContext);

    const [position] = useState(match.params.id ? match.params.id : "home");
    const [modalShow, setModalShow] = useState(false);

    const handleModalToggle = () => {
        setModalShow((prevState) => !prevState);
    };

    const folder = getFolder(position);

    return (
        <React.Fragment>
            <header className="home-header">
                <h1 className="title">{position === "home" ? "home" : folder.name}</h1>
                <div className="controls">
                    {/* <SearchButton collections={data} onSearchChange={handleSearchClick} /> */}
                    <i className="fas fa-plus-circle fa-lg" onClick={handleModalToggle}></i>
                    <img
                        className="user"
                        alt="user"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU"
                    />
                </div>
            </header>
            {position === "home" ? (
                <>
                    <div className="Content">
                        <Container className="container">
                            <Folders data={data} />
                            <NoteCards data={data} />
                        </Container>
                    </div>
                    <CModal modalFunc="addFolder" modalShow={modalShow} handleModalToggle={handleModalToggle} />
                </>
            ) : (
                <>
                    <main>
                        <Container>
                            <Link to="/">Back to Home</Link>
                            {getCollections(folder.cs) &&
                                getCollections(folder.cs).map((collection) => {
                                    return <NoteCard key={collection.id} id={collection.id} title={collection.name} />;
                                })}
                        </Container>
                    </main>
                    <CModal
                        folderId={position}
                        modalFunc="addCollection"
                        modalShow={modalShow}
                        handleModalToggle={handleModalToggle}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default App;
