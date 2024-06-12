import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ModalDetail.css";

const ModalDetail = ({ show, handleClose, release, action, handleEdit, handleDelete }) => {
  if (!release) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          รายละเอียดข่าวประชาสัมพันธ์
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName" className="form-group">
            <Form.Label className="label">ชื่อเรื่อง</Form.Label>
            <Form.Control type="text" value={release.NameNews} disabled />
          </Form.Group>
          <Form.Group controlId="formContent" className="form-group">
            <Form.Label className="label">เนื้อหา</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={release.Detail}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formStatus" className="form-group">
            <Form.Label className="label">สถานะ</Form.Label>
            <label className="switch">
              <input type="checkbox" checked={release.Status === 1} readOnly />
              <span
                className={`slider ${release.Status === 1 ? "green" : "grey"}`}
              ></span>
            </label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      {action === 'edit' && (
          <Button variant="warning" onClick={() => { handleEdit(release.NewsId); handleClose(); }}>
            แก้ไข
          </Button>
        )}
        {action === 'delete' && (
          <Button variant="danger" onClick={() => { handleDelete(release.NewsId); handleClose(); }}>
            ลบ
          </Button>
        )}
        <Button variant="primary" onClick={handleClose}>
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetail;
