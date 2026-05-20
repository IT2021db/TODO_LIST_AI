import express from "express";
import cors from "cors";
import { classifyTaskCategory } from "./classifyTaskCategory";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "TODO AI backend is running",
  });
});

app.post("/api/classify-task-category", (req, res) => {
  const { text } = req.body;

  if (typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  const category = classifyTaskCategory(text);

   console.log("BACKEND CATEGORY:", category);

  return res.json({
    category,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});