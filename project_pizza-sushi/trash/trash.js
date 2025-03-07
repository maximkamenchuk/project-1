(function () {
  const order = localStorage.getItem("order");
  const orderClass = document.querySelector(".order");

  if (order) {
    const orders = JSON.parse(order);
    const pizzas = {};
    let totalPrice = 0;

    orders.forEach((pizza) => {
      if (pizzas[pizza.name]) {
        pizzas[pizza.name].count += 1;
      } else {
        pizzas[pizza.name] = {
          ...pizza,
          count: 1,
        };
      }
    });

    for (let pizza in pizzas) {
      const order = pizzas[pizza];

      const pizzaContainer = document.createElement("div");
      const pizzaName = document.createElement("h2");
      pizzaName.textContent = order.name;
      const pizzaPrice = document.createElement("p");
      pizzaPrice.textContent = `Цена: ${order.price} 1шт`;

      const pizzaCount = document.createElement("p");
      pizzaCount.textContent = `Количество: ${order.count}`;

      const pizzaTotal = order.price * order.count;
      totalPrice += pizzaTotal;

      pizzaContainer.append(pizzaName, pizzaCount, pizzaPrice);
      orderClass.appendChild(pizzaContainer);
    }

    const totalAmountElement = document.createElement("h3");
    totalAmountElement.textContent = `Общая сумма: ${totalPrice} р.`;
    orderClass.appendChild(totalAmountElement);
  }
})();
