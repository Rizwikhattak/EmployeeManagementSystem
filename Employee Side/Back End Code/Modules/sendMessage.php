<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$data = json_decode(file_get_contents('php://input'));

$response = array();

if (isset($data->sender_id) && isset($data->receiver_id) && isset($data->message)) {
    $sender_id = intval($data->sender_id);
    $receiver_id = intval($data->receiver_id);
    $message = $data->message;

    $sql = "INSERT INTO Messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iis", $sender_id, $receiver_id, $message);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Message sent successfully';
    } else {
        $response['success'] = false;
        $response['message'] = 'Failed to send message';
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid input';
}

$conn->close();
echo json_encode($response);
?>