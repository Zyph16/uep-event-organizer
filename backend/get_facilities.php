<?php
    require("db.php");

    $sql = "SELECT FacilityID, FacilityName, image_path FROM facilities";
    $result = $conn->query($sql);

    $cards = [];
    while($row = $result->fetch_assoc()){

        $cards[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($cards)

?>



