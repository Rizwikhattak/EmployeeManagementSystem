<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../Components/_dbConnect.php'; 


$data = json_decode(file_get_contents("php://input"));


file_put_contents('php://stderr', print_r($data, TRUE));

$email = isset($data->email) ? $data->email : null;
$password = isset($data->password) ? $data->password : null;

$response = array();

if ($email && $password) {
    
    $sql = "SELECT id, username, password FROM Users WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        $response['success'] = true;
        $response['message'] = 'Login successful';
        $response['user_id'] = $user['id'];
    } else {
        $response['success'] = false;
        $response['message'] = 'Invalid email or password';
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Email and password are required';
}

echo json_encode($response);
?>