import React from "react";
import "./App.css";
import PressReleaseTable from "./components/PressReleaseTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const handleEdit = (id) => {
    alert(`Edit press release with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete press release with ID: ${id}`);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">ข่าวประชาสัมพันธ์</h1>
        <div className="add-news-container">
          <button className="add-news-button">
            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#ffffff" }} />{" "}
            เพิ่มข่าว
          </button>
        </div>
      </header>
      <section>
        <h2 className="subtitle">รายการข่าวประชาสัมพันธ์</h2>
        <PressReleaseTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </section>
    </div>
  );
}

export default App;
