const API_URL = "https://project1-pizza-online-default-rtdb.firebaseio.com";

const main = document.querySelector("section");
const productCount = document.querySelector("#product-count");
const dateInput = document.querySelector("#date");

(function () {
  if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify([]));
  } else {
    const orders = JSON.parse(localStorage.getItem("order"));
    productCount.textContent = orders.length;
  }
  localStorage.setItem("order", JSON.stringify([]));

  fetch(`${API_URL}/pizzas.json`)
    .then((response) => response.json())
    .then((pizzas) => {
      console.log(pizzas);

      const arr = Object.values(pizzas).map((pizza, i) => {
        return {
          ...pizza,
          id: Object.keys(pizzas)[i],
        };
      });
      arr.forEach((pizza) => {
        const pizzaContainer = document.createElement("div");
        pizzaContainer.classList.add("pizza");
        const pizzaInfo = document.createElement("div");
        const pizzaImg = document.createElement("img");
        pizzaImg.src = pizza.img;
        const pizzaName = document.createElement("h2");
        pizzaName.textContent = pizza.name;
        const pizzaPrice = document.createElement("p");
        pizzaPrice.textContent = `Цена: ${pizza.price}`;
        const pizzaDescription = document.createElement("p");
        pizzaDescription.textContent = pizza.description;

        const buyContainer = document.createElement("div");
        buyContainer.classList.add("buy");
        const moreBtn = document.createElement("button");
        moreBtn.textContent = "+";
        const lessBtn = document.createElement("button");
        lessBtn.textContent = "-";
        const count = document.createElement("span");
        count.textContent = "0";
        pizzaInfo.append(pizzaImg, pizzaName, pizzaPrice, pizzaDescription);

        buyContainer.append(lessBtn, count, moreBtn);

        lessBtn.onclick = () => {
          if (parseInt(count.textContent) > 0) {
            count.textContent = parseInt(count.textContent) - 1;

            const orders = JSON.parse(localStorage.getItem("order"));
            const index = orders.findIndex((item) => item.id === pizza.id);
            orders.splice(index, 1);
            productCount.textContent = orders.length;
            localStorage.setItem("order", JSON.stringify(orders));
          }
        };

        moreBtn.onclick = () => {
          count.textContent = parseInt(count.textContent) + 1;

          const orders = JSON.parse(localStorage.getItem("order"));
          orders.push(pizza);
          productCount.textContent = orders.length;
          localStorage.setItem("order", JSON.stringify(orders));
        };

        pizzaContainer.append(pizzaInfo, buyContainer);
        main.appendChild(pizzaContainer);
      });
    });
})();
