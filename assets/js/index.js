"use strict";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },

  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  let menuArrows = document.querySelectorAll(".menu-burger__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

//menu burger

const iconMenu = document.querySelector(".menu-burger__icon");
const menuBody = document.querySelector(".menu-burger__body");
const menuMobile = document.querySelector(
  ".container-header__container-mobile"
);

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    menuMobile.classList.toggle("_inactive");
  });
}

//прокрутка при клике
const menuLinks = document.querySelectorAll(".menu-burger__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header-burger").offsetHeight;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });

      e.preventDefault();
    }
  }
}

// function onSearch() {
//   let gifImg = document.getElementById("gifSearch").value;
//   //здесь параметр запишем через слэш
//   fetch(
//     "https://api.giphy.com/v1/gifs/search?api_key=WXe1aojMCLcfHRAB4lBwdDfeELmLMbk0&q=" +
//       gifImg +
//       "&limit=2&offset=0&rating=g&lang=en"
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       //console.log(result);
//       let resultGif = document.getElementById("resultGif");
//       resultGif.innerHTML = "";
//       if (result.data && result.data.length > 0) {
//         result.data.forEach((element) => {
//           resultGif.innerHTML += `<img class = "pict" src=${element.images.original.url}<br>`;
//         });
//       } else {
//         alert("No results! Enter another key word or phrase");
//       }
//     })

//     .catch((error) => console.log(error));
// }
