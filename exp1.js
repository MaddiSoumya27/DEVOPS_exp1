const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// Connect to database
const db = new sqlite3.Database("event.db");
// Create table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        event TEXT
    )
`);
// Register user
app.post("/register", (req, res) => {
    const { name, email, phone, event } = req.body;
    db.run(
        `INSERT INTO users (name, email, phone, event)
         VALUES (?, ?, ?, ?)`,
        [name, email, phone, event],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Registration Successful!" });
        }
    );
});
// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});