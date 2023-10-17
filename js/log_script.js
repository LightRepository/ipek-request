const authInputLogin = document.querySelector(".auth__input-login");
const authInputPassword = document.querySelector(".auth__input-password");
const authInputSubmit = document.querySelector(".auth__input-submit");
const error = document.querySelector(".error");
const authInput = document.querySelectorAll(".auth__input");
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
  }, 50);
}

function alertVal(item) {
  item.forEach((el) => {
    el.classList.remove("error__validation");
    setTimeout(() => {
      el.classList.add("error__validation");
    }, 50);
  });
}

authInputSubmit.addEventListener("click", () => {
  authCheck();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (authInputLogin.value.trim() != "") {
      authInputPassword.focus();
      if (authInputPassword.value.trim() != "") {
        authCheck();
      }
    }
  }
});

let authCheck = () => {
  $.ajax({
    url: "php/auth.php",
    type: "POST",
    dataType: "json",
    data: { login: authInputLogin.value, password: authInputPassword.value },
  })
    .done(() => {
      location.reload();
    })
    .fail(() => {
      alertEvent("Ошибка", "Проверьте правильность ввода данных", "error");
      alertVal(authInput);
    });
};
