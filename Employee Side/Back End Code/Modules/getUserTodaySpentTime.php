<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

$response = array();

if ($user_id > 0) {
    $sql = "
        SELECT SUM(TIMESTAMPDIFF(SECOND, start_time, end_time)) AS total_seconds
        FROM WorkSessions
        WHERE user_id = ?;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    $total_seconds = isset($data['total_seconds']) ? $data['total_seconds'] : 0;

    // Convert total seconds to hours, minutes, and seconds
    $hours = floor($total_seconds / 3600);
    $minutes = floor(($total_seconds % 3600) / 60);
    $seconds = $total_seconds % 60;

    $response['success'] = true;
    $response['hours'] = $hours;
    $response['minutes'] = $minutes;
    $response['seconds'] = $seconds;
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid user ID';
}

echo json_encode($response);
?>