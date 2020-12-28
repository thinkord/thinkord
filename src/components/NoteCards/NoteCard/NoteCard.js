/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { TabsContext } from "../../../tabContext";
import appRuntime from "../../../appRuntime";
import "./NoteCard.scss";

import CModal from "../../Elements/Modal/CModal";

function NoteCard({ collection }) {
    const [menuShow, setMenuShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalFunc, setModalFunc] = useState("rename");

    const { id, name, bookmarked, updatedAt } = collection;

    const handleMenuToggle = () => {
        setMenuShow((prevState) => !prevState);
    };

    const handleModalToggle = () => {
        setModalShow((prevState) => !prevState);
    };

    const handleModalChange = (func) => {
        setModalFunc(func);
        handleModalToggle();
    };

    const tabAdd = useContext(TabsContext).addTab;
    const handleTabAdd = () => {
        tabAdd(name, id);
        appRuntime.invoke("window-channel", "create", { win: "controlWin" });
    };

    // const handleBookmarkChanged = (noteId) => {
    // }

    return (
        <React.Fragment>
            <div className="note-block">
                <Link to={`/work/${id}`} className="card-anchor" onClick={handleTabAdd}></Link>
                <div className="bookmark" onClick={bookmarked}>
                    <i className={(bookmarked ? "fas" : "far") + " fa-bookmark"}></i>
                </div>
                <button id="note-block-more" onClick={handleMenuToggle} onBlur={handleMenuToggle}>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
                <div className={(menuShow ? "show" : null) + " note-card-menu"}>
                    <div
                        className="menu-item"
                        onClick={() => {
                            handleModalChange("rename");
                        }}
                    >
                        <i className="fas fa-pen-square"></i> Rename
                    </div>
                    <div
                        className="menu-item"
                        onClick={() => {
                            handleModalChange("delete");
                        }}
                    >
                        <i className="fas fa-trash-alt"></i> Delete
                    </div>
                </div>
                <div className="note-block-details">
                    <h5 className="note-block-title">{name}</h5>
                    <div className="note-block-time">
                        <i className="fas fa-clock"></i>
                        <span>Update at {updatedAt}</span>
                    </div>
                </div>
                <Link
                    className="card-record-anchor"
                    to={`/work/${id}`}
                    onClick={() => {
                        appRuntime.invoke("window-channel", "create", { win: "controlWin" });
                    }}
                >
                    <i className="far fa-dot-circle"></i>
                    Start Recording
                </Link>
            </div>
            <CModal
                id={id}
                title={name}
                modalFunc={modalFunc}
                modalShow={modalShow}
                handleModalToggle={handleModalToggle}
            />
        </React.Fragment>
    );
}

export default withRouter(NoteCard);
