/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { StoreUpdateContext } from "../../context";

export default function CModal({ id, folderId, title, modalShow, modalFunc, handleModalToggle }) {
    const [newTitle, setNewTitle] = useState(title);
    const { addCollection, addFolder, updateCollectionTitle, deleteCollection } = useContext(StoreUpdateContext);

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleNoteRename = (newTitle, noteId) => {
        updateCollectionTitle(newTitle, noteId);
        handleModalToggle();
    };
    const handleNoteDelete = (noteId) => {
        deleteCollection(noteId);
        handleModalToggle();
    };
    const handleFolderCreate = () => {
        addFolder(newTitle);
        handleModalToggle();
    };
    const handleNoteCreate = (title, folderId) => {
        addCollection(title, folderId);
        handleModalToggle();
    };

    var modalDialog;
    switch (modalFunc) {
        case "rename":
            modalDialog = (
                <Modal show={modalShow} onHide={handleModalToggle} centered>
                    <Modal.Header className="modal_header">
                        <Modal.Title>Rename</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input onChange={handleTitleChange} type="text" defaultValue={title} />
                    </Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i
                            className="modal_icon fas fa-check-circle"
                            onClick={() => {
                                handleNoteRename(newTitle, id);
                            }}
                        ></i>
                        <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                    </Modal.Footer>
                </Modal>
            );
            break;
        case "addFolder":
            modalDialog = (
                <Modal show={modalShow} onHide={handleModalToggle} centered>
                    <Modal.Header className="modal_header">
                        <Modal.Title>Name Your New Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="untitled" onChange={handleTitleChange} />
                    </Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i
                            className="modal_icon fas fa-check-circle"
                            onClick={() => {
                                handleFolderCreate();
                            }}
                        ></i>
                        <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                    </Modal.Footer>
                </Modal>
            );
            break;
        case "addCollection":
            modalDialog = (
                <Modal show={modalShow} onHide={handleModalToggle} centered>
                    <Modal.Header className="modal_header">
                        <Modal.Title>Name Your New Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="untitled" onChange={handleTitleChange} />
                    </Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i
                            className="modal_icon fas fa-check-circle"
                            onClick={() => {
                                handleNoteCreate(newTitle, folderId);
                            }}
                        ></i>
                        <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                    </Modal.Footer>
                </Modal>
            );
            break;
        default:
            modalDialog = (
                <Modal show={modalShow} onHide={handleModalToggle} centered>
                    <Modal.Header className="modal_header">
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to delete file $`{title}` ?</Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i
                            className="modal_icon fas fa-check-circle"
                            onClick={() => {
                                handleNoteDelete(id);
                            }}
                        ></i>
                        <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                    </Modal.Footer>
                </Modal>
            );
    }
    return <>{modalDialog}</>;
}
