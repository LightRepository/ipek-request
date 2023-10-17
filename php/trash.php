<?php
$id_req = $_POST['id'];
include "induction.php";
$resultReq = $mysql->query("SELECT * FROM `request` WHERE `id` = '$id_req' AND `status` != 'Выполнена'");
while($req = mysqli_fetch_assoc($resultReq)){
    $result = $mysql->query("DELETE FROM `files` WHERE `request_id` = '$id_req'");
    $result = $mysql->query("DELETE FROM `active_responsible` WHERE `request_id` = '$id_req'");
    $result = $mysql->query("DELETE FROM `request` WHERE `id` = '$id_req'");
}

$mysql->close();
echo(1);
?>