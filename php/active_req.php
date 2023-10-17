<?php 
$id_req = $_POST['id'];
if(isset($_POST['user'])){
    $user = $_POST['user'];
}

include "induction.php";
$result = $mysql->query("SELECT * FROM `request` WHERE `id` = '$id_req'");
$req = mysqli_fetch_assoc($result);
$userActiveReq = false;


$result3 = $mysql->query("SELECT * FROM `active_responsible` WHERE `request_id` = '$id_req'");
$FileMassResponsibles = array();
while($reqResp = mysqli_fetch_assoc($result3)){
    if($user == $reqResp['responsible']){
        $userActiveReq = true;
    }
}
$result2 = $mysql->query("SELECT * FROM `files` WHERE `request_id` = '$id_req'");
$normalizeFileMass = array();
while($req2 = mysqli_fetch_assoc($result2)){
    array_push($normalizeFileMass, $req2);
};

if(isset($req2['path'])){
    $filePath = $req2['path'];
    $fileNameOriginal = $req2['fileName'];
    $extension = $req2['extension'];
    $idFile = $req2['id'];
}
$arr_js = array(
'source' => $req['source'],
'title' => $req['title'],
'cabinet'=> $req['cabinet'],
'message'=> $req['main_text'],
'group_responsible'=> $req['group_responsible'],
'status' => $req['status'],
'fileArr'=> $normalizeFileMass,
'deadline' => $req['deadline'],
'dataCreate' => $req['dateCompletion'],
'id_req' => $req['id'],
'userActiveReq' => $userActiveReq
);
$mysql->close();
echo json_encode( $arr_js );
?>