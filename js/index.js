// всплывающие окна на картинке с информацией о цене
document.addEventListener("DOMContentLoaded", () => {
  const infoChildren = document.querySelectorAll(".office__info-child");

  infoChildren.forEach((infoChild) => {
    infoChild.addEventListener("click", function () {
      const popup = this.querySelector(".office__info-popup-hidden");

      if (!popup.style.display || popup.style.display === "none") {
        return popup.style.display = "block";
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
  counters[index].textContent = count;

  btn.addEventListener("click", () => {
    count++;
    counters[index].textContent = count;
    updateTotalPrice();
  });

  decrementBtns[index].addEventListener("click", () => {
    if (count > 0) {
      count--;
      counters[index].textContent = count;
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
    totalPrice += parseInt(counter.textContent) * prices[index];
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

document.querySelectorAll(".office__btn").forEach(btn =>
  btn.addEventListener("click", () => toggleModalDisplay("block")));

document.querySelector(".modal-window__flag").addEventListener("click", () => toggleModalDisplay("none"));


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


// использую swiper.js
const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});