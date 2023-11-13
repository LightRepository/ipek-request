<?php 
$user = $_COOKIE['user'];
include "induction.php";
    $result = mysqli_query($mysql, "SELECT * FROM `request` ORDER BY `dateCompletion`");
    $arr = array();
    while($req = mysqli_fetch_assoc($result)){
        $newId = $req['id'];
        $resultResp = mysqli_query($mysql, "SELECT * FROM `active_responsible` WHERE `request_id` = '$newId' LIMIT 200");
        $FileMassResponsibles = array();
        while($reqResp = mysqli_fetch_assoc($resultResp)){
            array_push($FileMassResponsibles, $reqResp);
        }
        $arr_js = array(
            'id' => $req['id'],
            'title' => $req['title'],
            'main_text' => $req['main_text'],
            'status' => $req['status'],
            'dateOfCreation' => $req['dateOfCreation'],
            'dateCompletion' => $req['dateCompletion'],
            'cabinet' => $req['cabinet'],
            'source' => $req['source'],
            'deadline' => $req['deadline'],
            'groupResponible' => $req['group_responsible'],
            'listResponsibles'=> $FileMassResponsibles,
            'user'=> $_COOKIE['user']
        );
        array_push($arr, $arr_js);
    }

    echo (json_encode($arr));
    $mysql->close();
?>