<?php
$id_req = $_POST['id'];
$dataClose = date("Y-m-d H:i:s"); 
include "induction.php";
$result = $mysql->query("UPDATE `request` SET `status` = 'Выполнена',`dateCompletion` = '$dataClose'  WHERE `id` = '$id_req';");
$mysql->close();
echo(1);
?>