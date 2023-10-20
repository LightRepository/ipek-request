<?php 
$login  = htmlspecialchars(trim($_POST['login']));
$pass  =  trim($_POST['password']);
include "induction.php";
$LoginSuccess = $mysql->query("SELECT * FROM `users` WHERE `login`='$login'");
$user = $LoginSuccess->fetch_assoc();
if(count($user)==0){
exit();
}
if(!($PasswordSuccess =  password_verify($pass, $user['password']))){
exit();
}
setcookie('user', $user['name'], time() + 3600 * 8, "/");
setcookie('permissions', $user['permissions'], time() + 3600 * 8, "/");
echo (1);
$mysql->close();
?>