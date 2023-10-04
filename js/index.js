// имитируем запрос с бэка на координаты точек на 1 картинке
let coord = document.getElementsByClassName("office__info-child");

fetch("https://651cf07044e393af2d58eb7f.mockapi.io/Coord")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      coord[i].style.top = data[i].top;
      coord[i].style.left = data[i].left;
    }
  })
  .catch((error) => console.error("Ошибка:", error));

// всплывающие окна на картинке с информацией о цене
document.addEventListener("DOMContentLoaded", () => {
  const infoChildren = document.querySelectorAll(".office__info-child");

  infoChildren.forEach((infoChild) => {
    infoChild.addEventListener("click", function () {
      const popup = this.querySelector(".office__info-popup-hidden");

      if (!popup.style.display || popup.style.display === "none") {
        return (popup.style.display = "block");
      }
      popup.style.display = "none";
    });
  });
});

// подсчитывание общей суммы в корзине
const incrementBtns = document.querySelectorAll(".office__counter-btnup");
const decrementBtns = document.querySelectorAll(".office__counter-btndown");
const counters = document.querySelectorAll(".office__counter-value");
const totalPriceElement = document.querySelector(".office__title-count");
const prices = [27900, 14600, 10500, 55000, 43800, 13500];

incrementBtns.forEach((btn, index) => {
  let count = 0;
  counters[index].value = count;

  btn.addEventListener("click", () => {
    count++;
    counters[index].value = count;
    updateTotalPrice();
  });

  decrementBtns[index].addEventListener("click", () => {
    if (count > 0) {
      count--;
      counters[index].value = count;
      updateTotalPrice();
    }
  });

  counters[index].addEventListener("input", () => {
    const inputValue = parseInt(counters[index].value);
    if (counters[index].value === "") {
      count = 0;
      updateTotalPrice();
      return;
    }
    if (!isNaN(inputValue) && inputValue >= 0) {
      counters[index].value = inputValue.toString();
      count = inputValue;
      updateTotalPrice();
    }
  });
});

const notificationElement = document.querySelector(".office__notification");
const alternativeBlockElement = document.querySelector(
  ".office__notification-alternative"
);

function updateTotalPrice() {
  let totalPrice = 0;
  counters.forEach((counter, index) => {
    const count = parseInt(counter.value);
    if (!isNaN(count) && count > 0) {
      totalPrice += count * prices[index];
    }
  });

  if (totalPrice === 0) {
    notificationElement.style.display = "none";
    alternativeBlockElement.style.display = "flex";
    totalPriceElement.textContent = "";
  } else {
    notificationElement.style.display = "block";
    alternativeBlockElement.style.display = "none";
    totalPriceElement.textContent = `${totalPrice.toLocaleString("ru-RU")} руб`;
  }
}
updateTotalPrice();

// открывание модального окна для ввода номера телефона
const toggleModalDisplay = (display) => {
  document.querySelector(".modal-overlay").style.display = display;
  document.querySelector(".modal-window").style.display = display;
};

document
  .querySelectorAll(".office__btn")
  .forEach((btn) =>
    btn.addEventListener("click", () => toggleModalDisplay("block"))
  );

document
  .querySelector(".modal-window__flag")
  .addEventListener("click", () => toggleModalDisplay("none"));

// modal window 'placeholder' правлю,чтобы всегда была +7
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("focus", () => {
  if (!phoneInput.value.startsWith("+7")) {
    phoneInput.value = "+7 " + phoneInput.value.replace(/\D/g, "");
  }
});

phoneInput.addEventListener("input", () => {
  const inputValue = phoneInput.value.replace(/\D/g, "");
  let prefix = "";

  if (!inputValue.startsWith("7") && inputValue.length > 0) {
    prefix = "+7 ";
  }

  let formattedValue = `${prefix}${inputValue.replace(
    /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
    "$1 ($2) $3-$4-$5"
  )}`.trim();

  if (formattedValue.charAt(0) !== "+") {
    formattedValue = "+" + formattedValue;
  }

  const start = phoneInput.selectionStart;
  const end = phoneInput.selectionEnd;
  phoneInput.value = formattedValue;

  const adjustment = formattedValue.length - inputValue.length;
  phoneInput.setSelectionRange(start + adjustment, end + adjustment);
});

phoneInput.addEventListener("keydown", (event) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
  ];
  if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
});

// добавлние закрытие модального оклна по клик на оверлей
const modalOverlay = document.querySelector(".modal-overlay");
const modalWindow = document.querySelector(".modal-window");
const closeModal = () => {
  modalOverlay.style.display = "none";
  modalWindow.style.display = "none";
};

modalOverlay.addEventListener("click", closeModal);

// использую swiper.js
let swiper;

function initializeSwiper() {
  const screenWidth = window.innerWidth;

  if (!swiper && screenWidth <= 781) {
    swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else if (swiper && screenWidth > 781) {
    swiper.destroy(true, true);
    swiper = null;
  }
}

initializeSwiper();

window.addEventListener("resize", initializeSwiper);
