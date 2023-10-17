<?php
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    define("TG_TOKEN", "6018262234:AAF7gPhzAecKcqWi4U57ZwPRG1ALCrK_KLw");
    // $chat_id = 1040451080;
    define("TG_ID_ADMIN", "1040451080");
    define("TG_NAME_ADMIN", "Марина Викторовна");
  $getUpdates = file_get_contents("https://api.telegram.org/bot6018262234:AAF7gPhzAecKcqWi4U57ZwPRG1ALCrK_KLw/getUpdates");
  $json = json_decode($getUpdates, true);
  $count = 0;

    //Создание заявки, admin
    $textMessage = `Здравствуйсте,` . TG_NAME_ADMIN . `, была создана заявка:\n`;
    $textMessage .= "\n";
    $textMessage .= "Название заявки:  '$title'\n";
    $textMessage .= "Кто создал:  '$source'\n";
    $textMessage .= "Кабинет:  '$cabinet'\n";

    //Отклик на заявку, admin
    $textMessage = `Здравствуйсте,` . TG_NAME_ADMIN . `\n`;
    $textMessage .= "\n";
    $textMessage .= "На заявку: '$title' откликнулся ИМЯ\n";
    $textMessage .= "\n";
    $textMessage .= "Название заявки:  '$title'\n";
    $textMessage .= "Кто создал:  '$source'\n";
    $textMessage .= "Кабинет:  '$cabinet'\n";
    //Завершение заявки, admin
    $textMessage = `Здравствуйсте,` . TG_NAME_ADMIN . `\n`;
    $textMessage .= "\n";
    $textMessage .= "Заявка: '$title' была выполнена\n";
    $textMessage .= "\n";
    $textMessage .= "Название заявки:  '$title'\n";
    $textMessage .= "Кто создал:  '$source'\n";
    $textMessage .= "Кабинет:  '$cabinet'\n";
    //Назначение, implement
    $textMessage = `Здравствуйсте,` . TG_NAME_ADMIN . `\n`;
    $textMessage .= "\n";
    $textMessage .= "Вы были назначены ответственным за зявку: '$title', удачи!\n";
    $textMessage .= "\n";
    $textMessage .= "Название заявки:  '$title'\n";
    $textMessage .= "Кто создал:  '$source'\n";
    $textMessage .= "Кабинет:  '$cabinet'\n";

    //Выполнение, implement
    $textMessage = `Здравствуйсте,` . TG_NAME_ADMIN . `\n`;
    $textMessage .= "\n";
    $textMessage .= "Заявка: '$title', за которую вы были ответственны была выполнена\n";
    $textMessage .= "\n";
    $textMessage .= "Название заявки:  '$title'\n";
    $textMessage .= "Кто создал:  '$source'\n";
    $textMessage .= "Кабинет:  '$cabinet'\n";

    if(!empty($message)){
        $textMessage .= "Описание заявки:  '$message'\n";
    };
    if(!empty($normalizeFileMass)){
        $textMessage .= "\n<b>Есть прикреплённые файлы</b>";
    };
    $getQuery = array(
        "chat_id" => TG_ID_ADMIN,
        "text" => "$textMessage",
        "parse_mode" => "html",
    );

    $ch = curl_init("https://api.telegram.org/bot". TG_TOKEN ."/sendMessage?" . http_build_query($getQuery));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $resultQuery = curl_exec($ch);
    if(!empty($resultQuery)){
      echo ($resultQuery);
    } else {
      echo true;
    }
    curl_close($ch);
?>