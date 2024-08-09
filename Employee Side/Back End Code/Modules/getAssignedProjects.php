<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';


    $data = json_decode(file_get_contents("php://input"));
    $employee_id = $data->employee_id;

    $query = "SELECT p.id, p.project_name FROM Projects p
              JOIN ProjectAssignments pa ON p.id = pa.project_id
              WHERE pa.employee_id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $employee_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $projects = array();
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }

        echo json_encode($projects);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to prepare the statement.'
        ]);
    }

    $stmt->close();


$conn->close();
?>