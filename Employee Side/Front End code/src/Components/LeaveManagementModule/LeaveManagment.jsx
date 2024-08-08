import React, { useState, useContext } from "react";
import { Modal, Button, Form, ProgressBar } from "react-bootstrap";
import { AuthContext } from "../../AuthContext";
import "./LeaveManagment.css";

const LeaveManagement = () => {
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [showLeaveBalanceModal, setShowLeaveBalanceModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const { userId } = useContext(AuthContext); // Get user ID from AuthContext

  const handleShowApplyLeaveModal = () => setShowApplyLeaveModal(true);
  const handleCloseApplyLeaveModal = () => setShowApplyLeaveModal(false);

  const handleShowLeaveBalanceModal = () => setShowLeaveBalanceModal(true);
  const handleCloseLeaveBalanceModal = () => setShowLeaveBalanceModal(false);

  // Dummy data for leave balance
  const totalLeave = 30;
  const takenLeave = 10;
  const remainingLeave = totalLeave - takenLeave;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/cafevista/Modules/submitLeaveApplication.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            reason: reason,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Leave application submitted successfully.");
      } else {
        console.log("Failed to submit leave application.");
      }
    } catch (error) {
      console.log(error);
    }

    handleCloseApplyLeaveModal(); // Close the modal after submission
  };

  return (
    <div className="leave-management">
      <Button
        variant="primary"
        onClick={handleShowApplyLeaveModal}
        className="me-2"
      >
        Apply for Leave
      </Button>
      <Button variant="info" onClick={handleShowLeaveBalanceModal}>
        Leave Balance Chart
      </Button>

      {/* Apply for Leave Modal */}
      <Modal show={showApplyLeaveModal} onHide={handleCloseApplyLeaveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLeaveDates">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select dates"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLeaveDates">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select dates"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLeaveReason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter reason for leave"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Leave Balance Modal */}
      <Modal show={showLeaveBalanceModal} onHide={handleCloseLeaveBalanceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Balance Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="leave-balance-chart">
            <h5>Total Leave: {totalLeave}</h5>
            <h5>Taken Leave: {takenLeave}</h5>
            <h5>Remaining Leave: {remainingLeave}</h5>
            <ProgressBar>
              <ProgressBar
                variant="success"
                now={(takenLeave / totalLeave) * 100}
                label={`${takenLeave}`}
                key={1}
              />
              <ProgressBar
                variant="warning"
                now={(remainingLeave / totalLeave) * 100}
                label={`${remainingLeave}`}
                key={2}
              />
            </ProgressBar>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeaveManagement;
