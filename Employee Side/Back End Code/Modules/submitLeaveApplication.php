<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$data = json_decode(file_get_contents('php://input'));

$response = array();

if (isset($data->user_id) && isset($data->start_date) && isset($data->end_date) && isset($data->reason)) {
    $user_id = intval($data->user_id);
    $start_date = $data->start_date;
    $end_date = $data->end_date;
    $reason = $data->reason;

    $sql = "INSERT INTO LeaveApplications (user_id, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, 'pending')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isss", $user_id, $start_date, $end_date, $reason);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Leave application submitted successfully';
    } else {
        $response['success'] = false;
        $response['message'] = 'Failed to submit leave application';
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid input';
}

$conn->close();
echo json_encode($response);
?>