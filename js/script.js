var userAdmin = false;
var userImplementer = false;
var user = false;
if (userPermissions === "Администратор") {
  userAdmin = true;
} else if (userPermissions === "Ответственный") {
  userImplementer = true;
} else {
  user = true;
}

var statusFilterBtn = "active";
const toggleRequest = (status) => {
  const data = LoadReq(status);
  data.then((res) => {
    if (userAdmin) {
      Choice();
    }
    btnFilter();
    RequestOpenChange();
  });
};

const btnFilters = document.querySelectorAll(".btn__filters");
const checkboxBox = document.getElementById("checkbox-box");
const submitRequest = document.getElementById("submitRequest");
const submitRespond = document.getElementById("submitRespond");
const respond = document.getElementById("respond");
// Для пользователей

function UserSwitch() {
  const adminFilter = document.querySelectorAll(".admin-Filter");
  const adminPanel = document.querySelector(".adminPanel");
  const nav = document.querySelector(".menu");
  const otherEdit = document.getElementById("other-view");
  const reqEdit = document.getElementById("request-view-edit");
  const btnImp = document.querySelector(
    ".applications__choices-applications__filter-important-box"
  );
  const boxBtnFilt = document.querySelector(
    ".applications__choices-applications__filter"
  );
  const message = document.getElementById("message-view");
  boxBtnFilt.style.left = "144px";
  nav.style.justifyContent = "flex-end";
  adminPanel.remove();
  checkboxBox.remove();
  //Для исполнителей
  if (userPermissions === "Ответственный") {
    submitRespond.classList.add("no__active");
  } else {
    btnImp.remove();
    message.style.height = "350px";
    message.style.margin = "0";
    respond.remove();
    submitRespond.remove();
    otherEdit.remove();
    reqEdit.remove();
    adminFilter.forEach((filter) => {
      filter.remove();
    });
  }
}

//Функция выхода по клику в пустое место
function exitByClick(clickElement, closeElement, classElem, method) {
  document.addEventListener("click", (e) => {
    const click = e.composedPath().includes(clickElement);
    if (!click) {
      if (method == "remove") {
        closeElement.classList.remove(classElem);
      } else if (method == "add") {
        closeElement.classList.add(classElem);
      } else if (method == "toggle") {
        closeElement.classList.toggle(classElem);
      }
    }
  });
}

//Event

const alertRequest = document.querySelector(".alert-request");

function alertEvent(titleText, par, styleItem) {
  alertRequest.className = "alert-request";
  if (styleItem !== undefined) {
    alertRequest.classList.add(styleItem);
  }
  let h2 = alertRequest.querySelector("h2");
  let p = alertRequest.querySelector("p");
  h2.innerText = titleText;
  p.innerText = par;
  setTimeout(() => {
    alertRequest.classList.add("alert-request-anim");
  }, 100);
}

function alertVal(item) {
  item.forEach((el) => {
    el.classList.remove("error__validation");
    setTimeout(() => {
      el.classList.add("error__validation");
    }, 100);
  });
}

//Search

function searchJs(e, itemNoActive, itemSearch) {
  let searchFormValue = e.target.value;
  var tArr = [];
  var tTrueArr = [];
  itemSearch.forEach((element) => {
    tArr.push(element);
  });
  tArr
    .filter((element) =>
      element.innerText.toLowerCase().includes(searchFormValue.toLowerCase())
    )
    .forEach((element) => {
      tTrueArr.push(element);
    });

  let tTrueArrSet = new Set(tTrueArr);
  tArr
    .filter((element) => !tTrueArrSet.has(element))
    .forEach((element) => {
      element.closest(itemNoActive).classList.add("filter__active-7");
    });
  tArr
    .filter((element) => tTrueArrSet.has(element))
    .forEach((element) => {
      element.closest(itemNoActive).classList.remove("filter__active-7");
    });

  tArr.forEach((element) => {
    if (tTrueArr.length == tArr.length) {
      element.closest(itemNoActive).classList.remove("filter__active-7");
    }
  });
}

//Исполнители

const implementer = document.getElementById("implementer");
const boxImplementer = document.querySelector(
  ".box-applications__window-implementer"
);
const closeImplementer = document.getElementById("closeImplementer");
const addImplementer = document.getElementById("addImplementer");
const addBtn = document.querySelector(".addBtn");
const addBlock = document.querySelector(".addBlock");
const respAddInp = document.querySelector("#responsible_inp_add");
const addImplemOk = document.getElementById("addImplemOk");
let reqAll = document.querySelectorAll(
  ".applications__box-applications-application input"
);
let respTrash = document.querySelectorAll(".trash__implementer");

var reqEl;
//Отображение ответственных за заявки
const viewRespReq = async () => {
  reqAll = document.querySelectorAll(
    ".applications__box-applications-application input"
  );
  let el;
  reqAll.forEach((element) => {
    if (element.checked == true) {
      el = element;
    }
  });
  await $.ajax({
    url: "php/responsibleFind.php",
    type: "POST",
    dataType: "json",
    data: { id: reqEl },
  }).done((data) => {
    respTrash = document.querySelectorAll(".trash__implementer");
    const implementersList = document.querySelector(".implementers");
    implementersList.innerHTML = "";
    data.listResponsibles.forEach((element) => {
      let newItem = document.createElement("div");
      implementersList.prepend(newItem);
      newItem.outerHTML = `
  <div class="implementer">
    <p>${element.responsible}</p>
    <input type="button" value="" class="trash__implementer" tag="${element.id}">
  </div>`;
    });
  });
};

const impDel = () => {
  reqAll = document.querySelectorAll(
    ".applications__box-applications-application input"
  );
  const myPromise = new Promise((res, rej) => {
    res(viewRespReq());
  });
  boxImplementer.classList.add("active");
  myPromise.then(() => {
    //удаление ответственных
    respTrash = document.querySelectorAll(".trash__implementer");
    respTrash.forEach((element) => {
      element.addEventListener("click", (e) => {
        const trashId = e.target.getAttribute("tag");
        $.ajax({
          url: "php/responsibleDelete.php",
          type: "POST",
          dataType: "json",
          data: {
            id: trashId,
          },
        }).done((data) => {
          impDel();
          toggleRequest(statusFilterBtn);
          respTrash = document.querySelectorAll(".trash__implementer");
        });
      });
    });
  });
};
if (userAdmin) {
  implementer.addEventListener("click", () => {
    reqAll = document.querySelectorAll(
      ".applications__box-applications-application input"
    );

    reqAll.forEach((element) => {
      if (element.checked == true) {
        el = element;
      }
    });
    reqEl = el.parentNode.parentNode.id;
    impDel();
  });
}
//добавление ответственных ЧЕЕЕЕК
addImplemOk.addEventListener("click", () => {
  let itemImp = document.getElementById("group_select__current-edit");
  if (itemImp.innerText !== "Группа ответственных") {
    alertEvent("Сохранено", "Новое назначение");
  }
  $.ajax({
    url: "php/responsibleAdd.php",
    type: "POST",
    dataType: "json",
    data: {
      responsible: respAddInp.innerText,
      id: reqEl,
    },
  }).done((data) => {
    impDel();
    toggleRequest(statusFilterBtn);
  });
});
function replaceAddImp() {
  boxImplementer.classList.remove("active");
  addBtn.classList.remove("no__active");
  addBlock.classList.add("no__active");
}
closeImplementer.addEventListener("click", replaceAddImp);

addImplementer.addEventListener("click", () => {
  addBtn.classList.add("no__active");
  addBlock.classList.remove("no__active");
});

function listSort(list, element) {
  let arr = list.sort((a, b) => {
    if (a[element] > b[element]) {
      return -1;
    }
    if (a[element] < b[element]) {
      return 1;
    }
    return 0;
  });
  return arr;
}

//Подгрузка вып. списков
function selectInp(
  selectHeaderClass,
  selectItemClass,
  SelectCurrentClass,
  selectClass,
  selectBoolean
) {
  let selectHeader = document.querySelectorAll(selectHeaderClass);
  let selectItem = document.querySelectorAll(selectItemClass);

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });
  function selectToggle() {
    this.parentElement.classList.toggle("active");
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest(selectClass),
      currentText = select.querySelector(SelectCurrentClass);
    currentText.value = text;
    currentText.classList.add("font-black");
    select.classList.remove("active");
    if (selectBoolean == "isCabNumSelect") {
      isCabNumSelect = true;
    } else if (selectBoolean == "isNameSelect") {
      isNameSelect = true;
    }
  }
  const selectClose = document.querySelector(selectClass);
  document.addEventListener("click", (e) => {
    const click = e.composedPath().includes(selectClose);
    if (!click) {
      selectClose.classList.remove("active");
    }
  });
}
//Выпадающий список

function select(
  selectHeaderClass,
  selectItemClass,
  SelectCurrentClass,
  selectClass
) {
  let selectHeader = document.querySelectorAll(selectHeaderClass);
  let selectItem = document.querySelectorAll(selectItemClass);

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });
  function selectToggle() {
    this.parentElement.classList.toggle("active");
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest(selectClass),
      currentText = select.querySelector(SelectCurrentClass);
    currentText.innerText = text;
    currentText.classList.add("font-black");
    select.classList.remove("active");
  }
  const selectClose = document.querySelector(selectClass);
  document.addEventListener("click", (e) => {
    const click = e.composedPath().includes(selectClose);
    if (!click) {
      selectClose.classList.remove("active");
    }
  });
}
function listViewer(selectBody, Dataelement, type) {
  Dataelement.forEach((e) => {
    let newItem = document.createElement("div");
    selectBody.prepend(newItem);
    if ("cab" == type) {
      newItem.outerHTML = `
        <div class="type_select__item">${e.number}</div>
        `;
    } else if ("name" == type) {
      newItem.outerHTML = `
        <div class="name_select__item">${e.fio}</div>
        `;
    }
  });
}
$.ajax({
  url: "php/checklist.php",
  type: "POST",
  dataType: "json",
}).done((data) => {
  const sysAdmin = document.querySelectorAll(".sys__admin");
  const electrician = document.querySelectorAll(".electrician");
  data?.listResponsibles?.forEach((e) => {
    for (let i = 0; i < sysAdmin.length; i++) {
      let item = document.createElement("div");

      if (e.specialization === "ИКТ") {
        sysAdmin[i].after(item);
      } else if (e.specialization === "АХЧ") {
        electrician[i].after(item);
      }
      item.outerHTML = `<div class="group_select__item group_select__item-edit">${e.fio}</div>`;
    }
  });
  const nameSelectBody = document.querySelector("#name_select__body");
  const typeSelectBody = document.querySelector("#type_select__body");
  const typeSelectBodyEdit = document.querySelector("#type_select__body-edit");

  select(
    ".group_select__header",
    ".group_select__item",
    ".group_select__current",
    ".group_select"
  );

  listViewer(nameSelectBody, listSort(data.listTeacher, "fio"), "name");
  listViewer(typeSelectBody, listSort(data.listCab, "number"), "cab");
  if (userAdmin || userImplementer) {
    listViewer(typeSelectBodyEdit, listSort(data.listCab, "number"), "cab");
  }
  selectInp(
    ".name_select__header",
    ".name_select__item",
    ".name_select__current",
    ".name_select",
    "isNameSelect"
  );

  selectInp(
    ".type_select__header",
    ".type_select__item",
    ".type_select__current",
    ".type_select",
    "isCabNumSelect"
  );
  function compareVal(data, sources, selectBoolean, e) {
    let text = e.target.value;
    data.forEach((element) => {
      if (element[sources].toLowerCase() === text.toLowerCase()) {
        if (selectBoolean == "isCabNumSelect") {
          isCabNumSelect = true;
        } else if (selectBoolean == "isNameSelect") {
          isNameSelect = true;
        }
      } else {
        if (selectBoolean == "isCabNumSelect") {
          isCabNumSelect = false;
        } else if (selectBoolean == "isNameSelect") {
          isNameSelect = false;
        }
      }
    });
  }
  let name = document.getElementById("source");
  let cab = document.getElementById("type_select__current");

  name.addEventListener("input", (e) => {
    compareVal(data.listTeacher, "fio", "isNameSelect", e);
  });
  cab.addEventListener("input", (e) => {
    compareVal(data.listCab, "number", "isCabNumSelect", e);
  });

  function selectFilter() {
    let i = data.listTeacher.length - 1;
    let j = data.listCab.length - 1;

    let nameSelectCurrent = document.querySelector(".name_select__current");
    let typeSelectCurrent = document.querySelector(".type_select__current");
    let nameSelectItem = document.querySelectorAll(".name_select__item");
    let typeSelectItem = document.querySelectorAll(".type_select__item");
    let nameSelectCurrentValue = nameSelectCurrent.value.toLowerCase().trim();
    let typeSelectCurrentValue = typeSelectCurrent.value.toLowerCase().trim();

    function FilterSel(searchValue, name, item, count) {
      let index = false;
      let length = 0;
      let arr = name.toLowerCase().trim().split(" ");
      let arrValue = searchValue.split(" ");
      arr.filter((e) => {
        if (e.slice(0, searchValue.length) !== arrValue[0] && index == false) {
          length = length + e.length + 1;
        } else if (e.slice(0, searchValue.length) == arrValue[0]) {
          index = true;
        }
      });
      nameLiken = name
        .slice(length)
        .slice(0, searchValue.length)
        .toLowerCase()
        .trim();
      if (searchValue !== nameLiken && searchValue !== "") {
        item[count].classList.add(`no__active`);
      } else if (searchValue == "") {
        item[count].classList.remove(`no__active`);
      } else if (searchValue == nameLiken && searchValue !== "") {
        item[count].classList.remove(`no__active`);
      }
      if (count == i) {
        i--;
      } else if (count == j) {
        j--;
      }
    }
    data.listTeacher.forEach((e) => {
      FilterSel(nameSelectCurrentValue, e.fio, nameSelectItem, i);
    });
    data.listCab.forEach((e) => {
      FilterSel(typeSelectCurrentValue, e.number, typeSelectItem, j);
    });
  }
  let nameSelectCurrent = document.querySelector(".name_select__current");
  let typeSelectCurrent = document.querySelector(".type_select__current");
  let selectFiltersN = null;
  let selectFiltersC = null;
  nameSelectCurrent.addEventListener("click", () => {
    selectFiltersN = setInterval(selectFilter, 1);
  });
  typeSelectCurrent.addEventListener("click", () => {
    selectFiltersC = setInterval(selectFilter, 1);
  });
  document.addEventListener("click", (e) => {
    const clickFirst = e.composedPath().includes(nameSelectCurrent);
    const clickSecond = e.composedPath().includes(typeSelectCurrent);
    if (!clickFirst && !clickSecond) {
      clearInterval(selectFiltersN);
      clearInterval(selectFiltersC);
    }
  });
});
// Deadline
var deadLine = document.querySelector("#date-deadLine");
const deadLineLabel = document.querySelector(".date-deadLine-box-label");
deadLine.addEventListener("click", () => {
  deadLineLabel.classList.add("no__active");
});
document.addEventListener("click", (e) => {
  const click = e.composedPath().includes(deadLine);
  if (!click && deadLine.value === "") {
    deadLineLabel.classList.remove("no__active");
  }
});
deadLine.addEventListener("change", () => {
  if (deadLine.value != "") {
    deadLine.classList.add("font-black");
    isDeadlineSelect = true;
  } else if (deadLine.value == "") {
    deadLine.classList.remove("font-black");
    isDeadlineSelect = false;
  }
  let dateNow = new Date();
  let dateNowDay = dateNow.getDate();
  let dateDeadLine = new Date(deadLine.value);
  if (dateDeadLine <= dateNow) {
    deadLine.value = deadLine.value.slice(0, -2) + dateNowDay;
  }
});

function compareSwitch(method) {
  let checkbox = document.querySelectorAll(
    ".applications__box-applications-application-choice-label-checkbox-div"
  );
  let text = document.querySelectorAll(
    ".applications__box-applications-application-text"
  );
  let i = 0;
  checkbox.forEach((element) => {
    if (method === "add") {
      element.classList.remove("no__active");
      text[i].classList.remove(
        "applications__box-applications-application-text-comp"
      );
    } else if (method === "remove") {
      element.classList.add("no__active");
      text[i].classList.add(
        "applications__box-applications-application-text-comp"
      );
    }
    i++;
  });
}

//Загрузка заявок
const reqBox = document.querySelector(".applications__box-applications");

let LoadReq = async (btnAct) => {
  let promise = await $.ajax({
    url: "php/findingReq.php",
    type: "POST",
    dataType: "json",
    success: function (dataError) {
      reqBox.innerHTML = "";
      let dateNow = new Date();
      let data;
      if (userPermissions === "Ответственный") {
        data = dataError.filter(
          (element) => element.groupResponible === userRole
        );
      } else {
        data = dataError;
      }

      let i = data.length - 1;
      data.forEach((element, index) => {
        let dateDeadLine = new Date(element.deadline);
        let deadLine = 0;
        let respArr = [];
        element.listResponsibles.forEach((el) => {
          respArr.push(`<p>${el.responsible}</p>`);
        });

        if (respArr.length === 0) {
          respArr = `<p>Не назначено</p>`;
        } else {
          respArr = respArr.toString().replaceAll(",", " ");
        }

        //Отображение ответсвенных за заявки
        if (element.status === "Выполнена") {
          infoReq = `
          <div class="info__req">
            <div class="info_date">
                <h2>Дата создания</h2>
                <p class="dtCr">${element.dateOfCreation}</p>
                <h2>Дата выполнения</h2>
                <p class="dtCp">${element.dateCompletion}</p>
            </div>
            <div class="info_implemeneter">
                <h2>Отвественные</h2>
                ${respArr}
            </div>
          </div>`;
        } else {
          infoReq = `
          <div class="info__req">
            <div class="info_date">
                <h2>Дата создания</h2>
                <p class="dtCr">${element.dateOfCreation}</p>
            </div>
            <div class="info_implemeneter">
                <h2>Отвественные</h2>
                ${respArr}
            </div>
          </div>`;
        }

        let Fname = element.source;
        let FnameArr = Fname.split(" ");
        for (let i = 1; i < FnameArr.length; i++) {
          FnameArr[i] = FnameArr[i].slice(0, 1) + ".";
        }
        Fname = FnameArr.join().replaceAll(",", " ");

        deadLine =
          Math.round((dateDeadLine - dateNow) / 1000 / 60 / 60 / 24) + 1;
        let itemDeadline;
        if (deadLine > 1) {
          itemDeadline = `<h3 class="date__deadline title__info_h3 margin_null">Осталось дней: ${deadLine}</h3>`;
        } else if (deadLine < 0) {
          itemDeadline = `<h3 class="date__deadline title__info_h3 margin_null alert__deadline">Заявка просрочена</h3>`;
        } else {
          itemDeadline = `<h3 class="date__deadline title__info_h3 margin_null alert__deadline">Осталось дней: ${deadLine}</h3>
          `;
        }
        let dateDeadline = `
        <div class="date">
          ${itemDeadline}
        </div>`;
        if (element.status === "Выполнена") {
          dateDeadline = "";
        }
        let choiceBox = `
        <div class="applications__box-applications-application-choice-label-checkbox-div">
          <input id="checkbox__choice-${i}" class="applications__box-applications-application-choice-checkbox checkbox__choice" type="checkbox" value="">
          <label for="checkbox__choice-${i}" id='${element.id}'  class="applications__box-applications-application-choice-label-checkbox label__checkbox__choice">
          </label>
        </div>`;
        let paddingTextClass = "";
        if (!userAdmin) {
          choiceBox = "";
          paddingTextClass = `applications__box-applications-application-text-comp`;
        }
        let addReqBox = document.createElement("div");
        reqBox.prepend(addReqBox);
        let groupResponible = data[index].groupResponible;
        if (groupResponible === "Группа ответственных") {
          groupResponible = "Нет";
        }
        let label = `
          <div class="applications__box-applications-application-label">
            <p>${groupResponible}</p>
          </div>
        `;
        addReqBox.outerHTML = `
          <div class="applications__box-applications-application no__active" id='${element.id}'>
          ${choiceBox}
          ${label}
          <div class="applications__box-applications-application-text ${paddingTextClass}" id='${element.id}'>
            <div class="applications__box-applications-application-text-info">
              <h2 class="title">${element.title}</h2>
              <p>${element.main_text}</p>
            </div>
              <div class="title__info">
                <div class="t__and__c">
                  <h3 class="title__info_h3">
                  ${Fname}
                  </h3>
                  <h3 class="title__info_h3 margin_null">
                    Кабинет: ${element.cabinet}
                  </h3>
                </div>
                ${dateDeadline}
              </div>
          </div>
          ${infoReq}
        </div>


`;
        i--;
      });
      let req = document.querySelectorAll(
        ".applications__box-applications-application"
      );
      for (let i = 0; i < data.length; i++) {
        if (statusFilterBtn === "completed" && data[i].status === "Выполнена") {
          req[data.length - 1 - i].classList.remove("no__active");
        } else if (
          statusFilterBtn === "active" &&
          data[i].status !== "Выполнена"
        ) {
          req[data.length - 1 - i].classList.remove("no__active");
        }
      }
      let btnFilters = document.querySelectorAll(".btn__filters");
      btnFilters.forEach((element) => {
        element.addEventListener("click", () => {
          var impArr = [];
          let arrListRes = [];
          data.forEach((element) => {
            arrListRes.push(element.listResponsibles);
          });
          let arr = [];
          arrListRes.forEach((element) => {
            arr = element;
            for (let i = 0; i < element.length; i++) {
              if (arr[i].responsible !== undefined) {
                element[i] = arr[i].responsible;
              }
            }
            let string = element.join();
            impArr.push(string);
          });
          for (let i = 0; i < data.length; i++) {
            req[data.length - 1 - i].classList.add("no__active");
            if (
              statusFilterBtn === "completed" &&
              data[i].status === "Выполнена"
            ) {
              compareSwitch("remove");
              req[data.length - 1 - i].classList.remove("no__active");
            } else if (
              statusFilterBtn === "active" &&
              data[i].status !== "Выполнена"
            ) {
              compareSwitch("add");

              req[data.length - 1 - i].classList.remove("no__active");
            } else if (
              statusFilterBtn === "my-request" &&
              data[i].status !== "Выполнена" &&
              impArr[i].includes(data[0].user)
            ) {
              compareSwitch("remove");
              req[data.length - 1 - i].classList.remove("no__active");
            }
          }
        });
      });

      //Поиск
      const search = document.querySelector(".search");
      const searchForm = document.querySelector(".search__form");
      const searchClear = document.querySelector("#search__clear-req");
      const title = document.querySelectorAll(".title");

      //Функиционал

      //Анимация

      searchForm.addEventListener("click", () => {
        search.classList.add("search__form-active");
      });
      searchForm.addEventListener("input", (e) => {
        searchJs(e, ".applications__box-applications-application", title);
      });
      exitByClick(search, search, "search__form-active", "remove");

      searchClear.addEventListener("click", (e) => {
        search.classList.remove("search__form-active");
        searchForm.value = "";
        searchJs(e, ".applications__box-applications-application", title);
      });

      searchForm.addEventListener("change", (e) => {
        e.preventDefault();
        return false;
      });
    },
  });
  function mousePosition() {
    let req = document.querySelectorAll(
      ".applications__box-applications-application"
    );
    let i = req.length - 1;
    req.forEach(() => {
      const infoReq = document.querySelectorAll(".info__req");
      let j = i;
      var time = 0;
      var timer = null;
      req[i].addEventListener("mouseover", (event) => {
        infoReq[j].style.left = `${event.pageX + 10}px`;
        infoReq[j].style.top = `${event.pageY}px`;
        timer = setInterval(() => {
          if (time <= 0) {
            infoReq[j].classList.add("active");
            clearInterval(timer);
          } else {
            time -= 1;
          }
        }, 1000);
      });
      req[i].addEventListener("mouseout", () => {
        clearInterval(timer);
        infoReq[j].classList.remove("active");
      });
      i--;
    });
  }
  mousePosition();
  return promise;
};

//Заявка
const btnApplicationActive = document.getElementById("btnRequest");
const request = document.getElementById("request");
const closeRequest = document.querySelector(".close__request");
const requestWindow = document.querySelector(".applications__window");

const scrollTop = document.querySelectorAll(".scrollTop");

function scrollT() {
  scrollTop.forEach((el) => {
    el.scrollTop = 0;
  });
}

var isCabNumSelect = false;
var isNameSelect = false;
var isDeadlineSelect = false;
var isTitleSelect = false;

//Валидация

const validationBtn = document.querySelectorAll(".val_null");
const validationInp = document.querySelectorAll(".val_null__inp");
const validationSelectType = document.getElementById("type_select__current");
const validationSelectGroup = document.getElementById("group_select__current");
const typeSelectHeader = document.querySelectorAll(".type_select__header");
const nameSelectHeader = document.querySelectorAll(".name_select__header");
const titleSelectHeader = document.querySelectorAll(".title_select__header");
const deadlineSelectHeader = document.querySelectorAll(
  ".deadline_select__header"
);
const messange = document.getElementById("messange");
var typeInnerText = validationSelectType.innerText;
var groupInnerText = validationSelectGroup.innerText;

btnApplicationActive.addEventListener("click", function () {
  request.classList.add("active");
});
function targetSubmitReq() {
  const title = document.getElementById("title");
  isTitleSelect = title.value.trim() !== "" ? true : false;
  if (
    isCabNumSelect === true &&
    isNameSelect === true &&
    isDeadlineSelect === true &&
    isTitleSelect === true
  ) {
    const groupeResponibleInp = document.querySelector(
      ".group_select__current"
    );
    const groupResponsible = groupeResponibleInp.innerHTML;
    const form = document.querySelector(".applications__window-form");
    let data = new FormData(form);
    data.append("groupResponsible", groupResponsible);
    $.ajax({
      url: "php/reg_req.php",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
    }).done(() => {
      statusFilterBtn = "active";
      toggleRequest(statusFilterBtn);
      checkboxBox.classList.remove("no__active");
      btnFilters.forEach((element) => {
        if (element.id === "btn__filter-1") {
          element.classList.add("btn__filters__active");
        } else {
          element.classList.remove("btn__filters__active");
        }
      });
    });
    request.classList.remove("active");
    alertEvent("Отправлено", "Ваша заявка отправлена");
    isCabNumSelect = false;
    isNameSelect = false;
    isDeadlineSelect = false;
    isTitleSelect = false;
    deadLine.classList.remove("font-black");
    validationBtn.forEach((el) => {
      el.value = "";
    });
    validationInp.forEach((el) => {
      el.value = "";
    });
    validationSelectType.innerText = typeInnerText;
    validationSelectGroup.innerText = groupInnerText;
    validationSelectGroup.classList.remove("font-black");
    const createEdit = document.querySelectorAll(".create__file");
    createEdit.forEach((el) => {
      el.remove();
    });
    messange.value = "";
    let addFileBox = document.createElement("div");
    addFileBlock.append(addFileBox);
    addFileBox.outerHTML = `
          <div class="insert__img add__insert__img create__file">
              <input id="add__file-${idFile}" class="add__file" type="file" name="file[]" onchange="uploadFiles()">
              <div id="file__preview-${idFile}" class="file__preview">
                  <label for="add__file-${idFile}">
                      <span>
                          <div>
                              <img src="img/addFile.svg" alt="">
                          </div>
                          <p>Добавить<br>файл</p>
                      </span>
                  </label>
              </div>
          </div>`;
    scrollT();
  } else {
    scrollT();
    alertEvent("Ошибка!", "Проверьте правильность ввода данных", "error");
    if (isCabNumSelect === false) {
      alertVal(typeSelectHeader);
    }
    if (isNameSelect === false) {
      alertVal(nameSelectHeader);
    }
    if (isDeadlineSelect === false) {
      alertVal(deadlineSelectHeader);
    }
    if (isTitleSelect === false) {
      alertVal(titleSelectHeader);
    }
  }
}

submitRequest.addEventListener("click", targetSubmitReq);

closeRequest.addEventListener("click", function () {
  scrollT();
  request.classList.remove("active");
});
//Архив заявка

const requestViewArchiv = document.getElementById("request-view-archiv");
const closeRequestViewArchiv = document.getElementById(
  "close__request-view-archiv"
);
const toArchive = document.querySelector("#submitRespond");

closeRequestViewArchiv.addEventListener("click", () => {
  scrollT();
  requestViewArchiv.classList.remove("active");
});
//Отправление в архив
function archiveFunc() {
  scrollT();
  requestView.classList.remove("active");
  let tagId;
  if (userPermissions === "Ответственный") {
    tagId = respond.getAttribute("tag");
  } else {
    tagId = requestViewEdit.getAttribute("tag");
  }
  $.ajax({
    url: "php/archiveAdd.php",
    type: "POST",
    dataType: "json",
    data: { id: tagId },
  }).done(() => {
    toggleRequest(statusFilterBtn);
  });
}

//Уведомление и подтверждение
const editAlertBtn = document.querySelector(".edit");
const deleteAlertBtn = document.querySelector(".delete");
const deleteInEditAlertBtn = document.querySelector(".delete-in__edit");

const editDeleteAlert = document.querySelector(".edit-delete__alert");
const editSaveAlert = document.querySelector(".edit-save__alert");
const editCancelSaveAlert = document.querySelector(".edit-cancel__save__alert");
const archiveAlert = document.querySelector(".archive__alert");

const alertRequestWindow = document.querySelector(".alert__request-window");

const submitSave = document.getElementById("submitSave");

const saveBtnYes = document.getElementById("saveBtnYes");
const saveBtnNo = document.getElementById("saveBtnNo");
const deleteBtnYes = document.getElementById("deleteBtnYes");
const deleteBtnNo = document.getElementById("deleteBtnNo");
const cancelSaveBtnYes = document.getElementById("cancelSaveBtnYes");
const cancelSaveBtnNo = document.getElementById("cancelSaveBtnNo");

const archiveBtnYes = document.getElementById("archiveBtnYes");
const archiveBtnNo = document.getElementById("archiveBtnNo");

const respondBWindow = document.querySelector(".respond__alert");
const respondBtnYes = document.getElementById("respondBtnYes");
const respondBtnNo = document.getElementById("respondBtnNo");

function confirmation(elConfi, method) {
  if (method == "remove") {
    elConfi.classList.remove("active");
    alertRequestWindow.classList.remove("active");
  } else if (method == "add") {
    elConfi.classList.add("active");
    alertRequestWindow.classList.add("active");
  } else if (method == "toggle") {
    elConfi.classList.toggle("active");
    alertRequestWindow.classList.toggle("active");
  }
}

function deleted(status) {
  $.ajax({
    url: "php/trash.php",
    type: "POST",
    dataType: "json",
    data: { id: requestViewEdit.getAttribute("tag") },
  }).done(() => {
    toggleRequest(statusFilterBtn);
  });
  requestView.classList.remove("active");
  requestViewEdit.classList.remove("active");
  confirmation(editDeleteAlert, "toggle");
  alertEvent("Удалено", "Заявка удалена", "error");
}

var countValidationEdit = 0;
const validationBtnedit = document.querySelectorAll(".validationBtnedit");
const validationSelectTypeEdit = document.getElementById(
  "type_select__current-edit"
);
const validationSelectGroupEdit = document.getElementById(
  "group_select__current-edit"
);

const requestEditTitle = document.querySelector("#request_edit_title");
const dateDeadLine = document.querySelector(".deadline_edit_inp-edit");
function save() {
  let date = dateDeadLine.value.replaceAll("-", ",");
  let dateNow = new Date();
  dateNow = dateNow.setHours(0, 0, 0, 0);
  const dateDeadLineVal = new Date(date);
  validationBtnedit.forEach((el) => {
    if (el.value.trim() !== "") {
      countValidationEdit++;
    }
  });
  if (
    countValidationEdit == validationBtnedit.length &&
    dateDeadLineVal >= dateNow
  ) {
    scrollT();
    countValidationEdit = 0;
    request.classList.remove("active");
    alertEvent("Отправлено", "Ваша заявка отправлена");
    requestView.classList.remove("active");
    requestViewEdit.classList.remove("active");
    confirmation(editSaveAlert, "toggle");
    alertEvent("Сохранено", "Ваши изменения в заявке сохранены");
    //Сохранение заявок
    const formEdit = document.querySelector("#form_edit_data");
    const groupeEditSave = document.querySelector(
      "#group_select__current-edit"
    ).innerHTML;
    let data = new FormData(formEdit);
    data.append("id", requestViewEdit.getAttribute("tag"));
    data.append("groupeSelectEdit", groupeEditSave);
    for (let i = 0; i < trashFileArr.length; i++) {
      data.append("fileDel[]", trashFileArr[i]);
    }
    $.ajax({
      url: "php/reg_req.php",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
    }).done(() => {
      trashFileArr = [];
      toggleRequest(statusFilterBtn);
    });
  } else {
    scrollT();
    countValidationEdit = 0;
    alertEvent("Ошибка!", "Проверьте правильность ввода данных", "error");
    confirmation(editSaveAlert, "toggle");
    deadlineEdit.classList.remove("error__validation");
    setTimeout(() => {
      deadlineEdit.classList.add("error__validation");
    }, 1);
  }
}

toArchive.addEventListener("click", () => {
  confirmation(archiveAlert, "toggle");
});

archiveBtnYes.addEventListener("click", () => {
  confirmation(archiveAlert, "toggle");
  requestView.classList.remove("active");
  archiveFunc();
});

archiveBtnNo.addEventListener("click", () => {
  confirmation(archiveAlert, "toggle");
});

deleteInEditAlertBtn.addEventListener("click", () => {
  confirmation(editDeleteAlert, "toggle");
});
submitSave.addEventListener("click", () => {
  confirmation(editSaveAlert, "toggle");
});
deleteAlertBtn.addEventListener("click", () => {
  confirmation(editDeleteAlert, "toggle");
});

deleteBtnNo.addEventListener("click", () => {
  confirmation(editDeleteAlert, "toggle");
});
deleteBtnYes.addEventListener("click", deleted);

saveBtnNo.addEventListener("click", () => {
  confirmation(editSaveAlert, "toggle");
});
saveBtnYes.addEventListener("click", save);

cancelSaveBtnNo.addEventListener("click", () => {
  confirmation(editCancelSaveAlert, "toggle");
});
cancelSaveBtnYes.addEventListener("click", () => {
  scrollT();
  confirmation(editCancelSaveAlert, "toggle");
  requestViewEdit.classList.remove("active");
});

// откликнуться!!!
respond.addEventListener("click", () => {
  confirmation(respondBWindow, "toggle");
});

respondBtnYes.addEventListener("click", () => {
  confirmation(respondBWindow, "toggle");
  $.ajax({
    url: "php/responsibleAdd.php",
    type: "POST",
    dataType: "json",
    data: { id: respond.getAttribute("tag"), responsible: userName },
  })
    .done(() => {
      requestView.classList.remove("active");
      scrollT();
      alertEvent("Вы приняли заявку", "");
      toggleRequest(statusFilterBtn);
    })
    .fail(() => {
      alertEvent("Вы уже приняли заявку", "", "error");
    });
});
respondBtnNo.addEventListener("click", () => {
  confirmation(respondBWindow, "toggle");
});

//Выбранная заявка
var dataReqType;

let RequestOpenChange = function () {
  const archiveReq = document.querySelector("#request-view-archiv");
  const source = document.querySelector(".inp_source_active");
  const title = document.querySelector(
    ".applications__window-request-view-text"
  );
  const cabinet = document.querySelector(".inp_cabinet_active");
  const deadlineView = document.querySelector("#deadline__current-view");

  const message = document.querySelector("#message-view");
  const btnOpenRequest = document.querySelectorAll(
    ".applications__box-applications-application-text"
  );
  const OpenViewRequest = document.querySelector("#request-view");
  const idReqEdit = document.querySelector("#request-view-edit");
  btnOpenRequest.forEach((el) => {
    el.addEventListener("click", function () {
      $.ajax({
        url: "php/active_req.php",
        type: "POST",
        dataType: "json",
        data: { id: el.id, user: userName },
        success: function (data) {
          if (data.status == "Выполнена") {
            let insertBox = document.querySelector("#insert__img-box-arh");
            const sourceArh = document.querySelector("#request_archive_source");
            const titleArh = document.querySelector("#request_archive_title");
            const dataArh = document.querySelector(".inp_data_arh");
            const cabinetArh = document.querySelector(
              "#request_archive_cabinet"
            );
            const messageArh = document.querySelector("#message-view-archiv");
            sourceArh.value = data.source;
            titleArh.value = data.title;
            cabinetArh.value = data.cabinet;
            messageArh.value = data.message;
            dataArh.value = data.dataCreate;
            if (data.fileArr.length != 0) {
              insertBox.innerHTML = "";
              data.fileArr.forEach((element) => {
                let addReqBox = document.createElement("div");
                insertBox.append(addReqBox);
                let i = 0;
                if (
                  element.extension == "png" ||
                  element.extension == "jpeg" ||
                  element.extension == "jpg"
                ) {
                  addReqBox.outerHTML = `
                  <div class="insert__img add__insert__img">
                  <input id="add__file-view-${i}" class="add__file" type="file" name="file[]" value="" onchange="uploadFiles()">
                  <a href='${"uploads/" + element.path}' download="" >
                  <div id="file__preview-view-${i}" class="file__preview">
                      <img src="${"uploads/" + element.path}" alt="Фото">
                  </div>
                  </a>
              </div>
                  `;
                  const file_no = document.querySelector(
                    "#insert__img-box-view"
                  );
                  file_no.className = "insert__img-box";
                } else {
                  addReqBox.outerHTML = `
                <div class="insert__img add__insert__img">
                <input id="add__file-view-${i}" class="add__file" type="file" name="file[]" value="" onchange="uploadFiles()">
                <div id="file__preview-view-${i}" class="file__preview">
                  <div class="file">
                    <a href="${
                      "uploads/" + element.path
                    }" download="" class="fileDownload_active">
                        <span>
                            <img src="img/iconFile.svg" alt="">
                            <p>${element.fileName}</p>
                        </span>
                        </a>
                    </div>
                 </div>
                </div>`;
                  i++;
                }
              });
            } else {
              insertBox.innerHTML = "";
              let addReqBox = document.createElement("div");
              insertBox.append(addReqBox);
              addReqBox.outerHTML = `
                    <img src="img/sadFile.svg" alt="">
                    <p>Файлы отсутствуют</p>
              `;
              const file_no = document.querySelector("#insert__img-box-arh");
              file_no.className = "no__files";
            }
          } else {
            let insertBox = document.querySelector("#insert__img-box-view");
            source.value = data.source;
            title.innerText = data.title;
            cabinet.value = data.cabinet;
            type_request.value = data.type_request;
            message.value = data.message;
            deadlineView.value = data.deadline;
            respond.setAttribute("tag", data.id_req);
            if (data.fileArr.length != 0) {
              insertBox.innerHTML = "";
              data.fileArr.forEach((element) => {
                let addReqBox = document.createElement("div");
                insertBox.append(addReqBox);
                let i = 0;
                if (
                  element.extension == "png" ||
                  element.extension == "jpeg" ||
                  element.extension == "jpg"
                ) {
                  addReqBox.outerHTML = `
                  <div class="insert__img add__insert__img">
                  <input id="add__file-view-${i}" class="add__file" type="file" name="file[]" value="" onchange="uploadFiles()">
                  <a href='${"uploads/" + element.path}' download="" >
                  <div id="file__preview-view-${i}" class="file__preview">
                      <img src="${"uploads/" + element.path}" alt="Фото">
                  </div>
                  </a>
              </div>
                  `;
                  const file_no = document.querySelector(
                    "#insert__img-box-view"
                  );
                  file_no.className = "insert__img-box";
                } else {
                  addReqBox.outerHTML = `
                <div class="insert__img add__insert__img">
                <input id="add__file-view-${i}" class="add__file" type="file" name="file[]" value="" onchange="uploadFiles()">
                <div id="file__preview-view-${i}" class="file__preview">
                  <div class="file">
                    <a href="${
                      "uploads/" + element.path
                    }" download="" class="fileDownload_active">
                        <span>
                            <img src="img/iconFile.svg" alt="">
                            <p>${element.fileName}</p>
                        </span>
                        </a>
                    </div>
                 </div>
                </div>`;
                  i++;
                }
              });
            } else {
              insertBox.innerHTML = "";
              let addReqBox = document.createElement("div");
              insertBox.append(addReqBox);
              addReqBox.outerHTML = `
                    <img src="img/sadFile.svg" alt="">
                    <p>Файлы отсутствуют</p>
              `;
              const file_no = document.querySelector("#insert__img-box-view");
              file_no.className = "no__files";
            }
            if (userImplementer) {
              if (data.userActiveReq) {
                submitRespond.classList.remove("no__active");
                respond.classList.add("no__active");
              } else {
                submitRespond.classList.add("no__active");
                respond.classList.remove("no__active");
              }
            }
          }
          if (userAdmin || userImplementer) {
            idReqEdit.setAttribute("tag", el.id);
          }
          return (dataReqType = data.status);
        },
      }).done(() => {
        if (dataReqType == "Выполнена") {
          archiveReq.classList.add("active");
          openRequestChange = true;
        } else {
          OpenViewRequest.classList.add("active");
          openRequestChange = true;
        }
      });
    });
  });
};

const closeRequestView = document.getElementById("close__request-view");
const requestView = document.getElementById("request-view");

closeRequestView.addEventListener("click", () => {
  scrollT();
  requestView.classList.remove("active");
});

//Редактирование заявок

const source = document.querySelectorAll(".inp_source_active");
const title = document.querySelector("#request_edit_title");
const cabinet = document.querySelector(".cabinet_inp_edit");
const deadlineEdit = document.querySelector(".deadline_edit_inp-edit");
const message = document.querySelector("#message-view-edit");
const fieldEdit = document.querySelector(".field__edit");
const otherViewRequestView = document.querySelector("#other-view");
const edit = document.querySelector(".edit");
const requestViewEdit = document.getElementById("request-view-edit");
const closeRequestEdit = document.getElementById("close__request-edit");
if (userAdmin || userImplementer) {
  var trashFileArr = [];
  otherViewRequestView.addEventListener("click", () => {
    fieldEdit.classList.toggle("no__active");
  });

  edit.addEventListener("click", () => {
    requestView.classList.remove("active");
    requestViewEdit.classList.add("active");
    $.ajax({
      url: "php/active_req.php",
      type: "POST",
      dataType: "json",
      data: { id: requestViewEdit.getAttribute("tag") },
      success: function (data) {
        source[1].value = data.source;
        title.value = data.title;
        cabinet.value = data.cabinet;
        deadlineEdit.value = data.deadline;
        message.value = data.message;
        const insertBox = document.querySelector("#insert__img-box-edit");
        if (data.fileArr.length != 0) {
          const insertBox = document.querySelector("#insert__img-box-edit");
          insertBox.innerHTML = "";
          data.fileArr.forEach((element) => {
            let addReqBox = document.createElement("div");
            const insertBox = document.querySelector("#insert__img-box-edit");
            insertBox.append(addReqBox);
            let i = 0;
            if (
              element.extension == "png" ||
              element.extension == "jpeg" ||
              element.extension == "jpg"
            ) {
              addReqBox.outerHTML = `
              <div class="insert__img add__insert__img create__file-edit">
              <input id="add__file-view-${i}" class="add__file" type="file" name="file[]" value="" onchange="uploadFiles()">
              <div id="file__preview-view-${i}" class="file__preview">
                  <img class="file__img" src="${
                    "uploads/" + element.path
                  }" alt="Фото">
                  <input type="button" class="remove__file-btn-InEdit" id="${
                    element.id
                  }">
              </div>
            </div>
              `;
              const file_no = document.querySelector("#insert__img-box-edit");
              file_no.className = "insert__img-box";
            } else {
              addReqBox.outerHTML = `
            <div class="insert__img add__insert__img create__file-edit">
            <input id="add__file-view-${i}" class="add__file" type="file" name="file[]" value="" onchange="uploadFiles()">
            <div id="file__preview-view-${i}" class="file__preview">
              <div class="file">
                <a href="${
                  "uploads/" + element.path
                }" class="fileDownload_active">
                    <span>
                        <img src="img/iconFile.svg" alt="">
                        <p>${element.fileName}</p>
                    </span>
                    </a>
                    <input type="button" class="remove__file-btn-InEdit" id="${
                      element.id
                    }">
                </div>
             </div>
            </div>`;

              i++;
            }
            setTimeout(
              removeFiles,
              100,
              ".remove__file-btn-InEdit",
              ".create__file-edit"
            );
          });
        } else {
          insertBox.innerHTML = "";
          let addReqBox = document.createElement("div");
          insertBox.append(addReqBox);
          addReqBox.outerHTML = `
              <img src="img/sadFile.svg" alt="">
              <p>Файлы отсутствуют</p>
        `;
          const file_no1 = document.querySelector("#insert__img-box-edit");
          file_no1.className = "no__files";
        }
      },
    }).done(() => {});
  });

  closeRequestEdit.addEventListener("click", () => {
    confirmation(editCancelSaveAlert, "toggle");
  });

  exitByClick(otherViewRequestView, fieldEdit, "no__active", "add");
}
//Удаление заявки

const fieldEditInEdit = document.querySelector(".field__edit-in__edit");
const otherEditRequestView = document.querySelector("#other-edit");

otherEditRequestView.addEventListener("click", () => {
  fieldEditInEdit.classList.toggle("no__active");
});

exitByClick(otherEditRequestView, fieldEditInEdit, "no__active", "add");

closeRequestView.addEventListener("click", function () {
  requestView.classList.remove("active");
});

//Выбранные

let Choice = function () {
  const choiceAll = document.querySelector("#checkbox__all");
  const choice = document.querySelectorAll(".checkbox__choice");
  const labelChoiceAll = document.querySelector("#label__checkbox__all");
  const labelChoice = document.querySelectorAll(".label__checkbox__choice");
  const checkboxBox = document.querySelector("#checkbox-box");
  const choiceTrash = document.querySelector("#trash");
  const choiceimplementer = document.querySelector("#implementer");
  let countChoice = 0;
  ToggleTrashRemove();
  ToggleImplementerRemove();
  choiceAll.checked = false;
  labelChoiceAll.classList.remove("choice-all__active");
  choiceAll.addEventListener("change", () => {
    if (choiceAll.checked == true) {
      for (let i = 0; i < choice.length; i++) {
        if (choice[i] != choiceAll) {
          choice[i].checked = choiceAll.checked;
          labelChoiceAll.classList.add("choice-all__active");
          labelChoice[i].classList.add("choice__active");
          ToggleTrashAdd();
          ToggleImplementerRemove();
        }
      }
      countChoice = choice.length;
    }
    if (choiceAll.checked == false) {
      for (let i = 0; i < choice.length; i++) {
        if ((choice[i] = choiceAll)) {
          choice[i].checked = choiceAll.checked;
          labelChoiceAll.classList.remove("choice-all__active");
          labelChoice[i].classList.remove("choice__active");
          ToggleTrashRemove();
        }
      }
      countChoice = 0;
    }
  });

  for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener("change", () => {
      if (choice[i].checked == false) {
        labelChoice[i].classList.remove("choice__active");
        countChoice -= 1;
      } else if (choice[i].checked == true) {
        labelChoice[i].classList.add("choice__active");
        countChoice += 1;
      }
      if (choice[i].checked == false && countChoice == choice.length - 1) {
        choiceAll.checked = choice[i].checked;
        labelChoiceAll.classList.remove("choice-all__active");
      }
      if (trash == true && choice[i].checked == false && countChoice == 0) {
        ToggleTrashRemove();
      } else if (trash == false && choiceAll.checked == false) {
        ToggleTrashAdd();
      }
      if (countChoice == 0 || countChoice > 1) {
        ToggleImplementerRemove();
      } else if (0 < countChoice < 2) {
        ToggleImplementerAdd();
      }
      if (
        trash == true &&
        choice[i].checked == true &&
        countChoice == choice.length
      ) {
        choiceAll.checked = choice[i].checked;
        labelChoiceAll.classList.add("choice-all__active");
      }
    });
  }
  function ToggleTrashAdd() {
    checkboxBox.classList.add("checkbox-box-active");
    choiceTrash.classList.add("trash-no__active");
    choiceTrash.classList.add("trash-active");
    trash = true;
  }
  function ToggleTrashRemove() {
    checkboxBox.classList.remove("checkbox-box-active");
    choiceTrash.classList.remove("trash-active");
    trash = false;
  }
  function ToggleImplementerAdd() {
    choiceimplementer.classList.add("implementer-no__active");
    choiceimplementer.classList.add("implementer-active");
  }
  function ToggleImplementerRemove() {
    choiceimplementer.classList.remove("implementer-active");
  }
};

const arrow = document.querySelectorAll(".arrow");
const selectAll = document.querySelectorAll(".select");
for (let i = 0; i < selectAll.length; i++) {
  selectAll[i].addEventListener("click", () => {
    arrow[i].classList.toggle("arrow__anim");
  });
  exitByClick(selectAll[i], arrow[i], "arrow__anim", "remove");
}

const typeSelect = document.querySelector(".type_select");
exitByClick(typeSelect, typeSelect, "active", "remove");
const groupSelect = document.querySelector(".group_select");
exitByClick(groupSelect, groupSelect, "active", "remove");
const typeSelectEditClose = document.querySelector(".type__select__edit");
exitByClick(typeSelectEditClose, typeSelectEditClose, "active", "remove");
const groupSelectEditClose = document.querySelector(".type__group__edit");
exitByClick(groupSelectEditClose, groupSelectEditClose, "active", "remove");

// Кнопки: активные, важные и архив

let btnFilter = function () {
  for (let i = 0; i < btnFilters.length; i++) {
    btnFilters[i].addEventListener("click", () => {
      let btnWidth = btnFilters[i].getBoundingClientRect();
      if (btnFilters[i].classList !== "btn__filters__active") {
        for (let j = 0; j < btnFilters.length; j++) {
          btnFilters[j].classList.remove("btn__filters__active");
          btnFilters[j].classList.add("hover-btnsF");
        }
        if (btnWidth.width !== 168 && btnWidth.width !== 192) {
          btnFilters[i].style.width = btnWidth.width + 8 + "px";
        }
        btnFilters[i].classList.add("btn__filters__active");
        btnFilters[i].classList.remove("hover-btnsF");
      }
    });
  }
};

// Добавление файла
var idFile = 0;
var idFileReq = 0;
const addFileBlock = document.getElementById("insert__img-box");

function removeFiles(btnClick, fileRemove) {
  const removeFileBtn = document.querySelectorAll(btnClick);
  const createEdit = document.querySelectorAll(fileRemove);
  for (let i = 0; i < removeFileBtn.length; i++) {
    removeFileBtn[i].addEventListener("click", () => {
      trashFileArr.push(removeFileBtn[i].id);
      createEdit[i].remove();
    });
  }
}

let uploadFiles = function () {
  const addFile = document.getElementById(`add__file-${idFile}`);
  const filePreview = document.getElementById(`file__preview-${idFile}`);
  uploadFile(addFile.files[0]);
  setTimeout(removeFiles, 100, ".remove__file-btn", ".create__file");

  function uploadFile(file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Файл должен быть меньше 10мб");
      return;
    }
    if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      var reader = new FileReader();
      reader.onload = function (e) {
        filePreview.innerHTML = `
                        <img class="file__img" src="${e.target.result}" alt="Фото">
                        <input  type="button" class="remove__file-btn">`;
      };
      reader.onerror = function (e) {
        alert("ERROR");
      };
      reader.readAsDataURL(file);
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        filePreview.innerHTML = `
                        <div class="file">
                            <span>
                                <div>
                                    <img src="img/iconFile.svg" alt="">
                                </div>
                                <p>${file.name}</p>
                            </span>
                            <input type="button" class="remove__file-btn">
                        </div>`;
      };
      reader.onerror = function (e) {
        alert("ERROR");
      };
      reader.readAsDataURL(file);
    }
    idFile += 1;
    let addFileBox = document.createElement("div");
    addFileBlock.append(addFileBox);
    addFileBox.outerHTML = `
        <div class="insert__img add__insert__img create__file">
            <input id="add__file-${idFile}" class="add__file" type="file" name="file[]" onchange="uploadFiles()">
            <div id="file__preview-${idFile}" class="file__preview">
                <label for="add__file-${idFile}">
                    <span>
                        <div>
                            <img src="img/addFile.svg" alt="">
                        </div>
                        <p>Добавить<br>файл</p>
                    </span>
                </label>
            </div>
        </div>`;
  }
};

//Фильтры

//Checkboxs
const atWork = document.getElementById("at__work");
const forConsideration = document.getElementById("for__consideration");
const filterStatus = document.querySelectorAll(".filter__status span");
function FilterStatus(btn, label) {
  btn.addEventListener("change", () => {
    if (btn.checked == true) {
      label.classList.add("filter__status-active");
    } else if (btn.checked == false) {
      label.classList.remove("filter__status-active");
    }
    if (btn !== atWork) {
      atWork.checked = false;
      filterStatus[0].classList.remove("filter__status-active");
    } else if (btn !== forConsideration) {
      forConsideration.checked = false;
      filterStatus[1].classList.remove("filter__status-active");
    }
  });
}
FilterStatus(atWork, filterStatus[0]);
FilterStatus(forConsideration, filterStatus[1]);

//Анимация
const filters = document.querySelector(".filters");
const filtersBtn = document.querySelectorAll(
  ".filters ul input[type='button']"
);
const labelFiltersBtn = document.querySelectorAll(".label-filters-btn");
const filtersForm = document.querySelectorAll(".filter__edit input");
const filterAnimOne = document.querySelectorAll(".filter__anim-1");
const filterAnimTwo = document.querySelector(".filter__anim-2");
let filterBtnBoolean = [];

for (let i = 0; i < filtersBtn.length - 1; i++) {
  filterBtnBoolean[i] = false;
  filtersBtn[i].addEventListener("click", () => {
    if (filterBtnBoolean[i] == true) {
      filterBtnBoolean[i] = false;
      filterAnimOne[i].classList.toggle("filter__edit-no__acitve");
      setTimeout(() => {
        filterAnimOne[i].classList.add("no__active");
      }, 450);
      labelFiltersBtn[i].classList.toggle("label-filters-active__btn");
    } else if (filterBtnBoolean[i] == false) {
      filterBtnBoolean[i] = true;
      filterAnimOne[i].classList.toggle("filter__edit-no__acitve");
      filterAnimOne[i].classList.remove("no__active");
      labelFiltersBtn[i].classList.toggle("label-filters-active__btn");
    }
  });
}
// Анимация для статуса
const filterBtnCount = filtersBtn.length - 1;
filterBtnBoolean[filterBtnCount] = false;
filtersBtn[filterBtnCount].addEventListener("click", () => {
  if (filterBtnBoolean[filterBtnCount] == true) {
    filterBtnBoolean[filterBtnCount] = false;
    filterAnimTwo.classList.toggle("filter__edit-no__acitve-status");
    setTimeout(() => {
      filterAnimTwo.classList.add("no__active");
    }, 450);
    labelFiltersBtn[filterBtnCount].classList.toggle(
      "label-filters-active__btn"
    );
  } else if (filterBtnBoolean[filterBtnCount] == false) {
    filterBtnBoolean[filterBtnCount] = true;
    filterAnimTwo.classList.toggle("filter__edit-no__acitve-status");
    filterAnimTwo.classList.remove("no__active");
    labelFiltersBtn[filterBtnCount].classList.toggle(
      "label-filters-active__btn"
    );
  }
});

//Удаление заявок
const trashBtn = document.querySelector("#trash");
if (userAdmin !== false) {
  trashBtn.addEventListener("click", () => {
    confirmation(editDeleteAlert, "toggle");
  });
}

deleteBtnYes.addEventListener("click", () => {
  let checkboxReqActive = document.querySelectorAll(".choice__active");
  checkboxReqActive.forEach((element) => {
    $.ajax({
      url: "php/trash.php",
      type: "POST",
      dataType: "json",
      data: { id: element.id },
    }).done(() => {
      toggleRequest(statusFilterBtn);
      alertEvent("Удалено", "Заявка удалена", "error");
    });
  });
});

//запуск всех функций
const filtersReset = document.querySelector("#filters__reset");
const dateCreate = document.querySelectorAll("#date__create input");
const dateComplete = document.querySelectorAll("#date__complete input");
const createdByWhom = document.querySelectorAll("#created__by__whom input");
const completByWhom = document.querySelectorAll("#complet__by__whom input");
const cabinetR = document.querySelectorAll("#cabinet input");
const statusR = document.querySelectorAll("#status input");
function filterDate(data) {
  let req = document.querySelectorAll(
    ".applications__box-applications-application"
  );
  let i = req.length - 1;

  let dateCreate = document.querySelectorAll("#date__create input");
  let dateComplete = document.querySelectorAll("#date__complete input");
  let dateCrS = new Date(dateCreate[0].value);
  let dateCrE = new Date(dateCreate[1].value);
  let dateCoS = new Date(dateComplete[0].value);
  let dateCoE = new Date(dateComplete[1].value);

  function compareDate(dateS, dateE, dateInp) {
    if (dateS > dateE) {
      dateInp[1].value = dateInp[0].value;
    }
  }
  compareDate(dateCrS, dateCrE, dateCreate);
  compareDate(dateCoS, dateCoE, dateComplete);

  dateCrS = new Date(dateCreate[0].value);
  dateCrE = new Date(dateCreate[1].value);
  dateCoS = new Date(dateComplete[0].value);
  dateCoE = new Date(dateComplete[1].value);

  data.forEach((element) => {
    let dateOfCreation = new Date(element.dateOfCreation);
    let dateCompletion = new Date(element.dateCompletion);
    //дата создания
    if (dateCrS > dateOfCreation || dateOfCreation > dateCrE) {
      req[i].classList.add("filter__active-1");
    } else if (dateCreate[0].value == "" && dateCreate[1].value == "") {
      req[i].classList.remove("filter__active-1");
    } else if (
      dateCrS < dateOfCreation ||
      (dateCrS < dateOfCreation && dateOfCreation < dateCrE)
    ) {
      req[i].classList.remove("filter__active-1");
    }
    //дата выполнения
    if (dateCoS > dateCompletion || dateCompletion > dateCoE) {
      req[i].classList.add("filter__active-2");
    } else if (dateComplete[0].value == "" && dateComplete[1].value == "") {
      req[i].classList.remove("filter__active-2");
    } else if (
      dateCoS < dateCompletion ||
      (dateCoS < dateCompletion && dateCompletion < dateCoE)
    ) {
      req[i].classList.remove("filter__active-2");
    }
    i--;
  });
}
function filterStatusF(data) {
  let req = document.querySelectorAll(
    ".applications__box-applications-application"
  );
  let i = req.length - 1;
  data.forEach((element) => {
    // статус

    if (statusR[0].checked === true && element.status === "В рассмотрении") {
      req[i].classList.add("filter__active-6");
    } else if (statusR[1].checked === true && element.status === "В работе") {
      req[i].classList.add("filter__active-6");
    } else {
      req[i].classList.remove("filter__active-6");
    }
    i--;
  });
}
function searchFilterJs(e, data, sources, classActive) {
  let searchFormValue = e.value;
  var req = document.querySelectorAll(
    ".applications__box-applications-application"
  );
  let x = 0;
  var tArr = [];
  var tTrueArr = [];
  let arrListRes = [];
  let arrRes = [];
  if (typeof data[0][sources] === "object") {
    data.forEach((element) => {
      arrListRes.push(element[sources]);
    });
    let arr = [];
    arrListRes.forEach((element) => {
      arr = element;
      for (let i = 0; i < element.length; i++) {
        if (arr[i].responsible !== undefined) {
          element[i] = arr[i].responsible;
        }
      }
      let string = element.join();
      tArr.push(string);
    });
  } else {
    data.forEach((element) => {
      tArr.push(element[sources].toLowerCase());
    });
  }
  tArr
    .filter((element) =>
      element.toLowerCase().includes(searchFormValue.toLowerCase())
    )
    .forEach((element) => {
      tTrueArr.push(element);
    });
  let tTrueArrSet = new Set(tTrueArr);
  for (let i = 0; i < tArr.length; i++) {
    if (!tTrueArrSet.has(tArr[i])) {
      req[tArr.length - i - 1].classList.add(`filter__active-${classActive}`);
    } else if (tTrueArrSet.has(tArr[i])) {
      req[tArr.length - i - 1].classList.remove(
        `filter__active-${classActive}`
      );
    }
  }
  tArr.forEach(() => {
    if (tTrueArr.length == tArr.length) {
      req[x].classList.remove(`filter__active-${classActive}`);
      x++;
    }
  });
}
const filterEditInp = document.querySelectorAll(".filter__edit input");
const filterEditLabel = document.querySelectorAll(".filter__edit label");

var filterEdit = [];
filterEditInp.forEach((element) => {
  filterEdit.push(element);
});
filterEditLabel.forEach((element) => {
  filterEdit.push(element);
});
let count = 0;
let countReload = 2;

filterEdit.forEach((element) => {
  element.addEventListener("mouseover", () => {
    if (count === 0) {
      if (reloadReq !== undefined) {
        delete reloadReq;
      }
      var reloadReq = function () {
        $.ajax({
          url: "php/findingReq.php",
          type: "POST",
          dataType: "json",
        }).done((data) => {
          const dateFilter = document.querySelectorAll(".dateFilter");
          const filtersBtnCheckbox = document.querySelectorAll(
            ".filters-btn-checkbox"
          );
          const searchInpByWhomCr =
            document.querySelector(".searchInpByWhomCr");
          const searchInpByWhomCp =
            document.querySelector(".searchInpByWhomCp");
          const searchInpCab = document.querySelector(".searchInpCab");

          searchInpCab.addEventListener("input", (e) => {
            searchFilterJs(searchInpCab, data, "cabinet", 5);
          });

          searchInpByWhomCr.addEventListener("input", (e) => {
            searchFilterJs(searchInpByWhomCr, data, "source", 3);
          });
          searchInpByWhomCp.addEventListener("input", (e) => {
            searchFilterJs(searchInpByWhomCp, data, "listResponsibles", 4);
          });
          dateFilter.forEach((el) => {
            el.addEventListener("input", () => {
              filterDate(data);
            });
          });
          filtersBtnCheckbox.forEach((el) => {
            el.addEventListener("change", () => {
              filterStatusF(data);
            });
          });
          const filtersAll = document.querySelectorAll(".filters li");
          filtersReset.addEventListener("click", (e) => {
            for (let i = 0; i < filtersBtn.length - 1; i++) {
              if (filterBtnBoolean[i] == true) {
                filterBtnBoolean[i] = false;
                filterAnimOne[i].classList.toggle("filter__edit-no__acitve");
                setTimeout(() => {
                  filterAnimOne[i].classList.add("no__active");
                }, 450);
                labelFiltersBtn[i].classList.toggle(
                  "label-filters-active__btn"
                );
              }
            }
            // Анимация для статуса
            const filterBtnCount = filtersBtn.length - 1;
            if (filterBtnBoolean[filterBtnCount] == true) {
              filterBtnBoolean[filterBtnCount] = false;
              filterAnimTwo.classList.toggle("filter__edit-no__acitve-status");
              setTimeout(() => {
                filterAnimTwo.classList.add("no__active");
              }, 450);
              labelFiltersBtn[filterBtnCount].classList.toggle(
                "label-filters-active__btn"
              );
            }

            dateCreate[0].value = "";
            dateCreate[1].value = "";
            dateComplete[0].value = "";
            dateComplete[1].value = "";
            createdByWhom[0].value = "";
            completByWhom[0].value = "";
            cabinetR[0].value = "";
            statusR[0].checked = false;
            statusR[1].checked = false;
            filterStatus[0].classList.remove("filter__status-active");
            filterStatus[1].classList.remove("filter__status-active");
            let req = document.querySelectorAll(
              ".applications__box-applications-application"
            );
            req.forEach((el) => {
              for (let i = 0; i < filtersAll.length; i++) {
                if (el.className.includes(`filter__active-${i + 1}`)) {
                  el.classList.remove(`filter__active-${i + 1}`);
                }
              }
            });
          });
        });
      };
      reloadReq();
    }
  });
  element.addEventListener("mouseout", () => {
    count = countReload;
  });
});
setInterval(() => {
  if (count !== 0) {
    count -= 1;
  }
}, 1000);
if (userAdmin) {
  //Панель админа
  var fio;
  const btnAdmOpen = document.querySelector(".adminPanel");
  const admPanel = document.querySelector(".box-admin");
  const admPanelExit = document.querySelector(".close-box");
  const responsibleAdd = document.querySelector(".box-admin__responsibleAdd");
  const admBtnAdd = document.querySelector(".box-admin__btn-add");
  const admInp = document.querySelector(".box-admin__btn-add-input");
  const respTitle = document.querySelector(".responsibleAdd__header__title");
  btnAdmOpen.addEventListener("click", () => {
    admPanel.classList.add("active");
    btnDown = "listTeacher";
    statusFilter = "fio";
    menu__responsible.classList.remove("menu__item_selected");
    menu__cabinet.classList.remove("menu__item_selected");
    menu__teacher.classList.add("menu__item_selected");
    admPanelBtnMenuDown(btnDown, statusFilter);
  });
  admPanelExit.addEventListener("click", () => {
    admPanel.classList.remove("active");
  });
  var listItemEvenChoice = "";
  const menu__teacher = document.querySelector("#adm-menu__teacher");
  const menu__cabinet = document.querySelector("#adm-menu__cabinet");
  const menu__responsible = document.querySelector("#adm-menu__responsible");
  const listViewerAdm = document.querySelector(".box-admin__list_viewer");
  var itemId = "";
  var btnDown = "";
  var statusFilter = "";
  let admSearch = document.querySelector("#admPanelSearch");
  menu__teacher.addEventListener("click", (e) => {
    btnDown = "listTeacher";
    statusFilter = "fio";
    admInpForm.placeholder = "ФИО";
    menu__responsible.classList.remove("menu__item_selected");
    menu__cabinet.classList.remove("menu__item_selected");
    menu__teacher.classList.add("menu__item_selected");
    admPanelBtnMenuDown(btnDown, statusFilter);
  });
  menu__cabinet.addEventListener("click", (e) => {
    btnDown = "listCab";
    statusFilter = "number";
    admInpForm.placeholder = "Кабинет";
    menu__responsible.classList.remove("menu__item_selected");
    menu__cabinet.classList.add("menu__item_selected");
    menu__teacher.classList.remove("menu__item_selected");
    admPanelBtnMenuDown(btnDown, statusFilter);
  });
  menu__responsible.addEventListener("click", (e) => {
    btnDown = "listResponsibles";
    statusFilter = "fio";
    admInp.style.display = "none";
    admBtnAdd.style.display = "flex";
    menu__responsible.classList.add("menu__item_selected");
    menu__cabinet.classList.remove("menu__item_selected");
    menu__teacher.classList.remove("menu__item_selected");
    admPanelBtnMenuDown(btnDown, statusFilter);
  });
  const admInpForm = document.querySelector("#admInpForm");
  const admInpAgree = document.querySelector("#admInpAgree");
  const admInpAgreeResponsible = document.querySelector(
    ".box-admin__responsibleAdd__footer__save"
  );
  const fromRespFio = document.querySelector(".fromRespFio");
  const fromRespLogin = document.querySelector(".fromRespLogin");
  const fromRespPassword = document.querySelector(".fromRespPassword");
  const admInpClose = document.querySelector("#admInpClose");
  const groupAdmBtn = document.querySelector(".groupAdmBtn");
  const roleAdmBtn = document.querySelector(".roleAdmBtn");
  admInpAgree.addEventListener("click", () => {
    if (admInpForm.value != "") {
      const groupAdmBtn = document.querySelector(".groupAdmBtn");
      $.ajax({
        url: "php/adminPanelAdd.php",
        type: "POST",
        dataType: "json",
        data: {
          groupSelect: groupAdmBtn.innerText,
          textInput: admInpForm.value,
          type: listItemEvenChoice,
          list: btnDown,
          id: itemId,
        },
      }).done(() => {
        admPanelBtnMenuDown(btnDown, statusFilter);
        admBtnAdd.style.display = "flex";
        admInp.style.display = "none";
        responsibleAdd.style.display = "none";
        admInpForm.value = "";
      });
    }
  });
  admInpAgreeResponsible.addEventListener("click", () => {
    if (
      fromRespFio.value != "" &&
      fromRespLogin.value != "" &&
      groupAdmBtn.innerText != "" &&
      groupAdmBtn.innerText != "Группа"
    ) {
      const groupAdmBtn = document.querySelector(".groupAdmBtn");
      sdsada = {
        groupSelect: groupAdmBtn.innerText,
        roleSelect: roleAdmBtn.innerText,
        textInput: fromRespFio.value,
        fromRespLogin: fromRespLogin.value,
        fromRespPassword: fromRespPassword.value,
        type: listItemEvenChoice,
        list: btnDown,
        id: itemId,
      };
      let passVerify = false;
      if (!(fromRespPassword.value.trim() === "")) {
        passVerify = true;
      }
      $.ajax({
        url: "php/adminPanelAdd.php",
        type: "POST",
        dataType: "json",
        data: {
          fio: fio,
          groupSelect: groupAdmBtn.innerText,
          roleSelect: roleAdmBtn.innerText,
          textInput: fromRespFio.value,
          fromRespLogin: fromRespLogin.value,
          fromRespPassword: fromRespPassword.value,
          passViewer: passVerify,
          type: listItemEvenChoice,
          list: btnDown,
          id: itemId,
        },
      })
        .fail(() => {
          alertEvent("Такой пользователь уже создан", "", "error");
        })
        .done(() => {
          admPanelBtnMenuDown(btnDown, statusFilter);
          admBtnAdd.style.display = "flex";
          responsibleAdd.style.display = "none";
          admInp.style.display = "none";
          admInpForm.value = "";
          fromRespFio.value = "";
          fromRespLogin.value = "";
          fromRespPassword.value = "";
          groupAdmBtn.innerText = "Группа";
          roleAdmBtn.innerText = "Роль";
        });
    }
  });

  admBtnAdd.addEventListener("click", () => {
    if (btnDown === "listResponsibles") {
      admBtnAdd.style.display = "none";
      admInp.style.display = "none";
      responsibleAdd.style.display = "flex";
    } else if (btnDown === "listCab") {
      admInpForm.placeholder = "Кабинет";
      admBtnAdd.style.display = "none";
      admInp.style.display = "flex";
    } else {
      admInpForm.placeholder = "ФИО";
      admBtnAdd.style.display = "none";
      admInp.style.display = "flex";
    }
    respTitle.innerText = "Создание";
    fromRespFio.value = "";
    fromRespLogin.value = "";
    fromRespPassword.value = "";
    groupAdmBtn.innerText = "Группа";
    groupAdmBtn.classList.remove("font-black");
    roleAdmBtn.innerText = "Роль";
    roleAdmBtn.classList.remove("font-black");
    listItemEvenChoice = "addNew";
  });

  admInpClose.addEventListener("click", () => {
    admBtnAdd.style.display = "flex";
    admInp.style.display = "none";
    admInpForm.value = "";
    fromRespFio.value = "";
    fromRespLogin.value = "";
    fromRespPassword.value = "";
    groupAdmBtn.innerText = "";
    roleAdmBtn.innerText = "";
  });

  const boxRespClose = document.querySelector("#box-admin__close");

  boxRespClose.addEventListener("click", () => {
    admBtnAdd.style.display = "flex";
    responsibleAdd.style.display = "none";
    admInpForm.value = "";
  });

  const admPanelBtnMenuDown = (btnDown, statusFilter) => {
    $.ajax({
      url: "php/checklist.php",
      type: "GET",
      dataType: "json",
    }).done((data) => {
      listViewerAdm.innerHTML = "";
      listSort(data[btnDown], statusFilter).forEach((element) => {
        let newItem = document.createElement("div");
        listViewerAdm.prepend(newItem);
        newItem.outerHTML = `
          <div class="list_viewer__item" tag='${element.id}'>
          <p>${element[statusFilter]}</p>
          <div class="list_viewer__item__inp">
              <img src='img/edit.svg' alt="edit" class='admInpEdit' srcset="">
              <img src='img/trash.svg' alt="delete" class='admInpDelete' srcset="">
          </div>
          </div> `;
      });
      const listViewerItem = document.querySelectorAll(".list_viewer__item");

      listViewerItem.forEach((element) => {
        element.childNodes[3].childNodes[1].addEventListener("click", (e) => {
          (fio = element.childNodes[1].innerText),
            (listItemEvenChoice = "edit");
          itemId = element.getAttribute("tag");
          if (btnDown === "listResponsibles") {
            admInp.style.display = "none";
            respTitle.innerText = "Редактирование";
            $.ajax({
              url: "php/responsibleRework.php",
              type: "POST",
              dataType: "json",
              data: {
                fio: fio,
                id: itemId,
              },
            }).done((data) => {
              fromRespFio.value = data.listResponsibles.name;
              fromRespLogin.value = data.listResponsibles.login;
              groupAdmBtn.innerText = data.role.specialization;
              groupAdmBtn.classList.add("font-black");
              roleAdmBtn.innerText = data.listResponsibles.permissions;
              roleAdmBtn.classList.add("font-black");
              admBtnAdd.style.display = "none";
              responsibleAdd.style.display = "flex";
            });
          } else if (btnDown === "listCab") {
            admInpForm.placeholder = "Кабинет";
            admBtnAdd.style.display = "none";
            admInp.style.display = "flex";
            admInpForm.value = element.childNodes[1].innerText;
          } else {
            admInpForm.placeholder = "ФИО";
            admBtnAdd.style.display = "none";
            admInp.style.display = "flex";
            admInpForm.value = element.childNodes[1].innerText;
          }
        });
      });

      listViewerItem.forEach((element) => {
        element.childNodes[3].childNodes[3].addEventListener("click", (e) => {
          listItemEvenChoice = "delete";
          itemId = element.getAttribute("tag");
          $.ajax({
            url: "php/adminPanelAdd.php",
            type: "POST",
            dataType: "json",
            data: {
              fio: element.childNodes[1].innerText,
              type: listItemEvenChoice,
              list: btnDown,
              id: itemId,
            },
          }).done(() => {
            admPanelBtnMenuDown(btnDown, statusFilter);
            admBtnAdd.style.display = "flex";
            admInp.style.display = "none";
            admInpForm.value = "";
          });
        });
      });

      admInpClose.addEventListener("click", () => {
        admBtnAdd.style.display = "flex";
        admInp.style.display = "none";
        admInpForm.value = "";
      });

      admSearch.addEventListener("input", (e) => {
        let admSear = document.querySelectorAll(".list_viewer__item p");
        searchJs(e, ".list_viewer__item", admSear);
      });

      const admSearchClear = document.querySelector(".admSearchClear");
      admSearchClear.addEventListener("click", (e) => {
        let admSear = document.querySelectorAll(".list_viewer__item p");
        searchJs(e, ".list_viewer__item", admSear);
        admSearch.value = "";
      });
    });
  };
}

//Подгрузка активных, важных, архив

btnFilters.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "btn__filter-1") {
      statusFilterBtn = "active";
      checkboxBox.classList.remove("no__active");
    } else if (element.id === "btn__filter-2") {
      statusFilterBtn = "my-request";
      checkboxBox.classList.add("no__active");
    } else {
      statusFilterBtn = "completed";
      checkboxBox.classList.add("no__active");
    }
  });
});

// hot keys
const shadowWindow = document.querySelectorAll(
  ".box-applications__window-shadow"
);

document.addEventListener("keydown", (e) => {
  let errorVal = document.querySelectorAll(".error__validation");

  //отправка заявки
  if (request.className.includes("active") === true && e.key === "Enter") {
    targetSubmitReq();
  }
  //выполнить заявку
  if (requestView.className.includes("active") === true && e.key === "Enter") {
    confirmation(archiveAlert, "add");
  }
  // Сохранить заявку
  if (
    requestViewEdit.className.includes("active") === true &&
    e.key === "Enter"
  ) {
    confirmation(editSaveAlert, "add");
  }

  if (e.key === "Escape") {
    if (errorVal !== null) {
      errorVal.forEach((element) => {
        element.classList.remove("error__validation");
      });
    }
    replaceAddImp();
  }

  // выйти из заявки
  shadowWindow.forEach((el) => {
    let req = el.closest(".active");
    if (e.key === "Escape" && req != null) {
      replaceAddImp();
      if (requestViewEdit.className.includes("active") === true) {
        confirmation(editCancelSaveAlert, "add");
      } else if (archiveAlert.className.includes("active") !== true) {
        req.classList.remove("active");
      }
    }
  });
});
// выйти из заявки по клику
shadowWindow.forEach((el) => {
  el.addEventListener("click", () => {
    let errorVal = document.querySelectorAll(".error__validation");
    if (errorVal !== null) {
      errorVal.forEach((element) => {
        element.classList.remove("error__validation");
      });
    }
    let req = el.closest(".active");
    if (requestViewEdit.classList[1] === "active") {
      confirmation(editCancelSaveAlert, "toggle");
    } else {
      req.classList.remove("active");
    }
  });
});
if (userAdmin === false) {
  UserSwitch();
} else {
  respond.remove();
}

toggleRequest(statusFilterBtn);
