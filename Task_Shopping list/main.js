//  Задание 11 
//  Ваша задача - создать приложение для создания чека с товарами и расчета полной стоимости покупки
//  В приложении должна быть заложена возможность:
//   a. Добавление товаров (название, кол-во, цена) в список
//   b. Изменение товаров (название, кол-во, цена)
//   c. Удаление товаров из списка
//   d. Приложение расчитывает финальную стоимость покупки
//   **Дополнительное задание** При желании вы можете добавить валидацию (проверку текстовых полей на правильность ввода данных) 


// Список товаров в котором уже есть три продукта
let productArray = ["Молоко", "Варенье", "Кофе"]
// Список количества товаров, которые уже есть в списке товаров
let countArray = [1, 1, 1]
// Список стоимости товаров, которые уже есть в списке товаров
let priceArray = [80, 130, 500]

console.log(productArray)
console.log(countArray)
console.log(priceArray)

// Создаём текстовое поле input
function getInput(placeholder, type, className) {
  let input = document.createElement("input");
  input.placeholder = placeholder;
  input.type = type;
  input.classList.add(className)
  return input;
}

function getBtn(text, className) {
  let btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add(className)
  return btn;
}

function getBox(className, text) {
  let box = document.createElement("div");
  box.classList.add(className);
  box.textContent = text;
  return box;
}

function getTitle(sub, text, className) {
  let title = document.createElement(`h${sub}`);
  title.textContent = text;
  title.classList.add(className)
  return title;
}

// Заголовок
let title = getTitle(1, "Чек покупки", "title");

// Создаём блок для формы
let inputBox = getBox("form")

// Создаём поля формы
let productInp = getInput("Название товара", "text", "text-field")
let countInp = getInput("Количество", "number", "text-field")
let priceInp = getInput("Цена товара", "number", "text-field")
// Создаём кнопку добавления содержимого полей input формы
let addBtn = getBtn("Добавить", "btn");

// Создаём обработчик события на кнопке
addBtn.onclick = function () {
  // Получаем значения из заполненных полей формы и отправляем в массив
  let productValue = productInp.value;
  //Проверка на заполнение полей формы
  if (productValue === "") {
    productInp.classList.add("attention")
    alert("Введите наименование товара!")
    return
  }
  productInp.classList.remove("attention")
  console.log(productValue)

  let countValue = Number(countInp.value);
  //Проверка на заполнение полей формы
  if (countValue === 0 || countValue === "" || countValue === !Number) {
    countInp.classList.add("attention")
    alert("Введите количество товара!")
    return
  }
  countInp.classList.remove("attention")
  console.log(countValue)

  let priceValue = Number(priceInp.value);
  //Проверка на заполнение полей формы
  if (priceValue === 0 || priceValue === "" || priceValue === !Number) {
    alert("Введите стоимость товара!")
    priceInp.classList.add("attention")
    return
  }
  priceInp.classList.remove("attention")
  // priceInp.value = "";
  console.log(priceValue)

  productArray.push(productValue);
  countArray.push(countValue);
  priceArray.push(priceValue);

  render(productArray, countArray, priceArray)

  // Сбрасываем заполнение полей формы
  productInp.value = "";
  countInp.value = "";
  priceInp.value = "";
}

inputBox.append(
  productInp,
  countInp,
  priceInp,
  addBtn
)

// Создаём список покупок
let productList = document.createElement("ul");
productList.classList.add("product__list");

// Создаём в списке строку товара (название, кол-во, цена) 
function getProductItem(index, product, count, price) {
  let productItem = document.createElement("li");
  productItem.classList.add("product__item");

  let productIndex = getBox("strong", `${index + 1}`);

  let productName = getBox("grow");
  let productLabel = getBox("subtitle", "Название");
  let productValue = getBox("strong", `${product}`);
  productName.append(productLabel, productValue);

  let productCount = getBox("wrap");
  let countLabel = getBox("subtitle", "Кол-во");
  let countValue = getBox("strong", `${count}`);
  productCount.append(countLabel, countValue);

  let productPrice = getBox("wrap");
  let priceLabel = getBox("subtitle", "Цена");
  let priceValue = getBox("strong", `${price} руб`);
  productPrice.append(priceLabel, priceValue);

  let productTotalPrice = getBox("wrap");
  let totalPriceLabel = getBox("subtitle", "Общая цена");
  let totalPriceValue = getBox("strong", `${count * price} руб`);
  productTotalPrice.append(totalPriceLabel, totalPriceValue);

  // Создаём блок с кнопками для редактирования списка покупок
  let buttonBox = getBox("btn-wrap");
  let buttonChange = getBtn("Изменить", "btn");
  let buttonDelete = getBtn("Удалить", "btn-del");
  buttonBox.append(buttonChange, buttonDelete);

  buttonChange.onclick = function () {
    // Получаем и присваиваем новые значения
    productArray[index] = prompt("Введите изменения названия товара", product);
    countArray[index] = Number(prompt("Введите изменения количества товара", count));
    priceArray[index] = Number(prompt("Введите изменения стоимости товара", price));
    // Перерисовываем список покупок
    render(productArray, countArray, priceArray)
  }

  buttonDelete.onclick = function () {
    if (confirm(`Вы уверены, что хотите удалить "${product}"?`) === true) {
      productArray.splice(index, 1)
      countArray.splice(index, 1)
      priceArray.splice(index, 1)
      // Перерисовываем список покупок
      render(productArray, countArray, priceArray)
    }
  }

  productList.append(productItem);
  productItem.append(
    productIndex,
    productName,
    productCount,
    productPrice,
    productTotalPrice,
    buttonBox
  )
}

// Создаем нижний блок итоговой стоимости товаров по чеку
let total = getBox("product__total");
let totalCoastText = getBox("product__total-coast", "Итоговая стоимость:");
let totalCoast = getBox("product__total-coast", `руб`);
total.append(totalCoastText, totalCoast)

// Функция отрисовки списка покупок
function render(arr1, arr2, arr3) {
  productList.innerHTML = "" // Очищаем список перед отрисовкой
  let totalPrice = 0;

  // Если массив или список пуст
  if (arr1.length === 0) {
    let notItems = document.createElement("li");
    notItems.textContent = "Товары не добавлены";
    notItems.classList.add("product__list", "product__not");
    productList.append(notItems);
    totalCoast.textContent = "0 руб";
    return
  }

  // Начинаем отрисовку, используя массив и цикл for
  for (let i = 0; i < arr1.length; i++) {
    let item = getProductItem(i, arr1[i], arr2[i], arr3[i]) // Создаем элемент списка
    console.log(i, arr1[i], arr2[i], arr3[i]);
    totalPrice = totalPrice + (arr2[i] * arr3[i]);
  }
  // Передаём в блок итоговой стоимости текстовое содержимое
  totalCoast.textContent = `${totalPrice} руб`;
}

// Запускаем отрисовку списка при загрузке страницы
render(productArray, countArray, priceArray);

document.body.append(
  title,
  inputBox,
  productList,
  total,
)




