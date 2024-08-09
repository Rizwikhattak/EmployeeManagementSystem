<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';


    $data = json_decode(file_get_contents("php://input"));
    $project_id = $data->project_id;
    $module_id = $data->module_id;
    $progress_percentage = $data->progress_percentage;

    $query = "UPDATE ProjectModules 
              SET progress_percentage = ?, updated_at = NOW()
              WHERE project_id = ? AND id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("iii", $progress_percentage, $project_id, $module_id);
        if ($stmt->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Module progress updated successfully.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to update the module progress.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to prepare the statement.'
        ]);
    }

    $stmt->close();


$conn->close();
?>