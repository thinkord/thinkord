import React, { useState, useContext } from "react";
// import WindowTitlebar from '../components/WindowTitlebar/WindowTitlebar';
import NoteCards from "../components/NoteCards/NoteCards";
import Folders from "../components/Folders/Folders";
import SearchButton from "../components/SearchButton/SearchButton";
import "./Home.scss";
import Container from "react-bootstrap/Container";
import { StoreContext } from "../context";
import CModal from "../components/Modal/CModal";

// import InputContainer from '../components/Input/InputContainer'

function App(props) {
    const context = useContext(StoreContext);
    const { data } = context;

    const [modalShow, setModalShow] = useState(false);
    const [modalFunc] = useState("addCollection");

    const handleModalToggle = () => {
        setModalShow((prevState) => !prevState);
    };

    return (
        <React.Fragment>
            <header className="home-header">
                <h1 className="title">Home</h1>
                <div className="controls">
                    <SearchButton collections={data}  />
                    <i className="fas fa-plus-circle fa-lg" onClick={handleModalToggle}></i>
                    <img className="user" alt="user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU" />
                </div>
            </header>
            <div className="Content">
                <Container className="container">
                    <Folders data={data}/>
                    <NoteCards data={data} />
                </Container>
            </div>
            <CModal modalFunc={modalFunc} modalShow={modalShow} handleModalToggle={handleModalToggle} history={props.history}/>
        </React.Fragment>
    );
}

export default App;
