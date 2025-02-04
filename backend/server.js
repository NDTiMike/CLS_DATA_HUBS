const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to PostgreSQL
const pool = new Pool({
    user: "your_username",
    host: "localhost",
    database: "survey_db",
    password: "your_password",
    port: 5432
});

// Create Table (Run this once)
pool.query(`
    CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        age_band VARCHAR(50),
        postcode VARCHAR(20),
        gender VARCHAR(20),
        coping INTEGER,
        connected INTEGER,
        control INTEGER,
        safe INTEGER,
        support INTEGER,
        satisfaction INTEGER,
        venue INTEGER,
        welcome INTEGER,
        accessibility INTEGER,
        issue TEXT,
        info INTEGER,
        outcome INTEGER,
        recommend INTEGER
    );
`, (err, res) => {
    if (err) console.error("Error creating table:", err);
    else console.log("Table created or already exists.");
});

// Save Form Data
app.post("/submit", async (req, res) => {
    const data = req.body;
    try {
        await pool.query(`
            INSERT INTO responses (age_band, postcode, gender, coping, connected, control, safe, support, satisfaction, venue, welcome, accessibility, issue, info, outcome, recommend)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        `, [
            data.ageBand, data.postcode, data.gender,
            data.coping, data.connected, data.control, data.safe, data.support, data.satisfaction,
            data.venue, data.welcome, data.accessibility, data.issue,
            data.info, data.outcome, data.recommend
        ]);
        res.json({ success: true, message: "Response saved successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error saving data." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));