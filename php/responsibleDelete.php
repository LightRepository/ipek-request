<?php 
$id_resp = $_POST['id'];
include "induction.php";
$result = $mysql->query("DELETE FROM `active_responsible` WHERE `id` = '$id_resp'");
$result1 = $mysql->query("SELECT * FROM `active_responsible` WHERE `id` = '$id_resp'");
//БАГ С УДАЛЕНИЕ В РАССМОТР
$mysql->close();
echo(1);
?>