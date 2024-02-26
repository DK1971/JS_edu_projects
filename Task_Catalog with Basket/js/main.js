// Массив КАТАЛОГА товаров
let catalogArr = [
  {
    title: "iPhone 14 Pro",
    price: 110000,
    desc: "Смартфон Apple iPhone 14 Pro 128GB",
    img: 'img/1.jpg'
  },
  {
    title: "AirPods Pro",
    price: 2100,
    desc: "Наушники Apple AirPods Pro (2-го поколения, 2022)",
    img: 'img/2.jpg'
  },
  {
    title: "Чехол iPhone 14 Pro",
    price: 1200,
    desc: "Чехол для Apple iPhone 14 Pro - желтый",
    img: 'img/3.jpg'
  },
]
// Массив товаров в КОРЗИНЕ
let basketArr = []


// ЗАДАЁМ ФУНКЦИИ для ПОВТОРЯЮЩИХСЯ БЛОКОВ и СЦЕНАРИЕВ
// Обёртка для блоков
function getBox(className) {
  let box = document.createElement('div');
  box.classList.add(className);
  return box;
}
// Шаблон заголовков
function getTitle(sub, text, className) {
  let title = document.createElement(`h${sub}`);
  title.textContent = text;
  title.classList.add(className);
  return title;
}
// Изображение товара
function getImg(arr, className) {
  let img = document.createElement("img");
  img.classList.add(className);
  img.src = arr.img;
  return img;
}
// Шаблон для создания элементов(тегов)
function getElement(elem, className, text) {
  let element = document.createElement(elem);
  element.classList.add(className);
  element.textContent = text;
  return element;
}
// Кнопка
function getBtn(text, className) {
  let btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add(className);
  return btn;
}

// Функция создания Карточки товара
function getCard(arr) {
  let card = getElement("li", "card");
  let cardImg = getImg(arr, "card__img");
  let cardTitle = getTitle(2, arr.title, "card__subtitle");
  let cardDesc = getElement("p", "card__desc", arr.desc);
  let cardPrice = getElement("p", "card__price", `${arr.price} руб`);
  let cardBtn = getBtn("+ В Корзину", "card__btn");
  // Кнопка добавления товара в корзину
  cardBtn.onclick = function () {
    basketArr.push(arr)
    console.log(basketArr)
    renderBasket(basketArr) // Перерисовка списка товаров в КОРЗИНЕ
  }
  card.append(cardImg, cardTitle, cardDesc, cardPrice, cardBtn)
  return card;
}

// Функция создания списка товаров в Корзине
function getCardInBasket(index, arr) {
  let basketCard = getElement("li", "basket__card");
  let basketCardImg = getImg(arr, "basket__card-img");
  let basketCardDesc = getBox("basket__card-desc");
  let basketCardTitle = getTitle(2, arr.title, "basket__card-subtitle");
  let basketCardPrice = getElement("p", "basket__card-price", `${arr.price} руб`);
  // Кнопка удаления товара из корзины
  let basketCardBtnDelete = getBtn("Удалить", "basket__btn-delete");
  // Действие с кнопкой удаления
  basketCardBtnDelete.onclick = function () {
    basketArr.splice(index, 1)
    renderBasket(basketArr) // Перерисовка списка товаров в КОРЗИНЕ
  }
  basketCard.append(basketCardImg, basketCardDesc, basketCardBtnDelete);
  basketCardDesc.append(basketCardTitle, basketCardPrice);
  return basketCard;
}

const container = getBox("container");

const box = getBox("wrap");
// КАТАЛОГ товаров
const boxCards = getBox("cards")
const boxTitle = getTitle(1, "Каталог", "cards__title")
const boxList = getElement("ul", "cards__list");
const cards = getCard("catalogArr");
// КОРЗИНА товаров
const boxBasket = getBox("basket");
const basketBox = getBox("hidden");
const basketList = getElement("ul", "basket__list");
// Кнопка заказать товар с итоговой суммой
const basketOrder = getBtn(`Заказать на сумму: 0 руб.`, "basket__btn-order");
// Действие с кнопкой "Заказать"
basketOrder.onclick = function () {
  alert("Раздел в разработке!")
}
// Футер с КНОПКОй корзины
const footer = getBox("footer__btn-box");
const footerBtn = getBtn("", "basket__btn");
// Показать / скрыть корзину
footerBtn.onclick = function () {
  if (footerBtn.classList.contains("basket__btn") === false) {
    footerBtn.classList.add("basket__btn")
    basketBox.classList.add("hidden")
  } else {
    basketBox.classList.remove("hidden")
    basketBox.classList.add("basket__box")
    footerBtn.classList.remove("basket__btn")
    footerBtn.classList.add("basket__btn-open")
  }
}

// Функция создания карточки товара на основе массива (каталога) товаров
function renderCatalog(arr) {
  boxList.innerHTML = ""

  for (let i = 0; i < arr.length; i++) {
    boxList.append(getCard(arr[i]));
  }
}
// Функция отрисовки каталога
renderCatalog(catalogArr)

// Функция создания списка товаров в Корзине
function renderBasket(arr) {
  basketList.innerHTML = ""

  if (arr.length === 0) {
    let noItemInBox = getElement("li", "basket__no-item", "Товаров в корзине нет");
    basketOrder.textContent = `Заказать на сумму: 0 руб.`

    basketList.append(noItemInBox);
    return
  } 

  let orderCost = 0;

  for (let i = 0; i < arr.length; i++) {
    basketList.append(getCardInBasket(i, arr[i]));
    
    orderCost = orderCost + arr[i].price;
  }
  basketOrder.textContent = `Заказать на сумму: ${orderCost} руб.`
}
// Функция отрисовки корзины
renderBasket(basketArr)


document.body.append(container);
container.append(box, footer)

box.append(boxCards, boxBasket);
boxCards.append(boxTitle, boxList);
boxBasket.append(basketBox);
basketBox.append(basketList, basketOrder);

footer.append(footerBtn)
