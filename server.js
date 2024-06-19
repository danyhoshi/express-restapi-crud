const express = require("express");
const morgan = require("morgan");
const app = express();
let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];
app.use(morgan("dev"));
app.use(express.json()); // para que entienda json
app.get("/products", (req, res) => {
  res.json(products);
  res.send("obteniendo products");
});

app.post("/products", (req, res) => {
  console.log(req.body); // reviso lo que viene el el body del post
  products.push({ ...req.body, id: products.length + 1 });
  res.send(products[products.length - 1]);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const newProduct = products.find((product) => {
    // busca un producto con el id del params
    return product.id === parseInt(req.params.id);
  });
  if (!newProduct) {
    res.status(404).json({ message: "Product not found" }); //establezco status a 404 si no encontro producto y pongo un mensaje
  } else {
    console.log(newData);
    products = products.map((p) =>
      p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
    );
    console.log(products);
    res.json({ message: "producto actualizado exitosamente" });
  }
  // res.sendStatus(204); // Todo fue bien pero no devuelvo nada al cliente
});

app.delete("/products/:id", (req, res) => {
  const newProduct = products.find((product) => {
    // busca un producto con el id del params
    return product.id === parseInt(req.params.id);
  });
  if (!newProduct) {
    res.status(404).json({ message: "Product not found" }); //establezco status a 404 si no encontro producto y pongo un mensaje
  } else {
    products = products.filter((p) => p.id !== parseInt(req.params.id));
    console.log(products);
    res.json(newProduct);
  }
  res.sendStatus(204); // Todo fue bien pero no devuelvo nada al cliente
});

app.get("/products/:id", (req, res) => {
  const newProduct = products.find((product) => {
    // busca un producto con el id del params
    return product.id === parseInt(req.params.id);
  });
  if (!newProduct) {
    res.status(404).json({ message: "Product not found" }); //establezco status a 404 si no encontro producto y pongo un mensaje
  } else {
    res.json(newProduct);
  }
});
app.listen(3000);
console.log(`server on port ${3000}`);
