import "dotenv/config";
import express from "express";
import cors from "cors";
import { getTaskCategory } from "./getTaskCategory";
import {
  classifyTaskCategoryRequestSchema,
  classifyTaskCategoryResponseSchema,
} from "./schemas";

console.log("🔥 THIS IS MY SERVER INDEX FILE");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  console.log("🔥 GET / HIT");

  res.json({
    message: "TODO AI backend is running",
  });
});

app.post("/api/classify-task-category", async (req, res) => {
  console.log("🔥 ENDPOINT HIT");
  console.log("REQUEST BODY:", req.body);

  const requestResult = classifyTaskCategoryRequestSchema.safeParse(req.body);

  if (!requestResult.success) {
    console.log("REQUEST VALIDATION ERROR:", requestResult.error);

    return res.status(400).json({
      error: "Invalid request body",
    });
  }

  const category = await getTaskCategory(requestResult.data.text);

  console.log("CATEGORY RETURNED:", category);

  const responseResult = classifyTaskCategoryResponseSchema.safeParse({
    category,
  });

  if (!responseResult.success) {
    console.log("RESPONSE VALIDATION ERROR:", responseResult.error);

    return res.status(500).json({
      error: "Invalid category response",
    });
  }

  console.log("FINAL RESPONSE:", responseResult.data);

  return res.json(responseResult.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});