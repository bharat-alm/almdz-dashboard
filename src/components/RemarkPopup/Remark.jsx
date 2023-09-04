// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

// const  Remark=()=> {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="name@example.com"
//                 autoFocus
//               />
//             </Form.Group>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Remark textarea</Form.Label>
//               <Form.Control as="textarea" rows={3} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Remark;


import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Remark({ showModal, handleCloseModal, handleReject, ccc, setRemark, remark }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Reject Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="remark">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter remarks"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="danger" onClick={() => handleReject(ccc)}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Remark;
