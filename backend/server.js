const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Allow frontend access test
app.use(express.json()); // Parse JSON requests

// Path to CSV file
const CSV_FILE = path.join(__dirname, "data", "responses.csv");

// Ensure CSV has headers on first run
const initializeCSV = () => {
    if (!fs.existsSync(CSV_FILE)) {
        const headers = [
            "Timestamp", "Hub Attended", "Date Attended", "Hub Worker", "How Found", 
            "Age Band", "Postcode", "Gender", "Ethnicity", "Ethnicity Detail", 
            "Conclusion 1", "Conclusion 2", "Conclusion 3", "Notes", 
            "Coping", "Connected", "Control", "Safe", "Support", "Satisfaction",
            "Venue", "Welcome", "Accessibility", "Info", "Outcome", "Recommend", "Issue"
        ].join(",") + "\n";
        fs.writeFileSync(CSV_FILE, headers, "utf8");
    }
};
initializeCSV();

// 📌 Handle form submission
app.post("/submit", (req, res) => {
    try {
        const formData = req.body;
        const newEntry = {
            Timestamp: new Date().toISOString(),
            ...formData
        };

        // Convert JSON to CSV
        const csvEntry = parse([newEntry], { header: false }) + "\n";
        
        // Append to file
        fs.appendFileSync(CSV_FILE, csvEntry, "utf8");

        res.json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Error saving data." });
    }
});

// 📌 API to get CSV data (for Power BI import)
app.get("/data", (req, res) => {
    res.sendFile(CSV_FILE);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));