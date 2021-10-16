/* eslint-disable react/prop-types */
import React, { Component } from "react";
// import { remote } from 'electron'
import logo from "../../../logo.svg";
import "./windowTitlebar.css";

// const { remote } = window.require('electron').remote;
// const win = remote.getCurrentWindow()
// const win = null;
export class WindowTitlebar extends Component {
    // componentDidMount() {
    //     this.handleWindowControls();
    //     this.toggleMaxRestoreButtons();
    //     window.onbeforeunload = (event) => {
    //         /* If window is reloaded, remove win event listeners
    //         (DOM element listeners get auto garbage collected but not
    //         Electron win listeners as the win is not dereferenced unless closed) */
    //         win.removeAllListeners();
    //     }
    // }
    // handleWindowControls() {
    //     // Make minimise/maximise/restore/close buttons work when they are clicked
    //     document.getElementById('min-button').addEventListener("click", event => {
    //         win.minimize();
    //     });

    //     document.getElementById('max-button').addEventListener("click", event => {
    //         win.maximize();
    //     });

    //     document.getElementById('restore-button').addEventListener("click", event => {
    //         win.unmaximize();
    //     });

    //     document.getElementById('close-button').addEventListener("click", event => {
    //         win.close();
    //     });

    //     // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    //     this.toggleMaxRestoreButtons();
    //     win.on('maximize', this.toggleMaxRestoreButtons);
    //     win.on('unmaximize', this.toggleMaxRestoreButtons);
    // }

    // toggleMaxRestoreButtons() {
    //     if (win.isMaximized()) {
    //         document.getElementById('titlebar').classList.add('maximized');
    //     } else {
    //         document.getElementById('titlebar').classList.remove('maximized');
    //     }
    // }
    render() {
        return (
            <div id="titlebar" className="window-titlebar">
                <div id="drag-region">
                    <div id="window-title">
                        <img id="titlebar-logo" src={logo} alt="" />
                        <span>Thinkord</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default WindowTitlebar;
