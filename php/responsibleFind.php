<?php  
include "induction.php";
$idReq = trim($_POST['id']);
$result = $mysql->query("SELECT * FROM `active_responsible` WHERE `request_id` = '$idReq'");
$FileMassResponsibles = array();
while($req = mysqli_fetch_assoc($result)){
    array_push($FileMassResponsibles, $req);
}
$mysql->close();
$arr_js = array(
'listResponsibles'=> ($FileMassResponsibles),
);
echo json_encode($arr_js);
?>