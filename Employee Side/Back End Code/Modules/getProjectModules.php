<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';


    $data = json_decode(file_get_contents("php://input"));
    $project_id = $data->project_id;
    $employee_id = $data->employee_id;

    $query = "SELECT pm.id, t.title, pm.progress_percentage FROM ProjectModules pm
              JOIN Tasks t ON pm.task_id = t.id
              WHERE pm.project_id = ? AND pm.employee_id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("ii", $project_id, $employee_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $modules = [];
        while ($row = $result->fetch_assoc()) {
            $modules[] = $row;
        }

        echo json_encode($modules);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to prepare the statement.'
        ]);
    }

    $stmt->close();


$conn->close();
?>