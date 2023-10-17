<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style_log.css">
        <link rel="icon" href="img/favicon.ico">
    <title>Авторизация</title>
</head>
<body>
    <div class="wrapper">
        <div class="alert-request">
            <h2>title</h2>
            <p>paragraph</p>
        </div>
        <main>
            <div class="auth">
                <p class="auth__title">Авторизация</p>
                <form class="auth__form" action="php/auth.php" method="post" id="form">
                    <input class="auth__input-login auth__input" type="text" name="login" placeholder="Введите логин">
                    <input class="auth__input-password auth__input" type="password" name="pass" placeholder="Введите пароль">
                    <input class="auth__input-submit hover-btns" type="button" value="Вход">    
                </form>
                <a src="" class="return__nav hover-btns-t">Вернуться в Навигатор</a>
            </div>
        </main>
    </div>
    <script src="js/jquery-3.6.3.min.js" defer></script>
    <script src="js/log_script.js" defer></script>
</body>
</html>