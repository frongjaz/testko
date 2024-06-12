import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Pagination from "./Pagination";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalDetail from "./ModalDetail";
import "./PRT.css";

const PressReleaseTable = ({ handleEdit,handleDelete }) => {
  const [pressReleases, setPressReleases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [releasesPerPage, setReleasesPerPage] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedRelease, setSelectedRelease] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3"
        );
        console.log(response.data);
        const newsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setPressReleases(newsArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(pressReleases.length / releasesPerPage);

  const indexOfLastRelease = currentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const currentReleases = pressReleases.slice(
    indexOfFirstRelease,
    indexOfLastRelease
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReleasesPerPageChange = (event) => {
    setReleasesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleShowModal = (release, action) => {
    setSelectedRelease(release);
    setModalAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRelease(null);
    setModalAction(null);
  };

  const handleStatusChange = async (newsId, newStatus) => {
    try {
      const updatedReleases = pressReleases.map((release) => {
        if (release.NewsId === newsId) {
          return { ...release, Status: newStatus };
        }
        return release;
      });
      setPressReleases(updatedReleases);

      const response = await axios.post(
        "https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-UpdateStatusNews",
        new URLSearchParams({
          EmployeeId: 3,
          NewsId: newsId,
          Status: newStatus,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      alert(response.data.message || "Status updated successfully");
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Error updating status");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}> ลำดับ</th>
            <th style={{ textAlign: "center" }}>ชื่อเรื่อง</th>
            <th style={{ textAlign: "center" }}>วันที่สร้าง</th>
            <th style={{ textAlign: "center" }}>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {currentReleases.map((release, index) => (
            <tr key={release.NewsId}>
              <td
                style={{
                  width: "10px",
                }}
              >
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={release.Status === 1}
                    onChange={() =>
                      handleStatusChange(
                        release.NewsId,
                        release.Status === 1 ? 0 : 1
                      )
                    }
                  />
                  <span
                    className={`slider ${
                      release.Status === 1 ? "green" : "grey"
                    }`}
                  ></span>
                </label>

                <span>{release.NewsId}</span>
              </td>

              <td style={{ width: "350px" }}>{release.NameNews}</td>
              <td style={{ width: "100px", textAlign: "center" }}>
                {new Date(release.UpdatedDate).toLocaleDateString("th-TH")}
              </td>
              <td style={{ width: "200px", textAlign: "center" }}>
                {release.ButtonView === 1 && (
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => handleShowModal(release, 'view')}
                    style={{ cursor: "pointer", margin: "0 5px" }}
                  />
                )}
                {release.ButtonEdit === 1 && (
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleShowModal(release, 'edit')}
                    style={{ cursor: "pointer", margin: "0 5px" }}
                  />
                )}
                {release.ButtonDelete === 1 && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleShowModal(release, 'delete')}
                    style={{ cursor: "pointer", margin: "0 5px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
        releasesPerPage={releasesPerPage}
        handleReleasesPerPageChange={handleReleasesPerPageChange}
      />
      {selectedRelease && (
        <ModalDetail
          show={showModal}
          handleClose={handleCloseModal}
          release={selectedRelease}
          action={modalAction}
          handleEdit={handleEdit}
          handleDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default PressReleaseTable;
