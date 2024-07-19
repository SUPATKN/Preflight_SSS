const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
import cors from "cors";
import helmet from "helmet";
import { dbClient } from "@db/client";
import { images } from "@db/schema";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

//Middleware
app.use(helmet());
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);

const upload = multer({ storage });

app.use("/api/images", express.static(path.join(__dirname, "../images")));

app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

app.post("/api/upload", upload.single("image"), async (req: any, res: any) => {
  const filePath = `/images/${req.file.originalname}`;
  try {
    await dbClient
      .insert(images)
      .values({ path: filePath })
      .returning({ id: images.id, path: images.path });
    res.json({ filePath });
  } catch (error) {
    console.error("Error saving file path to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const port = process.env.PORT || 3000;
app.get("/api/photo", async (req: any, res: any) => {
  try {
    const result = await dbClient.query.images.findMany();
    res.json(result);
  } catch (error) {
    console.error("Error retrieving images from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
