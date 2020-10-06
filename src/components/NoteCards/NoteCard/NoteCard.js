import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import appRuntime from '../../../appRuntime';
import { StoreContext } from '../../../context';
import Modal from 'react-bootstrap/Modal';
import './noteCard.scss';

function NoteCard(props) {
    const [newTitle, setNewTitle] = useState(props.title);
    const [menuShow, setMenuShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalFunc, setModalFunc] = useState("rename");
    const { updateCollectionTitle, deleteCollection } = useContext(StoreContext);

    const handleMenuToggle = () => {
        setMenuShow(prevState => !prevState);
    }

    const handleModalToggle = () => {
        setModalShow(prevState => !prevState);
    }

    const handleModalChange = (func) => {
        setModalFunc(func);
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    }

    // const handleBookmarkChanged = (noteId) => {
    // }

    const handleNoteRename = (newTitle, noteId) => {
        updateCollectionTitle(newTitle, noteId);
        handleModalToggle();
    }

    const handleNoteDelete = (noteId) => {
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
                        <input onChange={handleTitleChange} type="text" defaultValue={props.title} />
                    </Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i className="modal_icon fas fa-check-circle" onClick={() => {
                            handleNoteRename(newTitle, props.id);
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
                    <Modal.Body>Do you really want to delete file "{props.title}" ?</Modal.Body>
                    <Modal.Footer className="modal_footer">
                        <i className="modal_icon fas fa-check-circle" onClick={() => {
                            handleNoteDelete(props.id);
                            handleModalToggle();
                        }}></i>
                        <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                    </Modal.Footer>
                </Modal>
            )
    }

    return (
        <React.Fragment>
            <div className="note-block">
                <Link to={`/work/${props.id}`} className="card-anchor"></Link>
                <div className="bookmark" onClick={props.bookmarked}><i className={(props.bookmark ? 'fas' : 'far') + " fa-bookmark"}></i></div>
                <button id="note-block-more" onClick={handleMenuToggle} onBlur={handleMenuToggle}><i className="fas fa-ellipsis-h"></i></button>
                <div className={(menuShow ? 'show' : null) + " note-card-menu"}>
                    <div className="menu-item" onClick={() => { handleModalChange("rename"); handleModalToggle(); }}>
                        <i className="fas fa-pen-square"></i> Rename
                    </div>
                    <div className="menu-item" onClick={() => { handleModalChange("delete"); handleModalToggle(); }}>
                        <i className="fas fa-trash-alt"></i> Delete
                    </div>
                </div>
                <div className="note-block-details">
                    <h5 className="note-block-title">{props.title}</h5>
                    <div className="note-block-time">
                        <i className="fas fa-clock"></i>
                        <span>changed 2 hours ago</span>
                    </div>
                    {/* <div className="note-block-tags">
                        <i className="fas fa-tag"></i>
                        <span>statistics</span>
                    </div> */}
                </div>
                <Link className="card-record-anchor" to={`/work/${props.id}`} onClick={() => { appRuntime.send('controlbar', 'hello') }}>
                    <i className="far fa-dot-circle"></i>
                    Start Recording
                </Link>
            </div>
            {modalDialog}
        </React.Fragment>
    )
}

export default NoteCard;