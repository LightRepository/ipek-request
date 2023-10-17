<?php 
include "induction.php";
if(!isset($_POST['id'])) {
   $title  = trim($_POST['title']);
   $dateOfCreation  = date("Y-m-d H:i:s"); 
   $groupResponsible  = trim($_POST['groupResponsible']);
   $source  = trim($_POST['source']);
   $cabinet  = trim($_POST['cabinet']);
   $main_text  = trim($_POST['message']);
   $deadline = $_POST['date'];
   $result = $mysql->query("INSERT INTO `request` (`status`, `dateOfCreation`, `group_responsible`, `cabinet`, `source`, `title`, `main_text`, `deadline`)
   VALUES ('В рассмотрении', '$dateOfCreation', '$groupResponsible', '$cabinet', '$source', '$title', '$main_text', '$deadline');");
   $req_id = $mysql->query("SELECT * FROM `request` ORDER BY `id` DESC LIMIT 1");
   $req_id = $req_id->fetch_assoc();
   $req_id = $req_id["id"];
   // files
   $files = $_FILES["file"];
   $normalizeFileMass = [];
   foreach ($files as $key_name => $value) {
       foreach ($value as $key => $item) {
          $normalizeFileMass[$key][$key_name] = $item;
       }
   };
   foreach($normalizeFileMass as $file){
      if(!is_dir('../uploads')){
         mkdir('../uploads', 0777, true);
      }
      //валидация
      $fileSize = $file["size"] / 1000000;
      $maxSize = 15; //mb
      if($fileSize > $maxSize){
         continue;
      }
      $nameOriginal = $file["name"];
      $extension = pathinfo($file["name"], PATHINFO_EXTENSION);
      $fileName = time() . $file["name"];
      if($file["name"]){
         $result = $mysql->query("INSERT INTO `files` (`path`, `request_id`, `fileName`, `extension`)
         VALUES ('$fileName', '$req_id', '$nameOriginal', '$extension');");
         move_uploaded_file($file["tmp_name"], "../uploads/" . $fileName);
      }
   };
   //include "IPEKRequestBOT.php";
   echo true;
} else {
   $id_req = $_POST['id'];
   $result = $mysql->query("SELECT * FROM `request` WHERE `id` = '$id_req'");
   $messageEdit = trim($_POST['message-edit']);
   $titleEdit = trim($_POST['titleEdit']);
   $cabinetEdit = trim($_POST['cabinet']);
   $deadlineEdit = trim($_POST['deadlineEdit']);
   if(isset($_POST['fileDel'])){
         $idDeleteFile = $_POST['fileDel'];
         foreach($idDeleteFile as $fileId){
            $result2 = $mysql->query("DELETE FROM `files` WHERE `id` = '$fileId'");
         };
   }
   $arr_js = array();

   $result = $mysql->query("UPDATE `request` SET `title` = '$titleEdit', `cabinet` = '$cabinetEdit', `main_text` = '$messageEdit', `deadline` =  '$deadlineEdit' WHERE `id` = '$id_req'");
   echo true;
};



$mysql->close();
?>