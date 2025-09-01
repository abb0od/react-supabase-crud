const express = require("express");
const supabase = require("./supabaseClient");

const router = express.Router();

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

// GET /todos
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get("/", authenticate, async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// POST /todos

router.post("/", authenticate, async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from("todos").insert([{ title, completed: false }]);
  if (error) return res.status(400).json({ error });
  res.json(data);
});


// PUT /todos/:id
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .update({ title, completed })
    .eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// DELETE /todos/:id
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created todo
 */
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

module.exports = router;

