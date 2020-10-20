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

function App() {
    const context = useContext(StoreContext);
    const { data } = context;

    const [modalShow, setModalShow] = useState(false);
    const [modalFunc] = useState("addFolder");

    const handleModalToggle = () => {
        setModalShow((prevState) => !prevState);
    };
    const handleSearchClick = (search_file) => {
        search_file = search_file.toLowerCase();
        var new_collections = [];
        for (var i = 0; i < this.state.collections.length; i++) {
            if (this.state.collections[i].path.split("\\").pop().toLowerCase().includes(search_file)) {
                new_collections.push(this.state.collections[i]);
            }
        }
    };

    return (
        <React.Fragment>
            <header className="home-header">
                <h1 className="title">Home</h1>
                <div className="controls">
                    <SearchButton collections={data} onSearchChange={handleSearchClick} />
                    <i className="fas fa-plus-circle fa-lg" onClick={handleModalToggle}></i>
                    <img
                        className="user"
                        alt="user"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU"
                    />
                </div>
            </header>
            <main>
                <Container>
                    <NoteCards data={data} />
                </Container>
                <Container>
                    <Folders data={data} />
                </Container>
            </main>
            <CModal modalFunc={modalFunc} modalShow={modalShow} handleModalToggle={handleModalToggle} />
        </React.Fragment>
    );
}

export default App;
