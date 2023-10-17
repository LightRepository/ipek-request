<?php 
include "induction.php";
$responsible  = trim($_POST['responsible']);
$idReq = trim($_POST['id']);
if($responsible != '' && $responsible != 'Группа ответственных'){
    $resultResp = $mysql->query("SELECT * FROM `active_responsible` WHERE `request_id` = '$idReq'");
    $FileMassResponsibles = array();
    $test = array();
    while($reqResp = mysqli_fetch_assoc($resultResp)){
        array_push($FileMassResponsibles, $reqResp['responsible']);
    }
    $checkUnique = 0;
    foreach ($FileMassResponsibles as $key) {
        if($responsible == $key){
            $checkUnique = $checkUnique + 1;
        };
    };
    if($checkUnique == 0){
        $result = $mysql->query("INSERT INTO `active_responsible` (`request_id`, `responsible`) VALUES ('$idReq', '$responsible')");
        $result = $mysql->query("UPDATE `request` SET `status` = 'В работе' WHERE `id` = '$idReq'");
        echo(1);
    } else {
        echo(false);
    }
}
$mysql->close();

?>