/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NoteCards from "../../../components/NoteCards/NoteCards";
import Folders from "../../../components/Folders/Folders";
import CModal from "../../../components/Modal/CModal";
import NoteCard from "../../../components/NoteCards/NoteCard/NoteCard";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { StoreContext, StoreUpdateContext } from "../../../context/homeContext";

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
                    <Button
                        variant="contained"
                        className="button"
                        startIcon={<Icon className="fa fa-plus-circle" />}
                        onClick={handleModalToggle}
                    >
                        { position === "home"? "Add Folder" : "Add Note"}
                    </Button>
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
                    <main className="Content">
                        <Container className="container">
                            <Link to="/">Back to Home</Link>
                            <div className="note-cards"> 
                                <div className="card-deck" style={{ display: "flex" }}>
                                {getCollections(folder.cs) &&
                                    getCollections(folder.cs).map((collection) => {
                                        return <NoteCard key={collection.id} collection={collection} />;
                                    })}
                                </div>
                            </div>
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
