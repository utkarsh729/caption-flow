import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { SpeechClient } from "@google-cloud/speech";
import path from "path";

// Setup
const app = express();
const PORT = 3000;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.static("public"));

// Init Google Speech client
const speechClient = new SpeechClient({
  keyFilename: "backend/service-account.json",
});

// Route to handle audio upload
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  const filePath = req.file.path;

  const audioBytes = fs.readFileSync(filePath).toString("base64");

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: "WEBM_OPUS",
    sampleRateHertz: 48000,
    languageCode: "en-US",
  };

  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    fs.unlinkSync(filePath); // clean up file

    res.json({ text: transcription });
  } catch (error) {
    console.error("Error during transcription:", error);
    res.status(500).json({ error: "Transcription failed" });
  }
});

app.listen(PORT, () => {
  console.log(`CaptionFlow backend running on http://localhost:${PORT}`);
});
