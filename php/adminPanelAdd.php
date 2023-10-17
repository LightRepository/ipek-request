<?php 
include "induction.php";

$admInpType  = trim($_POST['type']); 
$admInplist  = trim($_POST['list']); 
if(isset($_POST['id'])){
    $admItemId = trim($_POST['id']); 
}


if($admInplist == "listTeacher"){
    $admInplist = 'teachers';
    if($admInpType == 'addNew'){
        $groupSelect = $_POST['groupSelect']; //
        $admInpForm  = trim($_POST['textInput']); //
        $result = $mysql->query("INSERT INTO `$admInplist` (`fio`)
        VALUES ('$admInpForm')");
        echo(1);
    } else if($admInpType == 'edit'){
        $groupSelect = $_POST['groupSelect']; //
        $admInpForm  = trim($_POST['textInput']); //
        $result = $mysql->query("UPDATE `$admInplist` SET `fio` = '$admInpForm' WHERE `id` = '$admItemId';");
        echo(1);
    } else if($admInpType == 'delete'){
        $result = $mysql->query("DELETE FROM `$admInplist` WHERE `id` = '$admItemId'");
        echo(1);
    }
} else if ($admInplist == "listCab") {
    $admInplist = 'offices';
    if($admInpType == 'addNew'){
        $groupSelect = $_POST['groupSelect']; 
        $admInpForm  = trim($_POST['textInput']); 
        $result = $mysql->query("INSERT INTO `$admInplist` (`number`)
        VALUES ('$admInpForm')");
        echo(1);
    } else if($admInpType == 'edit'){
        $groupSelect = $_POST['groupSelect']; 
        $admInpForm  = trim($_POST['textInput']); 
        $result = $mysql->query("UPDATE `$admInplist` SET `number` = '$admInpForm' WHERE `id` = '$admItemId';");
        echo(1);
    } else if($admInpType == 'delete'){
        $result = $mysql->query("DELETE FROM `$admInplist` WHERE `id` = '$admItemId'");
        echo(1);
    }
} else if ($admInplist == "listResponsibles"){
    $admInplist = 'responsibles';
    if($admInpType == 'addNew'){
        $groupSelect = $_POST['groupSelect']; 
        $admInpForm  = trim($_POST['textInput']); 
        $roleSelect = $_POST['roleSelect'];
        $fromRespLogin = trim($_POST['fromRespLogin']);
        $fromRespPassword = trim($_POST['fromRespPassword']);
        $resultResp = $mysql->query("SELECT * FROM `users` WHERE `name` = '$admInpForm'");
        $FileMassResponsibles = array();
        while($reqResp = mysqli_fetch_assoc($resultResp)){
            array_push($FileMassResponsibles, $reqResp['name']);
        }
        $checkUnique = 0;
        foreach ($FileMassResponsibles as $key) {
            if($admInpForm == $key){
                $checkUnique = $checkUnique + 1;
            };
        };
        if($checkUnique == 0){
            $result = $mysql->query("INSERT INTO `$admInplist` (`fio`, `specialization`)
            VALUES ('$admInpForm', '$groupSelect')");
            $result = $mysql->query("INSERT INTO `users` (`login`, `password`, `name`, `permissions`)
            VALUES ('$fromRespLogin', '$fromRespPassword', '$admInpForm', '$roleSelect')");
            echo(1);
        } else { 
            echo(false);
        }
    } else if($admInpType == 'edit'){
        $groupSelect = $_POST['groupSelect']; //
        $admInpForm  = trim($_POST['textInput']); //
        $roleSelect = $_POST['roleSelect'];
        $fromRespLogin = trim($_POST['fromRespLogin']);
        $fromRespPassword = trim($_POST['fromRespPassword']);
        $nameItem = $_POST['fio'];
        $result = $mysql->query("UPDATE `$admInplist` SET `fio` = '$admInpForm', `specialization` = '$groupSelect' WHERE `id` = '$admItemId';");
        $result = $mysql->query("UPDATE `users` SET `name` = '$admInpForm', `login` = '$fromRespLogin', `password` = '$fromRespPassword', `permissions` = '$roleSelect' WHERE `name` = '$nameItem';");
        echo(1);
    } else if($admInpType == 'delete'){
        $nameItem = $_POST['fio'];
        $result = $mysql->query("DELETE FROM `$admInplist` WHERE `id` = '$admItemId'");
        $result = $mysql->query("DELETE FROM `users` WHERE `name` = '$nameItem'");
        echo(1);
    }
}
$mysql->close();
?>