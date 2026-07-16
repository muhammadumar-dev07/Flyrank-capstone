const express = require("express");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const { validateContact } = require("./src/validateContact");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function saveContact(submission) {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let contacts = [];
  try {
    const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
    contacts = JSON.parse(raw);
  } catch {
    contacts = [];
  }

  contacts.push({
    ...submission,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  });

  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

app.post("/api/contact", async (req, res) => {
  const { isValid, errors, data } = validateContact(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    await saveContact(data);
    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent.",
    });
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
