import "dotenv/config";
import express from "express";
import cors from "cors";
import { getTaskCategory } from "./getTaskCategory";
import {
  classifyTaskCategoryRequestSchema,
  classifyTaskCategoryResponseSchema,
} from "./schemas";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "TODO AI backend is running",
  });
});

app.post("/api/classify-task-category",async(req, res) => {
  const requestResult = classifyTaskCategoryRequestSchema.safeParse(req.body);

  if (!requestResult.success) {
    return res.status(400).json({
      error: "Invalid request body",
    });
  }

const category = await getTaskCategory(requestResult.data.text);

  const responseResult = classifyTaskCategoryResponseSchema.safeParse({
    category,
  });

  if (!responseResult.success) {
    return res.status(500).json({
      error: "Invalid category response",
    });
  }

  return res.json(responseResult.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});