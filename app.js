const express = require("express");
const app = express();
const port = 3000;

let products = [
  { id: 1, name: "Ноутбук", price: 75000 },
  { id: 2, name: "Мышь", price: 1500 },
  { id: 3, name: "Клавиатура", price: 3500 },
  { id: 4, name: "Монитор", price: 25000 },
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API для управления товарами. Доступные маршруты: /products");
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      error: "Необходимо указать название и стоимость товара",
    });
  }

  // Проверка, что цена является числом
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: "Стоимость должна быть положительным числом",
    });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      error: "Товар не найден",
    });
  }

  res.json(product);
});

app.patch("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      error: "Товар не найден",
    });
  }

  const { name, price } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Название товара должно быть непустой строкой",
      });
    }
    product.name = name;
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        error: "Стоимость должна быть положительным числом",
      });
    }
    product.price = price;
  }

  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({
      error: "Товар не найден",
    });
  }

  products.splice(productIndex, 1);
  res.status(200).json({
    message: "Товар успешно удален",
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Маршрут не найден",
  });
});

app.listen(port, () => {
  console.log("Сервер запущен на http://localhost:${port}");
  console.log("Доступные маршруты:");
  console.log("- GET    /products - получить все товары");
  console.log("- GET    /products/id- получить товар по id");
  console.log("- POST   /products - создать новый товар");
  console.log("- DELETE /products/:id - удалить товар");
});
