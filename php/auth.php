<?php 
$login  = trim($_POST['login']);
$pass  = trim($_POST['password']);
include "induction.php";
$result = $mysql->query("SELECT * FROM `users` WHERE `login`='$login' AND `password`= '$pass'");
$user = $result->fetch_assoc();
if(count($user)==0){
exit();
} else {
setcookie('user', $user['name'], time() + 3600 * 8, "/");
setcookie('permissions', $user['permissions'], time() + 3600 * 8, "/");
echo (1);
};
$mysql->close();
?>