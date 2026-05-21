const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "tasks.json");

async function readTasks () {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeTasks (tasks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), "utf8");
}

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Erro ao ler tarefas" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const tasks = Array.isArray(req.body) ? req.body : req.body.tasks || [];
    await writeTasks(tasks);
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar tarefas" });
  }
});

app.delete("/tasks", async (req, res) => {
  try {
    await writeTasks([]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar tarefas" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
