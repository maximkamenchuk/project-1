const main = document.querySelector("main");
const productCount = document.querySelector("#product-count");

const pizzas = [
  {
    id: 1,
    name: "Margherita",
    price: 21.90,
    img: "https://cdn.clever.by/assets/2024/06/21/7891d07c4bc914966e69f345901710d6---png_800x500:whitepadding15_fb108_convert.png",
    description:
      "Delicious classic pizza with mozzarella, tomatoes, basil, and fresh basil.",
    weight: 1000,
  },
  {
    id: 2,
    name: "Peperoni",
    price: 19.90,
    img: "https://media.istockphoto.com/id/905492462/photo/pizza-margarita-with-mozzarella-cheese-basil-and-tomato-template-for-your-design-and-menu-of.jpg?s=612x612&w=0&k=20&c=J4L7If3oJp0IrZ5IXEc-_r0WU0HNa7U5Yn4IW7ynuVo=",
    description:
      "Delicious classic pizza peperoni, tomatoes, italian species.",
    weight: 1000,
  },
  {
    id: 3,
    name: "Texas",
    price: 21.90,
    img: "https://lh4.googleusercontent.com/proxy/mzVFXE1mppiKGJgudLDU8fEGkdqhV1ZZNbW-WwfaiJoRYh2LuRGZsngyAJCIrb_WUhG-umdrGF2KuabW3hBhhlI6ayp5AiPChJ7F8HO_rOsyxLCSArEq_n6JTq4icB4",
    description:
      "Delicious texas pizza, with onion, garlic, and mozzarella with fresh meat and ",
    weight: 1000,
  },
];

(function () {
  if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify([]));
  } else {
    const orders = JSON.parse(localStorage.getItem("order"));
    productCount.textContent = orders.length;
  }
  localStorage.setItem("order", JSON.stringify([]));
  pizzas.forEach((pizza) => {
    const pizzaContainer = document.createElement("div");
    pizzaContainer.classList.add("pizza");
    const pizzaImg = document.createElement("img");
    pizzaImg.src = pizza.img;
    const pizzaName = document.createElement("h2");
    pizzaName.textContent = pizza.name;
    const pizzaPrice = document.createElement("p");
    pizzaPrice.textContent = `Price: ${pizza.price}`;
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

    pizzaContainer.append(
      pizzaImg,
      pizzaName,
      pizzaPrice,
      pizzaDescription,
      buyContainer
    );
    main.appendChild(pizzaContainer);
  });
})();
