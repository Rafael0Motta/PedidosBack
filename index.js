const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const checkOrderId = (req, res, next) => {
  const { id } = req.params;

  const index = orders.findIndex((order) => order.id === id);

  if (index < 0) {
    res.status(404).json({ Error: "Order Not Found" });
  }

  req.orderIndex = index;
  req.orderId = id;
  next();
};

const orders = [];

app.get("/orders", (req, res) => {
  return res.json(orders);
});

app.post("/order", (req, res) => {
  const { order, clientName } = req.body;
  const userOrder = { id: uuid.v4(), order, clientName };
  orders.push(userOrder);

  return res.status(201).json(userOrder);
});

app.delete("/order/:id", checkOrderId, (req, res) => {
  const index = req.orderIndex;
  console.log(index);
  orders.splice(index - 1);

  return res.status(204).json({ message: "Order Deleted" });
});
