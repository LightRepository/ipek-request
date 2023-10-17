<?php 
setcookie('user', "", time() - 3600 * 8, "/");
setcookie('permissions', "", time() - 3600 * 8, "/");
header('Location:../index.php')
 ?>