<?php 
include "induction.php";
$result = $mysql->query("SELECT * FROM `offices`");
$result2 = $mysql->query("SELECT * FROM `teachers`");
$result3 = $mysql->query("SELECT * FROM `responsibles`");
$FileMassCab = array();
while($req = $result->fetch_assoc()){
    array_push($FileMassCab, $req);
}

$FileMassTeacher = array();
while($req1 = mysqli_fetch_assoc($result2)){
    array_push($FileMassTeacher, $req1);
}

$FileMassResponsibles = array();
while($req2 = mysqli_fetch_assoc($result3)){
    array_push($FileMassResponsibles, $req2);
}

$arr_js = array(
'listCab'=> ($FileMassCab),
'listTeacher'=> ($FileMassTeacher),
'listResponsibles'=> ($FileMassResponsibles),
);


echo (json_encode($arr_js));
$mysql->close();
?>