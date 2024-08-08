<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$data = json_decode(file_get_contents('php://input'));

$response = array();

if (isset($data->message_id)) {
    $message_id = intval($data->message_id);

    $sql = "DELETE FROM Messages WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $message_id);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Message deleted successfully';
    } else {
        $response['success'] = false;
        $response['message'] = 'Failed to delete message';
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid input';
}

$conn->close();
echo json_encode($response);
?>