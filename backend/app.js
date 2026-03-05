const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Интернет-магазина",
      version: "1.0.0",
      description:
        "Полноценное REST API для управления товарами интернет-магазина",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Локальный сервер",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["name", "category", "description", "price", "stock"],
          properties: {
            id: {
              type: "string",
              description: "Автоматически сгенерированный уникальный ID товара",
              example: "abc123xyz",
            },
            name: {
              type: "string",
              description: "Название товара",
              example: "Футбольный мяч",
            },
            category: {
              type: "string",
              description: "Категория товара",
              example: "Мячи",
            },
            description: {
              type: "string",
              description: "Подробное описание товара",
              example: "Мяч Лиги чемпионов сезона 23/24",
            },
            price: {
              type: "number",
              description: "Цена товара в рублях",
              example: 9990,
            },
            stock: {
              type: "integer",
              description: "Количество товара на складе",
              example: 5,
            },
            rating: {
              type: "number",
              description: "Рейтинг товара (0-5)",
              example: 4.9,
            },
            image: {
              type: "string",
              description: "URL изображения товара",
              example: "/images/products/ball.jpg",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              example: "Товар не найден",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
            },
            message: {
              type: "string",
              example: "Товар успешно создан",
            },
          },
        },
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    tags: [
      {
        name: "Products",
        description: "Управление товарами интернет-магазина",
      },
      {
        name: "Stats",
        description: "Статистика магазина",
      },
      {
        name: "Info",
        description: "Информация о API",
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "API Интернет-магазина - Документация",
  }),
);

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${res.statusCode} ${req.path} - ${duration}ms`,
    );
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "PATCH"
    ) {
      console.log("  Body:", req.body);
    }
  });
  next();
});

let products = [
  {
    id: nanoid(8),
    name: "Футбольный мяч",
    category: "Мячи",
    description: "Мяч Лиги чемпионов сезона 23/24",
    price: 9990,
    stock: 5,
    rating: 4.9,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Мяч FIFA Pro 2024",
    category: "Мячи",
    description: "Официальный мяч Лиги Чемпионов, технология 3D-панелей",
    price: 8990,
    stock: 8,
    rating: 4.7,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Бутсы Nike Mercurial Superfly 10",
    category: "Обувь",
    description: "Элитные бутсы для скорости, карбоновая подошва",
    price: 25990,
    stock: 6,
    rating: 4.9,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Форма Барселоны 2024/25",
    category: "Одежда",
    description: "Домашний комплект, технология Dri-FIT",
    price: 7990,
    stock: 15,
    rating: 4.9,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Щитки Adidas Predator",
    category: "Защита",
    description: "Легкие композитные щитки с анатомической формой",
    price: 3490,
    stock: 10,
    rating: 4.8,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Вратарские перчатки Reusch",
    category: "Защита",
    description: "Профессиональные перчатки с латексом Grip Silver",
    price: 6990,
    stock: 7,
    rating: 4.7,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Гетры футбольные Nike Strike",
    category: "Одежда",
    description: "Компрессионные гетры с зональной вентиляцией",
    price: 1990,
    stock: 20,
    rating: 4.9,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Сумка для бутс Adidas",
    category: "Сумки",
    description: "Водонепроницаемый отсек для обуви",
    price: 3990,
    stock: 25,
    rating: 4.8,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Футбольные ворота 3x2м",
    category: "Инвентарь",
    description: "Складные алюминиевые ворота",
    price: 18990,
    stock: 12,
    rating: 4.7,
    image: "",
  },
  {
    id: nanoid(8),
    name: "Мяч Чемпионата Мира 2022",
    category: "Мячи",
    description: "Официальный мяч ЧМ-2022, технология Connected Ball",
    price: 12990,
    stock: 3,
    rating: 5.0,
    image: "",
  },
];

function findProductOr404(id, res) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({
      success: false,
      error: "Товар не найден",
    });
    return null;
  }
  return product;
}

function validateProduct(product, isPartial = false) {
  const errors = [];

  if (!isPartial || product.name !== undefined) {
    if (
      !product.name ||
      typeof product.name !== "string" ||
      product.name.trim() === ""
    ) {
      errors.push("Название товара обязательно");
    }
  }

  if (!isPartial || product.category !== undefined) {
    if (!product.category || typeof product.category !== "string") {
      errors.push("Категория товара обязательна");
    }
  }

  if (!isPartial || product.description !== undefined) {
    if (!product.description || typeof product.description !== "string") {
      errors.push("Описание товара обязательно");
    }
  }

  if (!isPartial || product.price !== undefined) {
    if (
      product.price === undefined ||
      typeof product.price !== "number" ||
      product.price <= 0
    ) {
      errors.push("Цена должна быть положительным числом");
    }
  }

  if (!isPartial || product.stock !== undefined) {
    if (
      product.stock === undefined ||
      typeof product.stock !== "number" ||
      product.stock < 0
    ) {
      errors.push("Количество на складе должно быть неотрицательным числом");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============ МАРШРУТЫ ============

/**
 * @swagger
 * /:
 *   get:
 *     summary: Корневой эндпоинт API
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Информация о доступных эндпоинтах
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "API 2drots"
 *                 endpoints:
 *                   type: object
 *                 docs:
 *                   type: string
 *                   example: "http://localhost:3000/api-docs"
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API 2drots",
    endpoints: {
      products: {
        getAll: "GET /api/products",
        getById: "GET /api/products/:id",
        create: "POST /api/products",
        update: "PUT /api/products/:id",
        patch: "PATCH /api/products/:id",
        delete: "DELETE /api/products/:id",
      },
      stats: "GET /api/stats",
    },
    docs: "http://localhost:3000/api-docs",
  });
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить список всех товаров
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Фильтр по категории
 *         required: false
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Минимальная цена
 *         required: false
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Максимальная цена
 *         required: false
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         description: Только в наличии
 *         required: false
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, rating, name]
 *         description: Сортировка
 *         required: false
 *     responses:
 *       200:
 *         description: Успешный ответ со списком товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
app.get("/api/products", (req, res) => {
  let filteredProducts = [...products];
  const { category, minPrice, maxPrice, inStock, sort } = req.query;

  if (category) {
    filteredProducts = filteredProducts.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase()),
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= Number(minPrice),
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= Number(maxPrice),
    );
  }

  if (inStock === "true") {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0);
  }

  if (sort) {
    switch (sort) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts,
  });
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/api/products/:id", (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;

  res.json({
    success: true,
    data: product,
  });
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/api/products", (req, res) => {
  const validation = validateProduct(req.body);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  const newProduct = {
    id: nanoid(8),
    name: req.body.name.trim(),
    category: req.body.category,
    description: req.body.description,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    rating: req.body.rating || 0,
    image: req.body.image || "",
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Товар успешно создан",
    data: newProduct,
  });
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Полностью обновить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Товар обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Товар не найден
 */
app.put("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Товар не найден",
    });
  }

  const validation = validateProduct(req.body);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  products[productIndex] = {
    id: req.params.id,
    name: req.body.name.trim(),
    category: req.body.category,
    description: req.body.description,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    rating: req.body.rating || products[productIndex].rating,
    image: req.body.image || products[productIndex].image,
  };

  res.json({
    success: true,
    message: "Товар полностью обновлен",
    data: products[productIndex],
  });
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Частично обновить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Товар обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Товар не найден
 */
app.patch("/api/products/:id", (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "Нет данных для обновления",
    });
  }

  const validation = validateProduct(req.body, true);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  if (req.body.name !== undefined) product.name = req.body.name.trim();
  if (req.body.category !== undefined) product.category = req.body.category;
  if (req.body.description !== undefined)
    product.description = req.body.description;
  if (req.body.price !== undefined) product.price = Number(req.body.price);
  if (req.body.stock !== undefined) product.stock = Number(req.body.stock);
  if (req.body.rating !== undefined) product.rating = req.body.rating;
  if (req.body.image !== undefined) product.image = req.body.image;

  res.json({
    success: true,
    message: "Товар обновлен",
    data: product,
  });
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete("/api/products/:id", (req, res) => {
  const exists = products.some((p) => p.id === req.params.id);

  if (!exists) {
    return res.status(404).json({
      success: false,
      error: "Товар не найден",
    });
  }

  products = products.filter((p) => p.id !== req.params.id);
  res.status(204).send();
});

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Получить статистику магазина
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Статистика магазина
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalProducts:
 *                       type: integer
 *                     totalStock:
 *                       type: integer
 *                     averagePrice:
 *                       type: number
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     cheapestProduct:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                     mostExpensiveProduct:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 */
app.get("/api/stats", (req, res) => {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const averagePrice =
    totalProducts > 0
      ? Math.round(
          products.reduce((sum, p) => sum + p.price, 0) / totalProducts,
        )
      : 0;
  const categories = [...new Set(products.map((p) => p.category))];
  const cheapestProduct =
    products.length > 0
      ? products.reduce(
          (min, p) => (p.price < min.price ? p : min),
          products[0],
        )
      : null;
  const mostExpensiveProduct =
    products.length > 0
      ? products.reduce(
          (max, p) => (p.price > max.price ? p : max),
          products[0],
        )
      : null;

  res.json({
    success: true,
    data: {
      totalProducts,
      totalStock,
      averagePrice,
      categories,
      cheapestProduct: cheapestProduct
        ? {
            name: cheapestProduct.name,
            price: cheapestProduct.price,
          }
        : null,
      mostExpensiveProduct: mostExpensiveProduct
        ? {
            name: mostExpensiveProduct.name,
            price: mostExpensiveProduct.price,
          }
        : null,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Маршрут не найден",
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Внутренняя ошибка сервера",
  });
});

// ============ ЗАПУСК СЕРВЕРА ============
app.listen(port, () => {
  console.log(`
    ========================================
    🚀 Сервер 2drots запущен!
    
    📡 API: http://localhost:${port}
    📚 Документация Swagger: http://localhost:${port}/api-docs
    🔧 Режим: ${process.env.NODE_ENV || "development"}
    
    Доступные эндпоинты:
    - GET    /api/products
    - GET    /api/products/:id
    - POST   /api/products
    - PUT    /api/products/:id
    - PATCH  /api/products/:id
    - DELETE /api/products/:id
    - GET    /api/stats
    
    Товаров в базе: ${products.length}
    ========================================
  `);
});
