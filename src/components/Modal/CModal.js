import React, { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal';
import { StoreContext } from '../../context';

export default function CModal({ id, title, modalShow, modalFunc, handleModalToggle }) {
    const [newTitle, setNewTitle] = useState(title);
    const { updateCollectionTitle, deleteCollection } = useContext(StoreContext);
    
    
    const handleTitleChange = (event)=>{
        setNewTitle(event.target.value)
    }
    const handleNoteRename = (newTitle,noteId)=>{
        updateCollectionTitle(newTitle,noteId)
        handleModalToggle()
    }
    const handleNoteDelete = (noteId)=>{
        deleteCollection(noteId)
    }

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
                        <i className="modal_icon fas fa-check-circle" onClick={() => {
                            handleNoteRename(newTitle, id);
                        }}></i>
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
                    <Modal.Body>Do you really want to delete file "{title}" ?</Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i className="modal_icon fas fa-check-circle" onClick={() => {
                            handleNoteDelete(id);
                            handleModalToggle();
                        }}></i>
                        <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                    </Modal.Footer>
                </Modal>
            )
    }
    return (
        <>
            {modalDialog}
        </>

    )
}
