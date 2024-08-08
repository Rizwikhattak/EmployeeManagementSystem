<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../Components/_dbConnect.php';

$sql = "SELECT a.id, a.title, a.content, a.created_at, u.username AS created_by 
        FROM Announcements a
        JOIN Users u ON a.created_by = u.id
        WHERE u.role = 'manager'
        ORDER BY a.created_at DESC";

$result = $conn->query($sql);

$announcements = [];

while ($row = $result->fetch_assoc()) {
    $announcements[] = $row;
}

echo json_encode($announcements);
?>