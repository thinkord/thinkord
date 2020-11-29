/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { TabsContext } from "../../../tabContext";
import appRuntime from "../../../appRuntime";
import "./NoteCard.scss";

import CModal from "../../Modal/CModal";

function NoteCard(props) {
    const [menuShow, setMenuShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalFunc, setModalFunc] = useState("rename");

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
        tabAdd(props.title, props.id);
        appRuntime.send("windprocess", "create");
    };

    // const handleBookmarkChanged = (noteId) => {
    // }

    return (
        <React.Fragment>
            <div className="note-block">
                <Link to={`/work/${props.id}`} className="card-anchor" onClick={handleTabAdd}></Link>
                <div className="bookmark" onClick={props.bookmarked}>
                    <i className={(props.bookmark ? "fas" : "far") + " fa-bookmark"}></i>
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
                <Link className="card-record-anchor" to={`/work/${props.id}`}>
                    <i className="far fa-dot-circle">Start Recording</i>
                </Link>
            </div>
            <CModal
                id={props.id}
                title={props.title}
                modalFunc={modalFunc}
                modalShow={modalShow}
                handleModalToggle={handleModalToggle}
            />
        </React.Fragment>
    );
}

export default withRouter(NoteCard);
