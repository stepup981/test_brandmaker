document.addEventListener("DOMContentLoaded", function () {
  const infoChildren = document.querySelectorAll(".office__info-child");

  infoChildren.forEach(function (infoChild) {
    infoChild.addEventListener("click", function () {
      // find the popup inside this infoChild
      const popup = this.querySelector(".office__info-popup-hidden");

      if (popup.style.display === "none") {
        popup.style.display = "block";
      } else {
        popup.style.display = "none";
      }
    });
  });
});

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

document.querySelectorAll(".office__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalWindow = document.querySelector(".modal-window");
    modalOverlay.style.display = "block";
    modalWindow.style.display = "block";
  });
});

document.querySelector(".modal-window__flag").addEventListener("click", () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalWindow = document.querySelector(".modal-window");
  modalOverlay.style.display = "none";
  modalWindow.style.display = "none";
});
