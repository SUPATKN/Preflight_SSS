const express = require("express");
const fs = require("fs");
const app = express();
const multer = require("multer");
const path = require("path");
import cors from "cors";
import helmet from "helmet";
import { dbClient, dbConn } from "@db/client";
import { images } from "@db/schema";
import { eq } from "drizzle-orm";
import moment from "moment";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req: any, file: any, cb: any) {

    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');
    const originalName = file.originalname.replace(/\s+/g, '_');
    const newFilename = `${timestamp}-${originalName}`;
    cb(null, newFilename);
  }
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
const filePath = `/images/${req.file.filename}`;  try {
    const result = await dbClient
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

app.delete("/api/photo/:filename", async (req: any, res: any) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../images", filename);
  

  try {
    // ลบไฟล์จาก directory
    fs.unlinkSync(filePath);
        const results = await dbClient.query.images.findMany();
    if (results.length === 0) {
      dbConn.end();
      res.status(404).json({ message: 'File not found in database' });
      return;
    }

    // ลบ path ของไฟล์จากฐานข้อมูล
    const id = results[0].id;
    await dbClient.delete(images).where(eq(images.id, id));

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
