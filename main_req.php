<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main_req.css">
    <link rel="icon" href="img/favicon.ico">
    <title>Система заявок</title>
</head>

<body>
    <div class="wrapper">
        <div class="alert-request">
            <h2>title</h2>
            <p>paragraph</p>
        </div>
        <div class="alert__request-window">
            <span class="alert__shadow"></span>
            <div class="edit-save__alert alert-request-edit">
                <h2>Подтверждение</h2>
                <p>Вы действительно хотите сохранить заявку?</p>
                <div class="alert-request-edit-btn">
                    <input type="button" value="Да" id="saveBtnYes" class="request-edit-btn-yes hover-btns">
                    <input type="button" value="Нет" id="saveBtnNo" class="request-edit-btn-no hover-btns-no">
                </div>        
            </div>
            <div class="edit-delete__alert alert-request-edit ">
                <h2>Подтверждение</h2>
                <p>Вы действительно хотите удалить заявку?</p>
                <div class="alert-request-edit-btn">
                    <input type="button" value="Да" id="deleteBtnYes" class="request-edit-btn-yes hover-btns">
                    <input type="button" value="Нет" id="deleteBtnNo" class="request-edit-btn-no hover-btns-no">
                </div>
            </div>
            <div class="edit-cancel__save__alert alert-request-edit ">
                <h2>Подтверждение</h2>
                <p>Вы действительно хотите отменить сохранение заявки?</p>
                <div class="alert-request-edit-btn">
                    <input type="button" value="Да" id="cancelSaveBtnYes" class="request-edit-btn-yes hover-btns">
                    <input type="button" value="Нет" id="cancelSaveBtnNo" class="request-edit-btn-no hover-btns-no">
                </div>        
            </div>
            <div class="archive__alert alert-request-edit ">
                <h2>Подтверждение</h2>
                <p>Вы действительно хотите отправить заявку в архив?</p>
                <div class="alert-request-edit-btn">
                    <input type="button" value="Да" id="archiveBtnYes" class="request-edit-btn-yes hover-btns">
                    <input type="button" value="Нет" id="archiveBtnNo" class="request-edit-btn-no hover-btns-no">
                </div>        
            </div>
            <div class="respond__alert alert-request-edit ">
                <h2>Подтверждение</h2>
                <p>Вы действительно хотите принять заявку?</p>
                <div class="alert-request-edit-btn">
                    <input type="button" value="Да" id="respondBtnYes" class="request-edit-btn-yes hover-btns">
                    <input type="button" value="Нет" id="respondBtnNo" class="request-edit-btn-no hover-btns-no">
                </div>        
            </div>
            <div class="deleteAcc__alert alert-request-edit ">
                <h2>Подтверждение</h2>
                <p>Вы действительно хотите принять заявку?</p>
                <div class="alert-request-edit-btn">
                    <input type="button" value="Да" id="deleteAccBtnYes" class="request-edit-btn-yes hover-btns">
                    <input type="button" value="Нет" id="deleteAccBtnNo" class="request-edit-btn-no hover-btns-no">
                </div>        
            </div>
        </div>
        <!-- Заполнение заявки -->
        <div class="box-applications__window" id="request">
            <div class="box-applications__window-shadow"></div>
            <div class="applications__window scrollTop">
            <form class="applications__window-form" class="from_req">                
                <div class="applications__window-request">
                    <div class="applications__window-header">
                        <p class="applications__window-request-text">Заявка</p>
                        <input type="button" value="" class="close__request">
                    </div>
                    <input type="form" name="title" class="val_null hover-selection" placeholder="Название заявки" id='title' maxlength="36" autocomplete="off">
                    <div class="name_select select">
                        <div class="name_select__header select__header hover-selection">
                            <input type="text" name="source" class="name_select__current val_null__inp" id='source' placeholder="ФИО" maxlength="28" autocomplete="off">
                            <span class="type_select__arrow arrow">
                                <img src="img/select-arrow.svg" alt="">
                            </span>
                        </div>
                        <div class="name_select__body" id="name_select__body">
                        </div>
                        <input type="hidden" name="type_request" id='type_request'>
                    </div>
                    <div class="type_select select">
                        <div class="type_select__header select__header hover-selection">
                            <input type="text" name="cabinet" class="type_select__current val_null__inp" id="type_select__current" placeholder="Кабинет" autocomplete="off">
                            <span class="type_select__arrow arrow">
                                <img src="img/select-arrow.svg" alt="">
                            </span>
                        </div>
                        <div class="type_select__body" id="type_select__body">
                        </div>
                        <input type="hidden" name="type_request" id='type_request'>
                    </div>
                    <div class="group_select select">
                        <div class="group_select__header hover-selection" id="group_select__header">
                            <span class="group_select__current font-black" id="group_select__current">ИКТ</span>
                            <span class="type_select__arrow arrow">
                                <img src="img/select-arrow.svg" alt="">
                            </span>
                        </div>
                        <div class="group_select__body">
                            <div class="group_select__item">ИКТ</div>
                            <div class="group_select__item">АХЧ</div>
                        </div>
                        <input type="hidden" name="group_responsible" id='group_responsible'>
                    </div>
                    <div class="date-deadLine-box">
                        <input type="date" name="date" placeholder="Срок" id='date-deadLine' class="date-dead__line val_null hover-selection">
                        <label for="date-deadLine" class="date-deadLine-box-label">
                            <p>Крайний срок выполнения</p>
                        </label>
                    </div>
                    <div class="insert__img-block">
                        <p class="insert__img-text__file">Файлы</p>
                        <div id="insert__img-box" class="insert__img-box">
                            <div class="insert__img add__insert__img create__file">
                                <input id="add__file-0" class="add__file" type="file" name="file[]" onchange="uploadFiles()">
                                <div id="file__preview-0" class="file__preview">
                                    <label for="add__file-0">
                                        <span>
                                            <div>
                                                <img src="img/addFile.svg" alt="">
                                            </div>
                                            <p>Добавить<br>файл</p>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <textarea name="message" id="messange" cols="30" rows="10" placeholder="Сообщение"></textarea>
                </div>
                <div class="applications__window-submit">
                    <input class="submitRequest hover-btns" type="button" value="Отправить" id="submitRequest">    
                </div>
                <div class="footer-request"></div>
            </form>
            </div>    
        </div>

        <!-- Заполненная заявка -->
        <div class="box-applications__window-view" id="request-view" tag=''>
            <div class="box-applications__window-shadow"></div>
            <div class="applications__window-view scrollTop">
                <form class="applications__window-view-form" action="">
                    <div class="applications__window-header">
                        <input type="button" value="" class="edit__request-view" id="other-view">
                        <p class="applications__window-request-view-text">Заявка</p>
                        <input type="button" value="" class="close__request-view" id="close__request-view">
                        <div class="field__edit no__active">
                            <input type="button" value="Редактирование" class="edit">
                            <input type="button" value="Удалить" class="delete">
                        </div>
                    </div>
                    <div class="applications__window-request-view-name applications__window-request-view-field">
                        <p>ФИО</p>
                        <input type="form" value="" class="inp_source_active full_name" readonly>
                    </div>
                    <div class="applications__window-request-view-cabinet applications__window-request-view-field">
                        <p>Кабинет</p>
                        <input type="form" value="" class="inp_cabinet_active cabinet" readonly>
                    </div>
                    <div class="applications__window-request-view-type applications__window-request-view-field">
                        <p>Срок выполнения</p>
                        <input type="date" value="" class="inp_type_request_active" id='deadline__current-view' readonly>
                    </div>
                    <!-- файлы для окна заявок -->
                    <div class="insert__img-block">
                        <p class="insert__img-text__file">Файлы</p>
                        <div id="insert__img-box-view" class="insert__img-box">


                        </div>
                    </div>
                    <textarea name="message-view" id="message-view" cols="30" rows="10" value="123" readonly></textarea>
                    <div class="applications__window-submit-respond">
                        <input class="submitRequest hover-btns" type="button" value="Завершить" id="submitRespond">
                        <input class="submitRequest hover-btns" type="button" value="Откликнуться" id="respond" tag=''>
                    </div>
                    <div class="footer-request"></div>

                </form>
            </div>    
        </div>

        <!-- Редактирование заявки -->
        <div class="box-applications__window-view box-applications__window-view" id="request-view-edit">
            <div class="box-applications__window-shadow"></div>
            <div class="applications__window-view applications__window-view-edit scrollTop">
                <form class="applications__window-view-form" id='form_edit_data'>
                    <div class="applications__window-header">
                        <input type="button" value="" class="edit__request-view" id="other-edit">
                        <p class="applications__window-request-view-text">Заявка</p>
                        <input type="button" value="" class="close__request-view" id="close__request-edit">
                        <div class="field__edit field__edit-in__edit no__active">
                            <input type="button" value="Удалить" class="delete-in__edit delete">
                        </div>
                    </div>
                    <div class="applications__window-request-view-name__request applications__window-request-view-field-edit">
                        <p>Название заявки</p>
                        <input type="form" name='titleEdit' class="inp_title_active applications__window-request-view-field-edit-input validationBtnedit" id='request_edit_title' autocomplete="off"z>                    
                    </div>
                    <div class="applications__window-request-view-type applications__window-request-view-field-edit">
                        <p>Кабинет</p>
                        <div class="type_select select type__edit type__select__edit">
                            <div class="type_select__header select__header hover-selection">
                                <input type="text" name="cabinet" class="type_select__current val_null__inp cabinet_inp_edit validationBtnedit" id="type_select__current-edit" placeholder="Кабинет" autocomplete="off">
                                <span class="type_select__arrow arrow">
                                    <img src="img/select-arrow.svg" alt="">
                                </span>
                            </div>
                            <div class="type_select__body" id="type_select__body-edit">
                            </div>
                            <input type="hidden" name="type_request" id='type_request'>
                        </div>
                    </div>
                    <div class="applications__window-request-view applications__window-request-view-field-edit">
                        <p>Срок выполнения</p>
                        <input type="date" value="" name='deadlineEdit' class='deadline_edit_inp-edit applications__window-request-view-field-edit-input validationBtnedit'>
                    </div>
                    <!-- файлы для окна заявок -->
                    <div class="insert__img-block">
                        <p class="insert__img-text__file">Файлы</p>
                        <div id="insert__img-box-edit" class="insert__img-box">
                        </div>
                    </div>


                    <textarea name="message-edit" id="message-view-edit" cols="30" rows="10" value="123"></textarea>
                    <div class="applications__window-view-submit">
                        <input class="submitRequest hover-btns" type="button" value="Сохранить" id="submitSave">
                    </div>
                    <div class="footer-request"></div>

                </form>
            </div>    
        </div>

        <!-- Архив заявок -->
        <div class="box-applications__window-view-archiv" id="request-view-archiv">
            <div class="box-applications__window-shadow"></div>
            <div class="applications__window-view scrollTop">
                <form class="applications__window-view-form" action="">
                    <div class="applications__window-header">
                        <p class="applications__window-request-view-text" id='request_archive_title'>Заявка</p>
                        <input type="button" value="" class="close__request-view" id="close__request-view-archiv">
                    </div>
                    <div class="applications__window-request-view-name applications__window-request-view-field">
                        <p>ФИО</p>
                        <input type="form" value="" class="inp_source_active" id='request_archive_source' readonly>
                    </div>
                    <div class="applications__window-request-view-cabinet applications__window-request-view-field">
                        <p>Кабинет</p>
                        <input type="form" value="" class="inp_cabinet_active" id='request_archive_cabinet' readonly>
                    </div>
                    <div class="applications__window-request-view-type applications__window-request-view-field">
                        <p>Дата выполнения</p>
                        <input type="date" value="" class="inp_type_request_active inp_data_arh" id='dateOfCompelete' readonly>
                    </div>
                    <!-- файлы для окна заявок -->
                    <div class="insert__img-block">
                        <p class="insert__img-text__file">Файлы</p>
                        <div id="insert__img-box-arh" class="insert__img-box">
                        </div>
                    </div>
                    <textarea name="message-view" id="message-view-archiv" cols="30" rows="10" value="123" readonly></textarea>
                    <div class="footer-request"></div>
                </form>
            </div>    
        </div>
        <!-- Исполнители -->
        <div class="box-applications__window-implementer" id="request-implementer">
            <div class="box-applications__window-shadow"></div>
            <div class="window-implementer">
                <div class="title__implementer">
                    <h2>Ответственные</h2>
                    <input type="button" value="" id="closeImplementer">
                </div>
                <div class="implementers">
                </div>
                <div class="addBtn">
                    <label for="addImplementer" class="add__implementer-label">
                       <img src="img/addImplementer.svg" alt="">
                    </label>
                    <input type="button" value="Добавить" id="addImplementer" class="add__implementer">
                </div>
                <div class="addBlock no__active">
                    <div class="group_select select type__group__edit group_select-add_implementer">
                            <div class="group_select__header" id='responsible_inp_add'>
                                <span class="group_select__current" id="group_select__current-edit">Группа ответственных</span>
                                <span class="type_select__arrow arrow">
                                    <img src="img/select-arrow.svg" alt="">
                                </span>
                            </div>
                            <div class="group_select__body scroll">
                                <div class="group_select__item-group sys__admin">ИКТ</div>
                                <div class="group_select__item-group electrician">АХЧ</div>
                            </div>
                            <input type="hidden" name="group_responsible" id='group_responsible'>
                    </div>
                    <input type="button" value="" id="addImplemOk" class="hover-btns">
                </div>
            </div>
        </div>
        <!-- Панель администратора -->
        <div class="box-admin">
            <div class="box-applications__window-shadow"></div>
            <div class="box-admin__applications__window-view scrollTop">
                    <div class="box-admin__header">
                        <div class="header__title">Панель администратора</div>
                        <div class="close-box">
                            <img src="img/closeRequest.svg" alt="" srcset="">
                        </div>

                    </div>
                    <div class="box-admin__menu">
                        <div class="menu__item" id='adm-menu__teacher'>
                            Преподаватели
                        </div>
                        <div class="menu__item" id='adm-menu__cabinet'>
                            Кабинеты
                        </div>
                        <div class="menu__item" id='adm-menu__responsible'>
                            Исполнители
                        </div>
                    </div>
                    <div class="box-admin__search">
                            <img class="box-admin__search_img" src="img/search-icon.svg" alt="">
                            <input class="box-admin__search__form" type="search" name="search" placeholder="Поиск..." id="admPanelSearch" autocomplete="off">
                            <input type="button" value="" class="search__clear admSearchClear">
                    </div>
                    <div class="box-admin__wrap_main">
                    <div class="box-admin__list_viewer">     
                    </div>
                    </div>
                    <div class="box-admin__btn-add">
                        <p>Добавить</p>
                    </div>
                    <div class="box-admin__btn-add-input">
                        <input id="admInpForm" type="form" placeholder="ФИО" class='admInpText' autocomplete="off">

                        <img id="admInpAgree" src="img/agreement.svg"  alt="" srcset="">
                        <img id="admInpClose"  src="img/closeRequest.svg"  alt="" srcset="">
                    </div>
            </div>   
                <div class="box-admin__responsibleAdd">
                   <div class="box-applications__admResponAdd__window-shadow"></div>
                   <div class="box-admin__responsibleAdd__window-view scrollTop">
                       <div class="box-admin__responsibleAdd__header">
                           <div class="responsibleAdd__header__title">Создание</div>
                                                   <div class="close-box" id='box-admin__close'>
                            <img src="img/closeRequest.svg" alt="" srcset="">
                        </div>
                       </div>
                       <div class="box-admin__responsibleAdd__main">
                                    <div class="responsibleAdd__main__form">
                                        <form action="">
                                            <div class="responsibleAdd__main__form__row">
                                                <input type="form" placeholder="ФИО" class="fromRespFio">

                                            </div>
                                            <div class="responsibleAdd__main__form__row">
                                                <div class="group_select select admInpGroupSelect">
                                                    <div class="group_select__header group_select__header-adm-pd hover-selection" id="group_select__header">
                                                    <span class="group_select__current groupAdmBtn" id="group_select__current">Группа</span>
                                                    <span class="type_select__arrow arrow admInpArrow">
                                                        <img src="img/select-arrow.svg" alt="">
                                                    </span>
                                                    </div>
                                                    <div class="group_select__body admInpGroupBody">
                                                    <div class="group_select__item">ИКТ</div>
                                                    <div class="group_select__item">АХЧ</div>
                                                    </div>
                                                </div>
                                                <div class="group_select select admInpRoleSelect">
                                                    <div class="group_select__header group_select__header-adm-pd hover-selection" id="group_select__header">
                                                    <span class="group_select__current groupAdmBtn roleAdmBtn" id="group_select__current">Роль</span>
                                                    <span class="type_select__arrow arrow admInpArrow">
                                                        <img src="img/select-arrow.svg" alt="">
                                                    </span>
                                                    </div>
                                                    <div class="group_select__body admInpGroupBody">
                                                    <div class="group_select__item">Администратор</div>
                                                    <div class="group_select__item">Ответственный</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="responsibleAdd__main__form__row">
                                                <input type="form" placeholder="Логин" class="fromRespLogin">
                                            </div>
                                            <div class="responsibleAdd__main__form__row">
                                                <input type="form" placeholder="Новый пароль" class="fromRespPassword">
                                            </div>
                                        </form>
                                    </div>
                       </div>
                       <div class="box-admin__responsibleAdd__footer">
                           <div class="box-admin__responsibleAdd__footer__save">Сохранить</div>
                       </div>
                   </div>
                </div>
        </div>
        <header>
            <div class="menu">
                <div class="adminPanel">
                </div>
                <div class="navigation">
                    <form  action='php/exit.php' method='post'>
                    <input id="logout" type="submit" value="">
                    <div class="alert__logout alert">Выйти из аккаунта</div>
                    </form>
                    <a href="" id="exit"></a>
                    <div class="alert__exit alert">Вернуться в навигатор</div>
                </div>
            </div>
        </header>
        <main>
            <div class="left_panel">
                <input type="button" value="Оставить заявку" class="leave_a_request hover-btns" id="btnRequest">
                <div class="filters">
                    <p>Фильтры</p>
                    <ul>
                        <li>
                            <div class="box-filter">
                                <input type="button" value="Дата создания" id="filters-btn-1">
                                <label for="filters-btn-1" class="label-filters-btn"></label>
                            </div> 
                            <div class="filter__edit filter__anim-1 filter__edit-no__acitve no__active" id="date__create">
                                <input type="date" value="" placeholder="Начало" class="filters-btn dateFilter" required>
                                <div class="filter__edit-strip">
                                </div>
                                <input type="date" value="" placeholder="Конец" class="filters-btn dateFilter" required>
                            </div>
                        </li>
                        <li>
                            <div class="box-filter">
                                <input type="button" value="Дата выполнения" id="filters-btn-2">
                                <label for="filters-btn-2" class="label-filters-btn"></label>
                            </div> 
                            <div class="filter__edit filter__anim-1 filter__edit-no__acitve no__active" id="date__complete" required>
                                <input type="date" value="" placeholder="Начало" class="filters-btn dateFilter">
                                <div class="filter__edit-strip">
                                </div>
                                <input type="date" value="" placeholder="Конец" class="filters-btn dateFilter" required>
                            </div>
                        </li>
                        <li>
                            <div class="box-filter">
                                <input type="button" value="Кем создано" id="filters-btn-3">
                                <label for="filters-btn-3" class="label-filters-btn"></label>
                            </div>
                            <div class="filter__edit filter__anim-1 filter__edit-no__acitve no__active" id="created__by__whom">
                                <input type="form" value="" placeholder="ФИО" class="filters-btn searchInpByWhomCr" autocomplete="off">
                            </div>
                        </li>
                        <li>
                            <div class="box-filter">
                                <input type="button" value="Исполнители" id="filters-btn-4">
                                <label for="filters-btn-4" class="label-filters-btn"></label>
                            </div>
                            <div class="filter__edit filter__anim-1 filter__edit-no__acitve no__active" id="complet__by__whom">
                                <input type="form" value="" placeholder="ФИО" class="filters-btn searchInpByWhomCp" autocomplete="off">
                            </div>
                        </li>
                        <li>
                            <div class="box-filter">
                                <input type="button" value="Кабинет" id="filters-btn-6">
                                <label for="filters-btn-6" class="label-filters-btn"></label>
                            </div>
                            <div class="filter__edit filter__anim-1 filter__edit-no__acitve no__active" id="cabinet">
                                <input type="form" value="" placeholder="Кабинет" class="filters-btn searchInpCab" autocomplete="off">
                            </div>
                        </li>
                        <li>
                            <div class="box-filter">
                                <input type="button" value="Статус" id="filters-btn-5">
                                <label for="filters-btn-5" class="label-filters-btn"></label>
                            </div>
                            <div class="filter__edit filter__anim-2 filter__edit-status filter__edit-no__acitve-status no__active filters-btn" id="status">
                                <input type="checkbox" value="" id="at__work" class="filters-btn-checkbox">
                                <label for="at__work" class="filter__status">
                                    <span>
                                    </span>
                                    <p>В работе</p>
                                </label>
                                <input type="checkbox" value="" id="for__consideration" class="filters-btn-checkbox">
                                <label for="for__consideration" class="filter__status">
                                    <span>
                                    </span>
                                    <p>На рассмотрении</p>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <input type="button" value="Сбросить фильтры" id="filters__reset" class="filters__reset hover-btns">
                </div>
            </div>
            <div class="block_applications">
                <div class="search">
                    <img class="search_img" src="img/material-symbols_search.svg" alt="">
                    <input class="search__form" type="search" name="search" placeholder="Поиск в заявках..." id="" autocomplete="off">
                    <input type="button" value="" class="search__clear" id="search__clear-req">
                </div>
                <div class="applications">
                    <div class="applications__choices-applications">
                        <div id="checkbox-box" class="applications__box-applications-application-choices-box">
                            <input id="checkbox__all" class="applications__box-applications-application-choices-checkbox" type="checkbox" value="">
                            <label for="checkbox__all" id="label__checkbox__all" class="applications__box-applications-application-choices-label-checkbox"></label>
                            <input type="button" value="" id="implementer" class="applications__choices-applications-application-choices-implementer">    
                            <input type="button" value="" id="trash" class="applications__choices-applications-application-choices-trash">    
                        </div>
                        <div class="applications__choices-applications__filter">
                            <div class="applications__choices-applications__filter-activates-box applications__choices-applications__filter-box">
                                <input id="btn__filter-1" class="applications__choices-applications__filter-activates btn__filters btn__filters__active" type="button" value="Активные">
                            </div>
                            <div class="applications__choices-applications__filter-important-box applications__choices-applications__filter-box">
                                <input id="btn__filter-2" class="applications__choices-applications__filter-important btn__filters hover-btnsF" type="button" value="Мои заявки">
                            </div>
                            <div class="applications__choices-applications__filter-archive-box applications__choices-applications__filter-box">
                                <input id="btn__filter-3" class="applications__choices-applications__filter-archive btn__filters hover-btnsF" type="button" value="Выполненные"> 
                            </div>
                        </div>
                    </div>
                    <div class="applications__box-applications">

                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <div class="footer"></div>
    <script src="js/jquery-3.6.3.min.js" defer></script>
    <script src="js/script.js" defer></script>
        <script>
            var userPermissions='<?= $_COOKIE['permissions'] ?>';
            var userName='<?= $_COOKIE['user'] ?>'; 
            var userRole = '<?= $_COOKIE['role'] ?>'
    </script>
</body>

</html>

