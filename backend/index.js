const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Auth middleware
async function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "No token provided" });

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: "Unauthorized" });

  req.user = user;  
  next();
}

 
// Get all todos
app.get("/todos", authenticate,async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Create todo
app.post("/todos",authenticate, async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from("todos").insert([{ title, completed: false }]);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Update todo
app.put("/todos/:id",authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .update({ title, completed })
    .eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Delete todo
app.delete("/todos/:id",authenticate, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

module.exports = app;

// Only listen if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}