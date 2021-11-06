/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CModal from "../../Modal/CModal";
import Menu from "@material-ui/core/Menu";
import "./Folders.scss";
import MenuItem from "@material-ui/core/MenuItem";

const initialState = {
    mouseX: null,
    mouseY: null,
};

export default function Folder(props) {
    const [state, setState] = useState(initialState);
    const [modalShow, setModalShow] = useState(false);
    const [modalFunc, setModalFunc] = useState("rename");

    const handleModalToggle = () => {
        setModalShow((prevState) => !prevState);
    };

    const handleModalChange = (func) => {
        setModalFunc(func);
        handleModalToggle();
    };

    const handleClick = (event) => {
        event.preventDefault();
        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setState(initialState);
    };

    const handleFolderDelete = () => {
        handleModalChange("deleteFolder");
        handleClose();
    };

    const handleFolderRename = () => {
        handleModalChange("renameFolder");
        handleClose();
    };

    return (
        <div key={props.id}>
            <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
                <Link to={`/folder/${props.id}`} className="folder-block">
                    <i className="fas fa-folder"></i>
                    <h5>{props.name}</h5>
                    <div className="click-area" fid={props.id} fname={props.name}></div>
                </Link>
                <Menu
                    keepMounted
                    open={state.mouseY !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        state.mouseY !== null && state.mouseX !== null
                            ? { top: state.mouseY, left: state.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={handleFolderDelete}>Delete</MenuItem>
                    <MenuItem onClick={handleFolderRename}>Rename</MenuItem>
                </Menu>
            </div>
            <CModal
                id={props.id}
                title={props.name}
                modalFunc={modalFunc}
                modalShow={modalShow}
                handleModalToggle={handleModalToggle}
            />
        </div>
    );
}
