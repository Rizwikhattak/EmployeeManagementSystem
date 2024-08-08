<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../Components/_dbConnect.php';

$sql = "
    SELECT pr.id, ue.username AS employee_name, ur.username AS manager_name, pr.review, pr.created_at
    FROM PerformanceReviews pr
    JOIN Users ue ON pr.user_id = ue.id
    JOIN Users ur ON pr.reviewer_id = ur.id
    WHERE ur.role = 'manager';
";

$result = $conn->query($sql);

$reviews = [];

while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

echo json_encode($reviews);
?>