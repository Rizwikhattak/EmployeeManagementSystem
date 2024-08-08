<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$data = json_decode(file_get_contents('php://input'));

$response = array();

if (isset($data->user_id)) {
    $user_id = intval($data->user_id);

    $sql = "SELECT id, username, role FROM Users WHERE id != ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $users = array();

        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }

        $response['success'] = true;
        $response['users'] = $users;
    } else {
        $response['success'] = false;
        $response['message'] = 'Failed to execute query';
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid input';
}

$conn->close();
echo json_encode($response);
?>