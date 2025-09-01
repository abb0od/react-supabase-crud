// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const todosRoutes = require("./routes/todosRoutes");
const setupSwagger = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todosRoutes);
setupSwagger(app);

module.exports = app;

// Only listen if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
