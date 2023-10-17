<?php  
include "induction.php";
$idReq = trim($_POST['id']);
$fioReq = trim($_POST['fio']);
$result = $mysql->query("SELECT * FROM `users` WHERE `name` = '$fioReq'");
$result1 = $mysql->query("SELECT * FROM `responsibles` WHERE `id` = '$idReq'");

$arr_js = array(
'listResponsibles'=> mysqli_fetch_assoc($result),
'role'=> mysqli_fetch_assoc($result1)
);
$mysql->close();
echo json_encode($arr_js);
?>