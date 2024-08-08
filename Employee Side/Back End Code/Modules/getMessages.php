<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$data = json_decode(file_get_contents('php://input'));

$response = array();

if (isset($data->sender_id) && isset($data->receiver_id)) {
    $sender_id = intval($data->sender_id);
    $receiver_id = intval($data->receiver_id);

    $sql = "SELECT * FROM Messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_at";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $sender_id, $receiver_id, $receiver_id, $sender_id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $messages = array();

        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }

        $response['success'] = true;
        $response['messages'] = $messages;
    } else {
        $response['success'] = false;
        $response['message'] = 'Failed to fetch messages';
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid input';
}

$conn->close();
echo json_encode($response);
?>