// import express from "express";
// import fs from "fs/promises";
// import path from "path";
// import crypto from "crypto";
// import cors from "cors";
// import { fileURLToPath } from "url";

// // Get __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// // Paths
// const dataDir = path.join(__dirname, "data");
// const DATA_FILE = path.join(dataDir, "links.json");

// app.use(cors({ origin: "http://localhost:5173" })); // React dev server origin
// app.use(express.json());

// // Helper functions
// const loadLinks = async () => {
//   try {
//     const data = await fs.readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       // Make sure folder exists
//       await fs.mkdir(dataDir, { recursive: true });
//       await fs.writeFile(DATA_FILE, "{}");
//       return {};
//     }
//     throw error;
//   }
// };

// const saveLinks = async (links) => {
//   await fs.mkdir(dataDir, { recursive: true }); // ensure folder exists
//   await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
// };

// // Routes
// app.get("/api/links", async (req, res) => {
//   const links = await loadLinks();
//   res.json(links);
// });

// app.post("/api/shorten", async (req, res) => {
//   const { url, shortCode } = req.body;
//   if (!url) {
//     return res.status(400).send("URL is required!");
//   }

//   const links = await loadLinks();
//   const code = shortCode || crypto.randomBytes(4).toString("hex");

//   if (links[code]) {
//     return res
//       .status(400)
//       .send("Short code already exists. Please try another one!");
//   }

//   links[code] = url;
//   await saveLinks(links);
//   res.json({ success: true, shortCode: code });
// });

// // Redirect
// app.get("/:code", async (req, res) => {
//   const links = await loadLinks();
//   const { code } = req.params;
//   if (links[code]) {
//     return res.redirect(links[code]);
//   }
//   res.status(404).send("Short URL not found!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// import express from "express";
// import fs from "fs/promises";
// import path from "path";
// import crypto from "crypto";
// import cors from "cors";
// import { fileURLToPath } from "url";

// // Resolve __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 5000;

// // Paths
// const dataDir = path.join(__dirname, "data");
// const DATA_FILE = path.join(dataDir, "links.json");

// // Middleware
// app.use(cors({ origin: "http://localhost:5173" })); // React dev server origin
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public"))); // optional for prod

// // Helpers
// const loadLinks = async () => {
//   try {
//     const data = await fs.readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await fs.mkdir(dataDir, { recursive: true });
//       await fs.writeFile(DATA_FILE, "{}");
//       return {};
//     }
//     throw error;
//   }
// };

// const saveLinks = async (links) => {
//   await fs.mkdir(dataDir, { recursive: true });
//   await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
// };

// // Routes
// app.get("/links", async (req, res) => {
//   const links = await loadLinks();
//   res.json(links);
// });

// app.post("/shorten", async (req, res) => {
//   const { url, shortCode } = req.body;
//   if (!url) {
//     return res.status(400).send("URL is required!");
//   }

//   const links = await loadLinks();
//   const code = shortCode || crypto.randomBytes(4).toString("hex");

//   if (links[code]) {
//     return res
//       .status(400)
//       .send("Short code already exists. Please try another one!");
//   }

//   links[code] = url;
//   await saveLinks(links);
//   res.json({ success: true, shortCode: code });
// });

// app.get("/:code", async (req, res) => {
//   const links = await loadLinks();
//   const { code } = req.params;
//   if (links[code]) {
//     return res.redirect(links[code]);
//   }
//   res.status(404).send("Short URL not found!");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


import express from "express";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import cors from "cors";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // Changed port to 5000

// Paths
const dataDir = path.join(__dirname, "data");
const DATA_FILE = path.join(dataDir, "links.json");

// ✅ Middleware
app.use(cors()); // allow all origins for dev
app.use(express.json()); // parse JSON body

// Helpers
const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(DATA_FILE, "{}");
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

// Routes
app.get("/links", async (req, res) => {
  const links = await loadLinks();
  res.json(links);
});

app.post("/shorten", async (req, res) => {
  const { url, shortCode } = req.body;
  if (!url) return res.status(400).send("URL is required!");

  const links = await loadLinks();
  const code = shortCode || crypto.randomBytes(4).toString("hex");

  if (links[code]) return res.status(400).send("Short code already exists!");

  links[code] = url;
  await saveLinks(links);
  res.json({ success: true, shortCode: code });
});

app.get("/:code", async (req, res) => {
  const links = await loadLinks();
  const { code } = req.params;
  if (links[code]) return res.redirect(links[code]);
  res.status(404).send("Short URL not found!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
