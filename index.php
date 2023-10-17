<?php
   if(!isset($_COOKIE['user'])){
      include "login.php";
      ?>
      <?php
   } else {
      include "main_req.php";
   };
?>